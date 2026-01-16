from bs4 import BeautifulSoup
import logging
from typing import List, Dict, Any, Optional
import re

logger = logging.getLogger(__name__)

class FAQExtractor:
    def __init__(self):
        pass

    def extract(self, soup: BeautifulSoup, url: str) -> List[Dict[str, Any]]:
        """
        Extracts FAQs from the page.
        Returns a list of dicts with question_text, answer_text, answer_raw_html, etc.
        """
        faqs = []
        
        # Strategy 1: Look for specific FAQ accordions (common in modern sites)
        # Often div with class "accordion" or similar, or specific custom structures if known.
        # Since I don't have the HTML, I'll look for generic structures that usually denote FAQs.
        # But the spec mentions "For known FAQ pages". 
        # I'll try to find pairs of Question/Answer.
        
        # Heuristic: Look for elements that look like questions (ends with ?) followed by content.
        # Or typical structure: button/heading (Q) -> div (A).
        
        # Let's try to identify common FAQ containers.
        # Based on typical enterprise sites (Adobe AEM etc often used by big corps):
        # - .cmp-accordion__item
        # - .accordion-item
        # - details/summary
        
        candidates = []
        
        # Check for standard details/summary
        for details in soup.find_all('details'):
            summary = details.find('summary')
            if summary:
                question = summary.get_text(strip=True)
                # Answer is everything else in details
                # We need to exclude summary from answer
                answer_html = ""
                answer_text = ""
                
                # Clone details to manipulate
                import copy
                details_clone = copy.copy(details)
                if details_clone.find('summary'):
                    details_clone.find('summary').decompose()
                
                answer_html = str(details_clone.encode_contents().decode('utf-8')).strip()
                answer_text = details_clone.get_text(separator=' ', strip=True)
                
                if question and answer_text:
                    candidates.append({
                        'question': question,
                        'answer_text': answer_text,
                        'answer_html': answer_html
                    })

        # Check for common Accordion patterns if details/summary not found or mixed
        # Often: .accordion-header / .accordion-content
        # Or: dt / dd
        if not candidates:
             dls = soup.find_all('dl')
             for dl in dls:
                 dts = dl.find_all('dt')
                 for dt in dts:
                     dd = dt.find_next_sibling('dd')
                     if dd:
                         candidates.append({
                             'question': dt.get_text(strip=True),
                             'answer_text': dd.get_text(separator=' ', strip=True),
                             'answer_html': str(dd.encode_contents().decode('utf-8')).strip()
                         })

        # Strategy 3: Bootstrap Accordion (.accordion-card)
        # Structure:
        # <div class="accordion-card">
        #   <div class="card-header">...<button>Question</button>...</div>
        #   <div class="collapse">
        #     <div class="card-body">Answer</div>
        #   </div>
        # </div>
        if not candidates:
            accordion_cards = soup.select('.accordion-card')
            for card in accordion_cards:
                question_text = ""
                # Question is usually in card-header -> button
                card_header = card.select_one('.card-header')
                if card_header:
                    # Try to find button text, fallback to header text
                    button = card_header.select_one('button')
                    if button:
                         question_text = button.get_text(separator=' ', strip=True)
                    else:
                         question_text = card_header.get_text(separator=' ', strip=True)
                
                # Answer is in card-body
                card_body = card.select_one('.card-body')
                
                if card_body and question_text:
                    candidates.append({
                        'question': question_text,
                        'answer_text': card_body.get_text(separator=' ', strip=True),
                        'answer_html': str(card_body.encode_contents().decode('utf-8')).strip()
                    })

        # Strategy 4: Specific Custom Structure
        # <p class="faq_ques_text bold">Question</p>
        # <div class="col-sm-12 faq-ans">Answer</div>
        if not candidates:
            # Look for the question container
            question_els = soup.select('.faq_ques_text')
            for q_el in question_els:
                question_text = q_el.get_text(strip=True)
                
                # The answer is often in a following div with class faq-ans
                # It might be a sibling or nested differently depending on the exact page layout.
                # In the observed HTML:
                # <div class="col-sm-12">
                #    <p class="faq_ques_text ...">...</p>
                #    <div class="col-sm-12 faq-ans">...</div>
                # </div>
                
                # So we look for the next sibling that matches, or search within the parent.
                parent = q_el.parent
                answer_el = parent.select_one('.faq-ans')
                
                if answer_el:
                    candidates.append({
                        'question': question_text,
                        'answer_text': answer_el.get_text(separator=' ', strip=True),
                        'answer_html': str(answer_el.encode_contents().decode('utf-8')).strip()
                    })

        # If still no candidates, we might look for headings followed by text blocks if the page title implies FAQ.
        # But let's stick to structural cues for now to avoid false positives.
        
        # Process candidates to add metadata
        for item in candidates:
            faqs.append({
                'document_url': url,
                'question_text': item['question'],
                'answer_text': item['answer_text'],
                'answer_raw_html': item['answer_html'],
                'answer_mode': self._determine_answer_mode(item['answer_text'], item['answer_html']),
                'link_depth_to_answer': 0 if len(item['answer_text']) > 50 else None # Placeholder logic
            })
            
        return faqs

    def _determine_answer_mode(self, text: str, html: str) -> str:
        """
        Compute answer mode:
        DIRECT_TEXT (answer length > threshold)
        LINK_OUT (links present)
        PHONE_ESCALATION (phone/contact detected)
        PDF_ATTACHMENT (pdf referenced)
        VIDEO (video/transcript referenced)
        PORTAL_REDIRECT (login/portal link detected)
        """
        mode = "DIRECT_TEXT"
        
        soup = BeautifulSoup(html, 'html.parser')
        links = soup.find_all('a')
        
        has_links = len(links) > 0
        has_pdf = any(l.get('href', '').lower().endswith('.pdf') for l in links)
        has_portal = any('login' in l.get('href', '').lower() or 'account' in l.get('href', '').lower() for l in links)
        
        # Check for phone numbers
        # Regex for simple phone detection
        phone_pattern = re.compile(r'(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}')
        has_phone = bool(phone_pattern.search(text))
        
        if has_portal:
            return "PORTAL_REDIRECT"
        if has_pdf:
            return "PDF_ATTACHMENT"
        if "video" in html.lower() or "transcript" in html.lower():
            return "VIDEO" # Simple heuristic
        if has_phone:
            return "PHONE_ESCALATION"
        if has_links:
            return "LINK_OUT"
            
        return mode
