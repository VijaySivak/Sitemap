import pytest
import os
import tempfile
from sitemap_crawler.storage.sqlite_store import SqliteStore

@pytest.fixture
def temp_db_path():
    fd, path = tempfile.mkstemp(suffix='.sqlite')
    os.close(fd)
    yield path
    os.remove(path)

@pytest.fixture
def store(temp_db_path):
    s = SqliteStore(temp_db_path)
    yield s
    s.close()

@pytest.fixture
def config(temp_db_path):
    return {
        'seed_urls': ['https://www.example.com/sitemap.html'],
        'allowed_domains': ['example.com'],
        'max_depth_faq': 6,
        'max_depth_general': 3,
        'robots_enabled': False, # Disable for logic tests usually, or mock
        'user_agent': 'TestBot',
        'rate_limit': {'delay': 0},
        'timeouts': {'connect': 1, 'read': 1},
        'retries': {'total': 0, 'backoff_factor': 0},
        'output_directories': {
            'html': tempfile.mkdtemp(),
            'md': tempfile.mkdtemp(),
            'pdf': tempfile.mkdtemp(),
            'pdf_text': tempfile.mkdtemp(),
            'video': tempfile.mkdtemp(),
            'transcripts': tempfile.mkdtemp(),
            'json': tempfile.mkdtemp()
        },
        'db_path': temp_db_path,
        'excluded_sitemap_sections': ['Accounts', 'Payments'],
        'content_type_allowlist': ['text/html']
    }
