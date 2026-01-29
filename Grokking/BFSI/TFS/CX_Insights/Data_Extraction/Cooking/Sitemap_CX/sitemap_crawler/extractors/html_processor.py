from bs4 import BeautifulSoup
import logging
from typing import List, Dict, Optional, Set
from urllib.parse import urljoin, urlparse
import re

logger = logging.getLogger(__name__)

def get_soup(html_content: str) -> BeautifulSoup:
    return BeautifulSoup(html_content, 'lxml')

def extract_links(soup: BeautifulSoup, base_url: str) -> List[Dict[str, str]]:
    """
    Extracts all links from the soup.
    Returns a list of dicts with 'url', 'text', 'rel'.
    """
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        if not href or href.startswith(('javascript:', 'mailto:', 'tel:')):
            continue
            
        absolute_url = urljoin(base_url, href)
        text = a.get_text(strip=True)
        
        links.append({
            'url': absolute_url,
            'text': text,
            'rel': a.get('rel', [])
        })
    return links

def clean_html(soup: BeautifulSoup, selectors_to_remove: List[str] = None):
    """
    Removes unwanted elements from the soup in-place.
    """
    if selectors_to_remove is None:
        selectors_to_remove = ['script', 'style', 'noscript', 'iframe', 'svg']
        
    for selector in selectors_to_remove:
        for element in soup.select(selector):
            element.decompose()
            
    # Remove comments
    # (Optional, BeautifulSoup usually handles this if we just get text, but for HTML preservation it might be good)
