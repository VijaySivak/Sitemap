import hashlib
import os
from pathlib import Path
from typing import Optional

def generate_deterministic_filename(url: str, extension: str) -> str:
    """
    Generates a deterministic filename based on the URL hash.
    """
    hash_object = hashlib.sha256(url.encode('utf-8'))
    hex_dig = hash_object.hexdigest()
    if extension.startswith('.'):
        return f"{hex_dig}{extension}"
    return f"{hex_dig}.{extension}"

def ensure_directory(path: str):
    Path(path).mkdir(parents=True, exist_ok=True)

def get_relative_path(full_path: str, base_dir: str) -> str:
    return os.path.relpath(full_path, base_dir)
