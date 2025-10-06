from typing import List
from pydantic import BaseModel
from app.common.types import Agent, AgentInput, AgentOutput

class ValidationResult(BaseModel):
    score: int
    status: str
    message: str

def validate_observability(issues: List):
    score = max(0, 100 - len(issues) * 10)
    status = "pass" if score >= 60 else "fail"
    message = f"Found {len(issues)} observability issues."
    return ValidationResult(score=score, status=status, message=message)

class ValidationAgent:
    name = "validation"

    def run(self, inp: AgentInput) -> AgentOutput:
        issues = inp.context.get("issues", [])
        vr = validate_observability(issues)
        return AgentOutput(result=vr.model_dump(), meta={"agent": self.name})

agent: Agent = ValidationAgent()
