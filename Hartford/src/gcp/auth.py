# src/gcp/auth.py
from typing import Optional, Tuple
import google.auth
from google.auth.exceptions import DefaultCredentialsError

def get_adc_project_id() -> Optional[str]:
    """
    Return project_id if Application Default Credentials (ADC) are available, else None.
    Works in Cloud Run, Cloud Shell, and other GCP runtimes with ADC.
    """
    try:
        _, project_id = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
        return project_id
    except (DefaultCredentialsError, Exception):
        return None

def resolve_project_and_location(default_project: Optional[str], default_location: Optional[str]) -> Tuple[Optional[str], Optional[str]]:
    """
    Prefer explicit values (env/.env via config), else ADC-detected project.
    Location defaults to 'us-central1' if not provided.
    """
    project = default_project or get_adc_project_id()
    location = default_location or "us-central1"
    return project, location
