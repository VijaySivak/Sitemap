import requests
import time
import logging
from typing import Optional, Dict, Tuple
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

class Fetcher:
    def __init__(self, config: Dict):
        self.user_agent = config.get('user_agent', 'TFS_Crawler_Bot/1.0')
        self.timeouts = config.get('timeouts', {'connect': 10, 'read': 30})
        self.delay = config.get('rate_limit', {}).get('delay', 1.0)
        
        retries_config = config.get('retries', {})
        total_retries = retries_config.get('total', 3)
        backoff_factor = retries_config.get('backoff_factor', 1)
        
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': self.user_agent})
        
        retry_strategy = Retry(
            total=total_retries,
            backoff_factor=backoff_factor,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["HEAD", "GET", "OPTIONS"]
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("https://", adapter)
        self.session.mount("http://", adapter)
        
        self.last_request_time = 0
        self.logger = logging.getLogger(__name__)

    def _wait_for_rate_limit(self):
        now = time.time()
        elapsed = now - self.last_request_time
        if elapsed < self.delay:
            time.sleep(self.delay - elapsed)
        self.last_request_time = time.time()

    def fetch(self, url: str, stream: bool = False) -> Tuple[Optional[requests.Response], Optional[str]]:
        """
        Fetches the URL.
        Returns (response, error_message).
        """
        self._wait_for_rate_limit()
        try:
            # First, check content type with HEAD if likely a large file? 
            # Actually, standard requests usage:
            # We will use GET with stream=True to inspect headers before downloading content if needed, 
            # but for simplicity we can just GET.
            # The spec says "extract content from all pages".
            # For PDFs/Videos we might want to stream.
            
            timeout = (self.timeouts['connect'], self.timeouts['read'])
            response = self.session.get(url, timeout=timeout, stream=stream, allow_redirects=True)
            response.raise_for_status()
            return response, None
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching {url}: {e}")
            return None, str(e)
            
    def download_file(self, url: str, target_path: str) -> bool:
        """Downloads a file to the target path."""
        response, error = self.fetch(url, stream=True)
        if error or not response:
            return False
            
        try:
            with open(target_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        except Exception as e:
            self.logger.error(f"Error saving file {url} to {target_path}: {e}")
            return False
