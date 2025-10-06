import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

class Settings(BaseModel):
    ENV: str = Field(default=os.getenv("ENV", "local"))

    # Mandatory — orchestrator will exit if missing
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

settings = Settings()
