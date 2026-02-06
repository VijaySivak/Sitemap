import re
from collections import defaultdict
from typing import List, Dict, Set
from state import GraphState
from schemas import (
    JourneyPath, InstructionStep, EvidenceAnchor, 
    CustomerIntent, ContentAsset
)

class GraphValidator:
    def __init__(self):
        # Mutually exclusive verbs that shouldn't coexist in one linear path
        self.CONFLICT_VERBS = [
            {"return", "purchase"},
            {"turn in", "keep"},
            {"lease", "buy"},
        ]

    def _normalize_text(self, text: str) -> str:
        if not text: return ""
        
        text = re.sub(r'\[source:\s*\d+\]','', text)

        # Existing Markdown removal...
        text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
        return " ".join(text.split()).lower()

    def validate(self, state: GraphState) -> GraphState:
        """
        Validates the flat list of entities for:
        1. Structural Integrity (Orphans)
        2. Logic Traps (Linear Sequence vs Options)
        3. Evidence Fidelity (Hallucinations)
        """
        entities = state.get("final_entities", [])
        if not entities:
            state["validation_errors"].append("No entities generated.")
            return state

        errors = []
        
        # Indexing for faster lookups
        step_map = {e.id: e for e in entities if isinstance(e, InstructionStep)}
        evidence_map = {e.id: e for e in entities if isinstance(e, EvidenceAnchor)}
        
        # Get Source Text (Normalized)
        # We access the original text from the state inputs if available
        full_source_text = state.get("answer", "") + " " + state.get("question", "")
        norm_source = self._normalize_text(full_source_text)

        for ev in evidence_map.values():
            if not ev.extracted_text:
                continue
                
            norm_extracted = self._normalize_text(ev.extracted_text)
            
            # Fuzzy Check: Is the normalized extracted text inside the normalized source?
            if norm_extracted not in norm_source:
                errors.append(f"Evidence Hallucination: '{ev.extracted_text[:30]}...' not found in source.")

        # --- CHECK 2: Structural Orphans ---
        for step in step_map.values():
            if step.evidence_ref and step.evidence_ref not in evidence_map:
                errors.append(f"Step {step.id}: Missing evidence {step.evidence_ref}")

        # --- CHECK 3: The "Linear Trap" Logic ---
        steps_by_path = defaultdict(list)
        for step in step_map.values():
            if step.path_ref:
                steps_by_path[step.path_ref].append(step)

        for path_id, steps in steps_by_path.items():
            # You successfully updated this to 20
            if len(steps) > 20:
                errors.append(f"Suspicious Path Length: {path_id} has {len(steps)} steps.")

            path_verbs = {s.verb.lower() for s in steps}
            for conflict_pair in self.CONFLICT_VERBS:
                if conflict_pair.issubset(path_verbs):
                    errors.append(f"Logic Conflict: Path {path_id} has {conflict_pair}")

        # --- FINAL VERDICT ---
        state["validation_errors"] = errors
        state["is_verified"] = len(errors) == 0
        
        return state