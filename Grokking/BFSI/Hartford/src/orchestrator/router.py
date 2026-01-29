from agents.understand_code.understand_code_agent import agent as understand_code
from agents.docbuilder.docbuilder_agent import agent as docbuilder
from agents.instrumentation_advisor.instrumentation_advisor_agent import agent as instr_advisor
from agents.observability_inspector.observability_inspector_agent import agent as obs_inspector
from agents.validation.validation_agent import agent as validation

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
