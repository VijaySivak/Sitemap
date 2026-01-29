import urllib.robotparser
from urllib.parse import urlparse
import logging
import time

class RobotsParser:
    def __init__(self, user_agent: str, enabled: bool = True):
        self.user_agent = user_agent
        self.enabled = enabled
        self.parsers = {} # domain -> RobotFileParser
        self.logger = logging.getLogger(__name__)

    def can_fetch(self, url: str) -> bool:
        if not self.enabled:
            return True

        parsed = urlparse(url)
        domain = parsed.netloc
        scheme = parsed.scheme
        
        if not domain:
            return False

        robots_url = f"{scheme}://{domain}/robots.txt"

        if domain not in self.parsers:
            rp = urllib.robotparser.RobotFileParser()
            rp.set_url(robots_url)
            try:
                self.logger.info(f"Fetching robots.txt for {domain}")
                rp.read()
                self.parsers[domain] = rp
            except Exception as e:
                self.logger.warning(f"Failed to fetch/parse robots.txt for {domain}: {e}")
                # If robots.txt fails, default to strict or permissive? 
                # Standard practice usually defaults to allow if robots.txt is missing/error 
                # (unless it's a timeout/5xx which implies site issues, but simple error usually means no robots.txt)
                # For safety in this strict project, we might want to log it. 
                # But let's assume allow if read fails (e.g. 404).
                # If we strictly can't read it, we might want to be careful.
                # However, urllib.robotparser defaults to allow_all=True if set_url isn't followed by read() success 
                # on some versions or if mtime is old.
                # Explicitly: if read() raises, internal state might not be set.
                # Let's set it to allow all if failed, assuming 404.
                rp.allow_all = True
                self.parsers[domain] = rp

        return self.parsers[domain].can_fetch(self.user_agent, url)
