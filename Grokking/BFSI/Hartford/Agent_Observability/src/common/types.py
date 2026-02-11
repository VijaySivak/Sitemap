from typing import Any, Dict, Protocol
from pydantic import BaseModel

class AgentInput(BaseModel):
    task: str
    context: Dict[str, Any] = {}

class AgentOutput(BaseModel):
    result: Any
    meta: Dict[str, Any] = {}

class Agent(Protocol):
    name: str
    def run(self, inp: AgentInput) -> AgentOutput: ...
