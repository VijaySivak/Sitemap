from typing import Literal
from langgraph.graph import StateGraph, END

# CHANGED: Import the new classes we built
from architect import GraphArchitect
from validators import GraphValidator
from state import GraphState

# Initialize our Tools
architect = GraphArchitect()
validator = GraphValidator()

def run_architect(state: GraphState):
    """Node 1: Extract and Flatten Entities"""
    return architect.process_entry(state)

def run_validator(state: GraphState):
    """Node 2: Validate Logic and Structure"""
    return validator.validate(state)

# Define the Workflow
workflow = StateGraph(GraphState)

# Add Nodes
workflow.add_node("architect", run_architect)
workflow.add_node("validator", run_validator)

# Define Edges (Linear Flow)
workflow.set_entry_point("architect")
workflow.add_edge("architect", "validator")
workflow.add_edge("validator", END)

# Compile
app = workflow.compile()