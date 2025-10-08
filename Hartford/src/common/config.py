import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# --- Always load the repo-root .env, regardless of CWD ---
# config.py is at: <repo>/src/common/config.py
# repo_root = Path(__file__).resolve().parents[2]  ->  <repo>/
repo_root = Path(__file__).resolve().parents[2]
repo_env = repo_root / ".env"
if repo_env.exists():
    load_dotenv(dotenv_path=repo_env, override=False)

# Optional: also load a .env in the current working directory (no override)
# This lets someone run experiments with a local .env without clobbering repo-root values.
load_dotenv(override=False)
# ---------------------------------------------------------

class Settings(BaseModel):
    ENV: str = Field(default=os.getenv("ENV", "local"))

    # Mandatory for orchestrator; your run.py will exit if missing
    TARGET_REPO_URL: str | None = os.getenv("TARGET_REPO_URL")

    # GCP / Vertex
    GCP_PROJECT_ID: str | None = os.getenv("GCP_PROJECT_ID")
    GCP_LOCATION: str | None = os.getenv("GCP_LOCATION", "us-central1")
    GOOGLE_APPLICATION_CREDENTIALS: str | None = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    GEMINI_MODEL: str | None = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    # DBs (optional)
    REDIS_URL: str | None = os.getenv("REDIS_URL")
    NEO4J_URI: str | None = os.getenv("NEO4J_URI")
    NEO4J_USER: str | None = os.getenv("NEO4J_USER")
    NEO4J_PASSWORD: str | None = os.getenv("NEO4J_PASSWORD")

    # --- LLM runtime controls (safe defaults) ---
    MAX_METHODS_PER_RUN: int = int(os.getenv("MAX_METHODS_PER_RUN", "40"))
    MAX_LLM_CALLS: int = int(os.getenv("MAX_LLM_CALLS", "60"))  # hard cap across this agent run
    LLM_TIMEOUT_S: float = float(os.getenv("LLM_TIMEOUT_S", "25"))
    LLM_PARALLELISM: int = int(os.getenv("LLM_PARALLELISM", "4"))
    DEBUG_LLM: bool = os.getenv("DEBUG_LLM", "0") == "1"


settings = Settings()
