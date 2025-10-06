import re
from typing import List
from pydantic import BaseModel
from app.common.types import Agent, AgentInput, AgentOutput

class ObservabilityIssue(BaseModel):
    file: str
    method: str
    issue: str

def inspect_observability(file_path: str, method_name: str, method_content: str) -> List[ObservabilityIssue]:
    issues: List[ObservabilityIssue] = []
    if not re.search(r"tracer\.spanBuilder|@WithSpan", method_content):
        issues.append(ObservabilityIssue(file=file_path, method=method_name, issue="Missing trace/span instrumentation"))
    if not re.search(r"Logger|System\.out\.println|log\(", method_content):
        issues.append(ObservabilityIssue(file=file_path, method=method_name, issue="Missing logging"))
    return issues

class ObservabilityInspectorAgent:
    name = "observability_inspector"

    def run(self, inp: AgentInput) -> AgentOutput:
        # Optional: input could include file/method content; here we pass-through
        file_path = inp.context.get("file_path", "UNKNOWN_FILE.java")
        method_name = inp.context.get("method_name", "unknownMethod")
        method_content = inp.context.get("method_content", "")
        issues = inspect_observability(file_path, method_name, method_content)
        return AgentOutput(result=[i.model_dump() for i in issues], meta={"agent": self.name})

agent: Agent = ObservabilityInspectorAgent()
