import os
from typing import Optional, Any

def get_redis_client() -> Optional[Any]:
    url = os.getenv("REDIS_URL")
    if not url:
        return None
    try:
        import redis  # type: ignore
        return redis.from_url(url)
    except Exception:
        return None
