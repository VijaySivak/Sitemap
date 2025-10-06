# src/app/agents/instrumentation_advisor/instrumentation_advisor.py
# Uses chat-bison (Vertex AI) and keeps the main flow close to your original intent.
# Async per-method, no strict JSON parsing. We return a consistent shape.

import asyncio
from typing import Any, Dict, List

from pydantic import BaseModel, Field
from app.common.types import Agent, AgentInput, AgentOutput

# Prefer direct VertexAI chat-bison via LangChain adapter, as in your stack.
try:
    from langchain_google_vertexai import ChatVertexAI  # type: ignore
    _LLM_AVAILABLE = True
except Exception:
    _LLM_AVAILABLE = False


class InstrumentationSuggestion(BaseModel):
    method: str = Field(..., description="Java method name")
    has_trace: bool = Field(..., description="Whether Trace/Span instrumentation exists")
    suggestion: str = Field(..., description="Recommendation text from the model")
    modified_code: str = Field(..., description="Full modified Java method code; fallback to original if unavailable")


def _get_llm():
    """Create a chat-bison client if available, else return None."""
    if not _LLM_AVAILABLE:
        return None
    # Keep model and temperature aligned with your prior codebase preference
    return ChatVertexAI(model_name="chat-bison", temperature=0.2)


def _build_prompt(method_name: str, method_code: str) -> str:
    # Keep braces escaped to avoid templating issues
    escaped = method_code.replace("{", "{{").replace("}", "}}")
    return (
        "You are an expert Java developer focused on observability.\n\n"
        "Given the Java method below, do the following:\n"
        "1) Detect if Trace/Span instrumentation already exists (look for tracer.spanBuilder or @WithSpan).\n"
        "2) If missing, add OpenTelemetry instrumentation with a new span and ensure span.end() is called.\n\n"
        "Respond with:\n"
        "- A concise recommendation (one or two paragraphs) describing what to change and why.\n"
        "- If helpful, include a full modified method version (with necessary imports) after your explanation.\n\n"
        "Method:\n"
        "```java\n"
        f"{escaped}\n"
        "```\n"
    )


async def _process_method(method: Dict[str, Any], llm) -> InstrumentationSuggestion:
    """
    Expects each method dict to contain:
      - name: str
      - has_trace: bool
      - content: str (the Java method code)
    """
    name = method.get("name", "unknownMethod")
    has_trace = bool(method.get("has_trace", False))
    code = method.get("content", "")

    if llm is None:
        # Fallback: deterministic suggestion without LLM
        return InstrumentationSuggestion(
            method=name,
            has_trace=has_trace,
            suggestion="Consider adding an OpenTelemetry span: create a span at entry and ensure span.end() in a finally block.",
            modified_code=code
        )

    prompt = _build_prompt(name, code)
    try:
        response = llm.invoke(prompt)
        # Don't enforce JSON; just use the model's text directly.
        suggestion_text = getattr(response, "content", None) or str(response)

        # Without structured parsing, we keep modified_code as original unless you later
        # add a heuristic to extract a ```java code block.
        return InstrumentationSuggestion(
            method=name,
            has_trace=has_trace,
            suggestion=suggestion_text.strip(),
            modified_code=code
        )
    except Exception as e:
        return InstrumentationSuggestion(
            method=name,
            has_trace=has_trace,
            suggestion=f"LLM error: {e}. Fallback: add a span (tracer.spanBuilder) and ensure span.end().",
            modified_code=code
        )


async def _advise_async(methods: List[Dict[str, Any]], llm) -> List[InstrumentationSuggestion]:
    tasks = [asyncio.create_task(_process_method(m, llm)) for m in methods]
    return await asyncio.gather(*tasks)


class InstrumentationAdvisorAgent:
    name = "instrumentation_advisor"

    def run(self, inp: AgentInput) -> AgentOutput:
        methods = inp.context.get("methods", [])
        llm = _get_llm()
        suggestions = asyncio.run(_advise_async(methods, llm))
        return AgentOutput(
            result=[s.model_dump() for s in suggestions],
            meta={"agent": self.name, "count": len(suggestions)}
        )


agent: Agent = InstrumentationAdvisorAgent()
