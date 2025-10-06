from app.agents.understand_code.understand_code import agent as understand_code
from app.agents.docbuilder.docbuilder import agent as docbuilder
from app.agents.instrumentation_advisor.instrumentation_advisor import agent as instr_advisor
from app.agents.observability_inspector.observability_inspector import agent as obs_inspector
from app.agents.validation.validation import agent as validation

REGISTRY = {
    understand_code.name: understand_code,
    docbuilder.name: docbuilder,
    instr_advisor.name: instr_advisor,
    obs_inspector.name: obs_inspector,
    validation.name: validation,
}

def get_agent(name: str):
    if name not in REGISTRY:
        raise KeyError(f"Agent not found: {name}")
    return REGISTRY[name]
