import os
from typing import Optional, Any

def get_neo4j_driver() -> Optional[Any]:
    uri = os.getenv("NEO4J_URI")
    user = os.getenv("NEO4J_USER")
    pwd = os.getenv("NEO4J_PASSWORD")
    if not (uri and user and pwd):
        return None
    try:
        from neo4j import GraphDatabase  # type: ignore
        return GraphDatabase.driver(uri, auth=(user, pwd))
    except Exception:
        return None
