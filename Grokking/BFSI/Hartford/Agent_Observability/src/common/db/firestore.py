import os
from typing import Any, Optional

def get_firestore_client() -> Optional[Any]:
    try:
        from google.cloud import firestore  # type: ignore
    except Exception:
        return None
    project = os.getenv("GCP_PROJECT_ID")
    return firestore.Client(project=project)
