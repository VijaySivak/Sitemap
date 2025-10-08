# src/gcp/vertex.py
from typing import Optional
from gcp.models import gemini_flash

def get_llm(model_name: Optional[str] = None, temperature: float = 0.2):
    return gemini_flash(model_name=model_name or "gemini-2.5-flash", temperature=temperature)
