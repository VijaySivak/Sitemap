import markdownify
from bs4 import BeautifulSoup
import logging
from typing import Dict, Any, List, Optional

logger = logging.getLogger(__name__)

class DocumentExtractor:
    def __init__(self, config: Dict):
        self.main_content_selectors = config.get('main_content_selectors', ['main', '#main-content', 'article'])
        self.html_to_md_options = {
            'heading_style': 'ATX',
            'strip': ['script', 'style', 'noscript', 'iframe', 'svg', 'nav', 'footer']
        }

    def extract_content(self, html_content: str, url: str) -> Dict[str, Any]:
        """
        Extracts main content and converts to Markdown.
        """
        soup = BeautifulSoup(html_content, 'lxml')
        
        # 1. Identify Main Content
        main_content_soup = self._find_main_content(soup)
        
        # 2. Extract Text
        # We use the main content if found, otherwise full body
        text_content = main_content_soup.get_text(separator='\n', strip=True)
        
        # 3. Convert to Markdown
        # markdownify works on HTML string. 
        # We prefer converting the main content, but if it's too small, maybe full page?
        # The spec says "Extract 'everything' (document content)". 
        # But also "avoid nav/footer noise".
        
        try:
            markdown_content = markdownify.markdownify(str(main_content_soup), **self.html_to_md_options)
        except Exception as e:
            logger.error(f"Error converting HTML to Markdown for {url}: {e}")
            markdown_content = ""
            
        return {
            'extracted_text': text_content,
            'markdown_content': markdown_content,
            'title': self._extract_title(soup)
        }

    def _find_main_content(self, soup: BeautifulSoup) -> BeautifulSoup:
        """
        Attempts to find the main content area using configured selectors.
        Falls back to body if not found.
        """
        for selector in self.main_content_selectors:
            selection = soup.select_one(selector)
            if selection:
                return selection
        
        # Fallback: Body without nav/footer if possible
        body = soup.body
        if body:
            # We don't want to mutate the original soup potentially if it's used elsewhere, 
            # but here we are just extracting. 
            # However, to be safe, we might clone, or just exclude nav/footer from text extraction via strip tags in markdownify.
            # But for get_text(), we might get nav noise.
            # Let's try to be smart about fallback.
            return body
            
        return soup

    def _extract_title(self, soup: BeautifulSoup) -> str:
        if soup.title:
            return soup.title.get_text(strip=True)
        h1 = soup.find('h1')
        if h1:
            return h1.get_text(strip=True)
        return ""
