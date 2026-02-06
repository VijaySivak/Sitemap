import operator
from typing import Annotated, List, Dict, Optional, Any, Union
from typing_extensions import TypedDict
from pydantic import BaseModel

# We import our strict schema to ensure the state holds valid objects
from schemas import (
    CustomerIntent, Product, ContentAsset, Channel, 
    InstructionStep, Condition, LatencyWindow, EscalationPath,
    ResponsibleParty, ValueLeakage, OpportunitySignal, 
    EvidenceAnchor, SentimentSignal
)

class GraphState(TypedDict):
    """
    Represents the state of a SINGLE CSV ROW being processed.
    This dict is passed between LangGraph nodes.
    """
    # --- INPUTS (Read Only) ---
    row_id: str
    question: str
    answer: str
    source_url: str
    
    # --- WORKING MEMORY (Mutable) ---
    # The list of candidate entities extracted by the Miner
    # We store them as dicts first, then convert to Pydantic for validation
    candidate_entities: Dict[str, Any] 
    
    # Errors found by the Gatekeeper (Validator)
    validation_errors: List[str]
    
    # How many times we've asked the LLM to fix its mistakes
    retry_count: int
    
    # --- OUTPUT (Final) ---
    # If True, the row is considered "Done" and valid
    is_verified: bool
    
    # The final, strictly validated list of objects ready for the graph
    final_entities: List[BaseModel]

def init_state(row: Dict[str, str]) -> GraphState:
    """Helper to initialize state from a CSV row"""
    return {
        "row_id": str(row.get("ID", "unknown")),
        "question": row.get("Question", ""),
        "answer": row.get("Answer", ""),
        "source_url": row.get("Source URL", ""),
        "candidate_entities": {},
        "validation_errors": [],
        "retry_count": 0,
        "is_verified": False,
        "final_entities": []
    }