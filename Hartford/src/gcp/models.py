# src/gcp/models.py
# Single, canonical model accessor for all agents:
#   from gcp.models import gemini_flash

from typing import Optional, Any
import os

from common.config import settings
from gcp.auth import resolve_project_and_location

# Vertex AI via LangChain (ADC path)
try:
    from langchain_google_vertexai import ChatVertexAI  # type: ignore
    _HAS_VERTEX = True
except Exception:
    _HAS_VERTEX = False

# Vertex SDK (for vertexai.init)
try:
    import vertexai  # type: ignore
    _HAS_VERTEX_SDK = True
except Exception:
    _HAS_VERTEX_SDK = False

# Gemini API key via LangChain (Gemini)
try:
    from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore
    _HAS_LC_GENAI = True
except Exception:
    _HAS_LC_GENAI = False

# Official Google Generative AI SDK (Gemini)
try:
    import google.generativeai as genai  # type: ignore
    _HAS_GENAI = True
except Exception:
    _HAS_GENAI = False


class _GenAISimpleWrapper:
    """Adapter to present .invoke(prompt) with .content like LangChain chat models."""
    def __init__(self, model_name: str, api_key: str, temperature: float = 0.2):
        genai.configure(api_key=api_key)
        self._model = genai.GenerativeModel(model_name)
        self._kwargs = {"temperature": temperature}

    def invoke(self, prompt: str) -> Any:
        resp = self._model.generate_content(prompt, generation_config=self._kwargs)
        class _R: pass
        r = _R()
        r.content = ""
        try:
            if resp and getattr(resp, "candidates", None):
                parts = getattr(resp.candidates[0], "content", None)
                if parts and getattr(parts, "parts", None):
                    r.content = "\n".join([p.text for p in parts.parts if hasattr(p, "text") and p.text])
        except Exception:
            pass
        return r


def _vertex_init_if_possible(project: Optional[str], location: Optional[str]):
    if _HAS_VERTEX_SDK and project:
        try:
            vertexai.init(project=project, location=location or "us-central1")
        except Exception:
            # don't hard-fail; fallback may still work
            pass


def gemini_flash(model_name: Optional[str] = "gemini-2.5-flash", temperature: float = 0.2):
    """
    Unified Gemini accessor for all agents.
    Preference:
      1) GOOGLE_API_KEY via LangChain (ChatGoogleGenerativeAI) or official SDK wrapper
      2) Vertex AI via ADC (ChatVertexAI with project/location)
    """
    project, location = resolve_project_and_location(settings.GCP_PROJECT_ID, settings.GCP_LOCATION)
    api_key = os.getenv("GOOGLE_API_KEY")
    model = model_name or "gemini-2.5-flash"

    # 1) API key first (predictable for dev machines without gcloud)
    if api_key:
        if _HAS_LC_GENAI:
            return ChatGoogleGenerativeAI(model=model, google_api_key=api_key, temperature=temperature)
        if _HAS_GENAI:
            return _GenAISimpleWrapper(model_name=model, api_key=api_key, temperature=temperature)

    # 2) Vertex AI via ADC
    if _HAS_VERTEX and project:
        _vertex_init_if_possible(project, location)
        return ChatVertexAI(model_name=model, temperature=temperature, project=project, location=location)

    raise RuntimeError(
        "gemini_flash(): No valid auth. Set GOOGLE_API_KEY (preferred for devs) or provide ADC project."
    )
