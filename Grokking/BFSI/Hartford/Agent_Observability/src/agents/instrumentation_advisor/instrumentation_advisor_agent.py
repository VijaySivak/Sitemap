# Instrumentation advisor using Gemini 2.5-flash (via gcp.models.gemini_flash).
# Adds: method cap, LLM call cap, per-call timeout, thread parallelism, and simple debug prints.

from typing import Any, Dict, List, Tuple
from pydantic import BaseModel, Field
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError
import time

from common.types import Agent, AgentInput, AgentOutput
from common.config import settings
from gcp.models import gemini_flash


class InstrumentationSuggestion(BaseModel):
    method: str = Field(..., description="Java method name")
    has_trace: bool = Field(..., description="Whether Trace/Span instrumentation exists")
    suggestion: str = Field(..., description="Recommendation text from the model")
    modified_code: str = Field(..., description="Full modified Java method code; fallback to original if unavailable")


def _log(msg: str):
    if settings.DEBUG_LLM:
        print(f"[IA] {msg}")


def _truncate_code(code: str, max_chars: int = 4000) -> str:
    """Keep prompts bounded to reduce latency/cost."""
    if len(code) <= max_chars:
        return code
    return code[:max_chars] + "\n// ...truncated for analysis...\n"


def _build_prompt(method_name: str, method_code: str) -> str:
    code = _truncate_code(method_code)
    escaped = code.replace("{", "{{").replace("}", "}}")
    return (
        "You are an expert Java developer focused on observability.\n\n"
        "Given the Java method below, do the following:\n"
        "1) Detect if Trace/Span instrumentation already exists (look for tracer.spanBuilder or @WithSpan).\n"
        "2) If missing, add OpenTelemetry instrumentation with a new span and ensure span.end() is called.\n\n"
        "Respond concisely:\n"
        "- A short recommendation (max ~6 sentences) explaining what to change and why.\n"
        "- If helpful, include a full modified method version (with necessary imports) after your explanation.\n\n"
        "Method:\n"
        "```java\n"
        f"{escaped}\n"
        "```\n"
    )


def _call_llm(llm, prompt: str) -> str:
    """Single blocking LLM call (content string)."""
    resp = llm.invoke(prompt)
    return getattr(resp, "content", None) or str(resp)


def _process_one(llm, method: Dict[str, Any]) -> Tuple[str, InstrumentationSuggestion, str]:
    """Returns (status, suggestion, method_name) where status is 'ok' | 'timeout' | 'error'."""
    name = method.get("name", "unknownMethod")
    has_trace = bool(method.get("has_trace", False))
    code = method.get("content", "")

    prompt = _build_prompt(name, code)
    try:
        text = _call_llm(llm, prompt)
        return (
            "ok",
            InstrumentationSuggestion(
                method=name, has_trace=has_trace, suggestion=text.strip(), modified_code=code
            ),
            name,
        )
    except Exception as e:
        return (
            "error",
            InstrumentationSuggestion(
                method=name,
                has_trace=has_trace,
                suggestion=f"LLM error: {e}. Fallback: add a span (tracer.spanBuilder) and ensure span.end().",
                modified_code=code,
            ),
            name,
        )


def _advise_bounded(methods: List[Dict[str, Any]]):
    """
    Runs with global caps & parallelism:
      - up to settings.MAX_METHODS_PER_RUN methods (slice)
      - up to settings.MAX_LLM_CALLS total LLM invocations
      - each call has settings.LLM_TIMEOUT_S timeout
      - parallelized with settings.LLM_PARALLELISM threads
    """
    t0 = time.monotonic()
    llm = gemini_flash()  # unified model (API key preferred, ADC fallback)

    # Cap methods count early
    methods = methods[: settings.MAX_METHODS_PER_RUN]
    total = len(methods)
    _log(f"Starting advisor on {total} method(s); "
         f"cap MAX_METHODS_PER_RUN={settings.MAX_METHODS_PER_RUN}, "
         f"MAX_LLM_CALLS={settings.MAX_LLM_CALLS}, "
         f"LLM_TIMEOUT_S={settings.LLM_TIMEOUT_S}, "
         f"LLM_PARALLELISM={settings.LLM_PARALLELISM}")

    suggestions: List[InstrumentationSuggestion] = []
    submitted = 0
    ok = 0
    timeouts = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=settings.LLM_PARALLELISM) as pool:
        futures = {}
        for m in methods:
            if submitted >= settings.MAX_LLM_CALLS:
                _log("Reached MAX_LLM_CALLS cap; stopping submission.")
                break
            fut = pool.submit(_process_one, llm, m)
            futures[fut] = m.get("name", "unknownMethod")
            submitted += 1
            if settings.DEBUG_LLM:
                _log(f"Submitted LLM call {submitted}/{min(settings.MAX_LLM_CALLS,total)} for method '{futures[fut]}'")

        for fut in as_completed(futures, timeout=None):
            name = futures[fut]
            try:
                status, sug, _ = fut.result(timeout=settings.LLM_TIMEOUT_S)
                if status == "ok":
                    ok += 1
                elif status == "error":
                    errors += 1
                suggestions.append(sug)
                _log(f"Completed method '{name}' with status={status}")
            except TimeoutError:
                timeouts += 1
                _log(f"Timeout on method '{name}' after {settings.LLM_TIMEOUT_S}s")
                # best-effort fallback record
                suggestions.append(
                    InstrumentationSuggestion(
                        method=name,
                        has_trace=bool(next((m for m in methods if m.get('name') == name), {}).get("has_trace", False)),
                        suggestion=f"Timed out after {settings.LLM_TIMEOUT_S}s; consider adding span around method body.",
                        modified_code=next((m for m in methods if m.get('name') == name), {}).get("content", ""),
                    )
                )

    dt = time.monotonic() - t0
    _log(f"SUMMARY: submitted={submitted}, ok={ok}, timeouts={timeouts}, errors={errors}, elapsed={dt:.1f}s")
    return suggestions


class InstrumentationAdvisorAgent:
    name = "instrumentation_advisor"

    def run(self, inp: AgentInput) -> AgentOutput:
        methods = inp.context.get("methods", []) or []
        suggestions = _advise_bounded(methods)
        return AgentOutput(
            result=[s.model_dump() for s in suggestions],
            meta={
                "agent": self.name,
                "count": len(suggestions),
                "max_methods": settings.MAX_METHODS_PER_RUN,
                "max_llm_calls": settings.MAX_LLM_CALLS,
                "timeout_s": settings.LLM_TIMEOUT_S,
                "parallelism": settings.LLM_PARALLELISM,
            },
        )


agent: Agent = InstrumentationAdvisorAgent()
