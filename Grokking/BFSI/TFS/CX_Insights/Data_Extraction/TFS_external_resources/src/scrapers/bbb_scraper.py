"""BBB (Better Business Bureau) review scraper with follow-up and company response support"""
import requests
import json
import time
import re
import hashlib
from bs4 import BeautifulSoup
from pathlib import Path
from typing import Optional, Dict, List

# Default URL and output settings
DEFAULT_URL = "https://www.bbb.org/us/tx/plano/profile/auto-financing/toyota-motor-credit-corporation-0875-15000521/customer-reviews"
# Get project root directory (assuming script is in src/scrapers/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "raw"

def generate_review_id(content: str, author: str, date: str, index: int) -> str:
    """Generate a unique review ID"""
    # Create a hash from content, author, and date
    content_hash = hashlib.md5(f"{content[:50]}{author}{date}".encode()).hexdigest()[:8]
    return f"review_{content_hash}_{index:04d}"

def detect_follow_up_type(content: str, author: str) -> Optional[str]:
    """Detect if this is a follow-up comment and its type"""
    content_lower = content.lower()
    
    # Keywords for different follow-up types
    escalation_keywords = [
        "still stands", "still have to", "ongoing process", "still", "yet",
        "does not address", "doesn't address", "does not negate",
        "reconsider", "take legal", "legal action", "public actions"
    ]
    
    clarification_keywords = [
        "please note", "i should clarify", "to clarify", "just to add",
        "additional information", "further information"
    ]
    
    response_keywords = [
        "thank you for your response", "in your response", "in their response",
        "in toyota's response", "in the response", "your reply",
        "their reply", "company's response", "toyota responded"
    ]
    
    # Check for escalation
    if any(keyword in content_lower for keyword in escalation_keywords):
        return "escalation"
    
    # Check for clarification
    if any(keyword in content_lower for keyword in clarification_keywords):
        return "clarification"
    
    # Check for response to company
    if any(keyword in content_lower for keyword in response_keywords):
        return "response_to_company"
    
    return None

def is_company_response(author: str, content: str) -> bool:
    """Detect if this is a company response"""
    author_lower = author.lower()
    content_lower = content.lower()
    
    company_indicators = [
        "toyota", "toyota financial", "toyota motor credit",
        "representative", "customer service", "support team",
        "company response", "business response", "official response"
    ]
    
    # Check if author suggests company
    if any(indicator in author_lower for indicator in company_indicators):
        return True
    
    # Check if content suggests company response
    if any(indicator in content_lower for indicator in company_indicators):
        # Also check for formal language patterns
        if any(phrase in content_lower for phrase in [
            "we apologize", "we understand", "we have", "our company",
            "we are committed", "we appreciate", "we value"
        ]):
            return True
    
    return False

def mentions_company_response(content: str) -> bool:
    """Check if the review mentions a company response"""
    content_lower = content.lower()
    
    response_mentions = [
        "response", "reply", "responded", "answered", "addressed",
        "in toyota's response", "in their response", "your response",
        "company's response", "business response"
    ]
    
    return any(mention in content_lower for mention in response_mentions)

def format_review(
    title: str,
    content: str,
    stars: Optional[int],
    author: str,
    date: str,
    source_url: str,
    review_id: str,
    all_reviews: List[Dict],
    index: int
) -> Dict:
    """Format review data to the new standard format"""
    # Ensure stars format is "X out of 5 stars"
    if isinstance(stars, (int, float)):
        stars_str = f"{int(stars)} out of 5 stars"
    elif isinstance(stars, str):
        star_match = re.search(r'(\d+)', stars)
        if star_match:
            stars_str = f"{star_match.group(1)} out of 5 stars"
        else:
            stars_str = stars if "out of" in stars.lower() else f"{stars} out of 5 stars"
    else:
        stars_str = "N/A out of 5 stars"
    
    # Detect if this is a company response
    is_company = is_company_response(author, content)
    
    # Detect if this is a follow-up
    follow_up_type = detect_follow_up_type(content, author)
    is_follow_up = follow_up_type is not None and not is_company
    
    # Check if mentions company response
    mentions_response = mentions_company_response(content)
    
    review_data = {
        "review_id": review_id,
        "title": title.strip() if title else "",
        "content": content.strip() if content else "",
        "stars": stars_str,
        "author": author.strip() if author else "",
        "date": date.strip() if date else "",
        "resource": "BBB",
        "source": source_url,
        # LLM-processed fields (will be empty initially, filled by LLM processor)
        "topic": "",
        "subtopic": "",  # Note: user's example shows single string, but we can use array later
        "sentiment": "",
        "action_suggested": "",
        # Follow-up and response fields
        "is_follow_up": is_follow_up,
        "follow_up_type": follow_up_type if is_follow_up else "",
        "is_company_response": is_company,
        "mentions_company_response": mentions_response,
    }
    
    return review_data

def is_valid_review(content: str, author: str, date: str, is_company_response: bool = False) -> bool:
    """Check if this is a valid review (not disclaimer or other non-review content)"""
    if not content:
        return False
    
    content_lower = content.lower().strip()
    content_upper = content.upper().strip()
    
    # Strict filter for common non-review content patterns
    invalid_patterns = [
        r"this business is\s*not\s*bbb accredited",
        r"bbb\s*rating",
        r"file a complaint",
        r"write a review",
        r"customer reviews are not used",
        r"bbb profile",
        r"find local branches",
        r"find a location",
        r"this profile includes reviews",
        r"average of\s*\d+\s*customer reviews",
        r"customer review ratings",
        r"^this business isnotbbb",
    ]
    
    # Check patterns
    for pattern in invalid_patterns:
        if re.search(pattern, content_lower, re.I):
            return False
    
    # Check for title-only content that's not a real review
    invalid_titles = [
        "find a location",
        "customer review ratings",
        "bbb accredited",
    ]
    if content_lower in [t.lower() for t in invalid_titles]:
        return False
    
    # Skip very short non-descriptive content (but allow company responses)
    if not is_company_response and len(content.strip()) < 50:
        # For customer reviews, need substantial content
        return False
    elif is_company_response and len(content.strip()) < 20:
        # Company responses can be shorter but still need some content
        return False
    
    # Skip if content starts with invalid patterns (like "This profile includes...")
    if content_lower.startswith(("this profile includes", "average of", "customer review ratings", "find ")):
        return False
    
    # Skip if it's just a single word rating
    if len(content_lower.split()) <= 3 and content_lower in ["bad", "poor", "average", "great", "excellent", "good", "one", "two", "three", "four", "five"]:
        return False
    
    # Must have some actual content, not just metadata
    # Check if content has sentence structure (has periods, question marks, etc.)
    if not any(char in content for char in ['.', '!', '?', '\n']):
        # If no sentence endings, check if it's long enough to be a valid review
        if len(content.split()) < 10:
            return False
    
    return True

def scrape_bbb_reviews(url: Optional[str] = None, single_page_only: bool = False) -> List[Dict]:
    """
    Scrape reviews from BBB website with follow-up and company response detection
    
    Args:
        url: BBB customer reviews page URL
        single_page_only: If True, only scrape the first page. If False, scrape all pages.
    
    Returns:
        List of review dictionaries in the new format
    """
    if url is None:
        url = DEFAULT_URL
    
    all_reviews = []
    page = 1
    seen_ids = set()
    seen_content_hashes = set()
    consecutive_empty_pages = 0
    review_counter = 0
    
    if single_page_only:
        print(f"🚀 Starting to scrape BBB reviews (first page only)...\n")
    else:
        print(f"🚀 Starting to scrape BBB reviews (all pages)...\n")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    
    # Extract base URL for pagination
    base_url = url.split('?')[0] if '?' in url else url
    
    while True:
        # BBB typically uses ?page=X for pagination
        if page == 1:
            page_url = url
        else:
            page_url = f"{base_url}?page={page}"
        
        print(f"📡 Scraping page {page}: {page_url}")
        
        try:
            resp = requests.get(page_url, headers=headers, timeout=15)
            if resp.status_code != 200:
                print(f"❌ Error: {resp.status_code}")
                break
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Find review cards - BBB uses various structures
            review_cards = []
            found_count = 0
            
            # Method 1: Look for common BBB review containers with data attributes
            selectors_priority = [
                # BBB often uses specific data attributes
                ('div', {'data-review-id': True}),
                ('div', {'data-testid': re.compile(r'review', re.I)}),
                ('article', {'data-review-id': True}),
                # Then try class-based selectors
                ('div', {'class': re.compile(r'review-card|review-item|review-block|customer-review', re.I)}),
                ('article', {'class': re.compile(r'review|rating', re.I)}),
                ('div', {'class': re.compile(r'review|rating|comment|testimonial', re.I)}),
                ('section', {'class': re.compile(r'review|rating', re.I)}),
            ]
            
            for tag, attrs in selectors_priority:
                cards = soup.find_all(tag, attrs)
                if cards:
                    review_cards.extend(cards)
                    print(f"   Found {len(cards)} {tag} elements with review attributes/classes")
                    found_count += len(cards)
                    # Don't break, continue to collect all possible review containers
            
            # Method 2: Look for BBB-specific structures
            # BBB may structure reviews in specific containers
            review_containers = soup.find_all(['div', 'section', 'article'], {
                'class': re.compile(r'customer|review|feedback|testimonial|rating', re.I)
            })
            for container in review_containers:
                # Check if it contains substantial review-like content
                text = container.get_text().strip()
                if len(text) > 100 and container not in review_cards:
                    # Check if it's not already a parent/child of existing cards
                    is_child = any(card in container.find_all() for card in review_cards)
                    is_parent = any(container in card.find_all() for card in review_cards)
                    if not is_child and not is_parent:
                        review_cards.append(container)
                        found_count += 1
            
            # Method 3: Look for specific BBB review structure patterns
            # Check for patterns like author names followed by dates and content
            if not review_cards or found_count < 5:
                # Look for divs/sections that contain both author and date patterns
                all_containers = soup.find_all(['div', 'section', 'article'])
                for container in all_containers:
                    text = container.get_text()
                    # Look for date patterns (common in reviews)
                    has_date = re.search(r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|[A-Z][a-z]+\s+\d{1,2},?\s+\d{4}', text)
                    # Look for author patterns (names, initials)
                    has_author = re.search(r'\b[A-Z][a-z]+\s+[A-Z]\.|^\s*[A-Z][a-z]+\s+[A-Z][a-z]+', text)
                    # Has substantial content
                    has_content = len(text.strip()) > 100
                    
                    if has_date and has_content and container not in review_cards:
                        review_cards.append(container)
                        found_count += 1
            
            # Remove duplicates (keep first occurrence)
            unique_cards = []
            seen_text_hashes = set()
            for card in review_cards:
                text_hash = hash(card.get_text()[:100])
                if text_hash not in seen_text_hashes:
                    seen_text_hashes.add(text_hash)
                    unique_cards.append(card)
            
            review_cards = unique_cards
            print(f"   Found {len(review_cards)} unique review elements to process")
            
            if not review_cards:
                print("   ⚠️  No reviews found, likely reached the last page")
                break
            
            page_reviews = 0
            for card in review_cards:
                try:
                    # Get review ID if available from HTML
                    html_review_id = (
                        card.get('data-review-id') or 
                        card.get('id') or
                        card.get('data-id') or
                        None
                    )
                    
                    if html_review_id and html_review_id in seen_ids:
                        continue
                    
                    # Extract title
                    title_elem = (
                        card.find('h2') or
                        card.find('h3') or
                        card.find('h4') or
                        card.find('div', class_=re.compile(r'title|headline|subject', re.I)) or
                        card.find('span', class_=re.compile(r'title|headline', re.I)) or
                        card.find('strong', class_=re.compile(r'title', re.I))
                    )
                    title = title_elem.get_text(strip=True) if title_elem else ""
                    
                    # Extract content - get all text first, we'll clean it later
                    # Try to get the main content element, but if not found, get all text from card
                    content_elem = (
                        card.find('p', class_=re.compile(r'text|content|body|comment|review|description', re.I)) or
                        card.find('div', class_=re.compile(r'text|content|body|comment|review|description', re.I)) or
                        card.find('span', class_=re.compile(r'text|content|body', re.I))
                    )
                    
                    if content_elem:
                        content = content_elem.get_text(separator=' ', strip=True)
                    else:
                        # Get all text from card, but exclude title, author, date elements
                        all_text = card.get_text(separator=' ', strip=True)
                        content = all_text
                    
                    # Remove title from content if it appears at the start
                    if title and content.startswith(title):
                        content = content[len(title):].strip()
                    
                    # Get raw content before we clean author/date from it
                    raw_content = content
                    
                    # FIRST: Try to extract date and author from content (BBB often embeds them)
                    # Pattern 1: "Month Day, Year BBB Case/Review" (e.g., "October 21, 2025 BBB Case")
                    date_from_content = None
                    month_map = {
                        'january': '01', 'february': '02', 'march': '03', 'april': '04',
                        'may': '05', 'june': '06', 'july': '07', 'august': '08',
                        'september': '09', 'october': '10', 'november': '11', 'december': '12'
                    }
                    
                    # Extract date from content start (e.g., "October 21, 2025 BBB Case")
                    date_pattern1 = r'^([A-Z][a-z]+)\s+(\d{1,2}),?\s+(\d{4})\s+BBB'
                    date_match = re.search(date_pattern1, content, re.IGNORECASE)
                    if date_match:
                        month_str, day, year = date_match.group(1), date_match.group(2), date_match.group(3)
                        month = month_map.get(month_str.lower(), '01')
                        date_from_content = f"{year}-{month}-{day.zfill(2)}"
                    
                    # Pattern 2: "Contact Name: Name" (e.g., "Contact Name: Hulice REMOVED")
                    # But avoid matching "REMOVED This" or other invalid patterns
                    author_from_content = None
                    author_pattern = r'Contact\s+Name:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:of|Account|This|is|regarding|regarding)'
                    author_match = re.search(author_pattern, content, re.IGNORECASE)
                    if author_match:
                        potential_author = author_match.group(1).strip()
                        # Validate: should be a reasonable name (not "REMOVED", "This", etc.)
                        if potential_author and len(potential_author) > 2 and potential_author.lower() not in ['removed', 'this', 'the', 'that']:
                            author_from_content = potential_author
                    
                    # Alternative: Look for "submitted by Name" pattern
                    if not author_from_content:
                        submitted_pattern = r'submitted\s+by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[,.]'
                        submitted_match = re.search(submitted_pattern, content, re.IGNORECASE)
                        if submitted_match:
                            potential_author = submitted_match.group(1).strip()
                            if potential_author and len(potential_author) > 2 and potential_author.lower() not in ['removed', 'this', 'the', 'that']:
                                author_from_content = potential_author
                    
                    # Alternative: Look for "by Name" in company response context
                    if not author_from_content:
                        by_pattern = r'by\s+(?:Mr\.|Ms\.|Mrs\.|Miss)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*[,.]'
                        by_match = re.search(by_pattern, content, re.IGNORECASE)
                        if by_match:
                            potential_author = by_match.group(1).strip()
                            if potential_author and len(potential_author) > 2:
                                author_from_content = potential_author
                    
                    # Extract star rating - comprehensive search in HTML
                    stars = None
                    
                    # Method 1: Look for star elements in HTML with various patterns
                    star_elem = None
                    star_selectors = [
                        ('span', re.compile(r'star|rating|score', re.I)),
                        ('div', re.compile(r'star|rating|score', re.I)),
                        ('img', {'alt': re.compile(r'star|rating', re.I)}),
                        ('span', {'aria-label': re.compile(r'star|rating', re.I)}),
                        ('i', re.compile(r'star|rating', re.I)),
                        ('svg', re.compile(r'star|rating', re.I)),
                        ('span', {'class': re.compile(r'icon|rating', re.I)}),
                    ]
                    
                    for selector_type, selector_pattern in star_selectors:
                        if selector_type == 'img':
                            star_elem = card.find(selector_type, selector_pattern)
                        else:
                            star_elem = card.find(selector_type, class_=selector_pattern) or card.find(selector_type, selector_pattern)
                        if star_elem:
                            break
                    
                    # Method 2: Look for star rating in data attributes (including parent elements)
                    if stars is None:
                        # Check current card and parent elements for rating data
                        for elem in [card] + list(card.parents)[:5]:
                            if elem:
                                rating_attrs = ['data-rating', 'data-star-rating', 'data-score', 'data-stars', 'rating', 'data-value']
                                for attr in rating_attrs:
                                    rating_value = elem.get(attr)
                                    if rating_value:
                                        try:
                                            potential_stars = int(rating_value)
                                            if 1 <= potential_stars <= 5:
                                                stars = potential_stars
                                                break
                                        except (ValueError, TypeError):
                                            pass
                                if stars:
                                    break
                    
                    # Method 3: Count star icons/images in HTML
                    if stars is None:
                        # Look for filled/active stars (common pattern)
                        filled_stars = card.find_all(['i', 'span', 'img', 'svg'], class_=re.compile(r'filled|active|selected|star.*fill', re.I))
                        if filled_stars:
                            stars = len([s for s in filled_stars if 'star' in str(s.get('class', '')).lower() or 'star' in str(s.get('alt', '')).lower()])
                            if stars > 5:
                                stars = None  # Invalid count
                    
                    # Method 4: Look for star count in text/attributes
                    if stars is None:
                        card_html = str(card)
                        card_text = card.get_text()
                        
                        # Try to find rating in aria-label, title, or other attributes
                        rating_attr_patterns = [
                            r'aria-label=["\'](?:.*?)(\d+)\s*(?:out\s+of\s+)?5',
                            r'title=["\'](?:.*?)(\d+)\s*(?:out\s+of\s+)?5',
                            r'(\d+)\s*(?:out\s+of\s+)?5\s*stars?',
                        ]
                        for pattern in rating_attr_patterns:
                            match = re.search(pattern, card_html + ' ' + card_text, re.IGNORECASE)
                            if match:
                                try:
                                    potential_stars = int(match.group(1))
                                    if 1 <= potential_stars <= 5:
                                        stars = potential_stars
                                        break
                                except (ValueError, IndexError):
                                    pass
                    
                    # Method 5: Look for explicit rating text in content
                    if stars is None:
                        card_text = card.get_text()
                        star_text_patterns = [
                            r'(\d+)\s*(?:out\s+of\s+)?5\s*stars?',
                            r'rating[:\s]+(\d+)',
                            r'(\d+)\s*/\s*5',
                            r'(\d+)\s*stars?',
                        ]
                        for pattern in star_text_patterns:
                            match = re.search(pattern, card_text, re.IGNORECASE)
                            if match:
                                try:
                                    potential_stars = int(match.group(1))
                                    if 1 <= potential_stars <= 5:
                                        stars = potential_stars
                                        break
                                except (ValueError, IndexError):
                                    pass
                    
                    if star_elem:
                        try:
                            # Try aria-label
                            aria_label = star_elem.get('aria-label', '')
                            if aria_label:
                                star_match = re.search(r'(\d+)', aria_label)
                                if star_match:
                                    stars = int(star_match.group(1))
                            
                            # Try alt text
                            if stars is None:
                                alt_text = star_elem.get('alt', '').lower()
                                if alt_text:
                                    if 'five' in alt_text or '5' in alt_text:
                                        stars = 5
                                    elif 'four' in alt_text or '4' in alt_text:
                                        stars = 4
                                    elif 'three' in alt_text or '3' in alt_text:
                                        stars = 3
                                    elif 'two' in alt_text or '2' in alt_text:
                                        stars = 2
                                    elif 'one' in alt_text or '1' in alt_text:
                                        stars = 1
                                    else:
                                        star_match = re.search(r'(\d+)', alt_text)
                                        if star_match:
                                            stars = int(star_match.group(1))
                            
                            # Try text content
                            if stars is None:
                                star_text = star_elem.get_text().lower()
                                star_match = re.search(r'(\d+)', star_text)
                                if star_match:
                                    stars = int(star_match.group(1))
                            
                            # Try data attributes
                            if stars is None:
                                if star_elem.get('data-rating'):
                                    stars = int(star_elem.get('data-rating'))
                        except (ValueError, AttributeError):
                            pass
                    
                    # Extract author - comprehensive search in HTML
                    author = ""
                    
                    # Method 1: Search by class/attribute patterns
                    author_selectors = [
                        ('span', re.compile(r'author|name|user|customer|reviewer|consumer', re.I)),
                        ('div', re.compile(r'author|name|user|customer|reviewer|consumer', re.I)),
                        ('p', re.compile(r'author|name|user|customer|reviewer', re.I)),
                        ('strong', re.compile(r'author|name', re.I)),
                        ('h3', re.compile(r'author|name|reviewer', re.I)),
                        ('h4', re.compile(r'author|name|reviewer', re.I)),
                        ('h5', re.compile(r'author|name', re.I)),
                    ]
                    
                    for tag, pattern in author_selectors:
                        author_elem = card.find(tag, class_=pattern)
                        if author_elem:
                            author_text = author_elem.get_text(strip=True)
                            # Validate: should be a reasonable name
                            if author_text and len(author_text) > 2 and not author_text.upper() in ['REMOVED', 'THIS', 'THE']:
                                author = author_text
                                break
                    
                    # Method 2: Search by data attributes
                    if not author:
                        author_attrs = ['data-author', 'data-reviewer', 'data-consumer', 'data-user', 'data-name']
                        for attr in author_attrs:
                            author_value = card.get(attr)
                            if author_value:
                                author = author_value.strip()
                                break
                    
                    # Method 3: Search in all child elements for author-like text
                    if not author:
                        # Look for text that matches name patterns in visible elements
                        all_elements = card.find_all(['span', 'div', 'p', 'strong', 'h3', 'h4', 'h5'])
                        for elem in all_elements:
                            elem_text = elem.get_text(strip=True)
                            # Pattern: "First Last" or "First L." (2-3 words, starting with capital)
                            name_pattern = r'^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2}$'
                            if re.match(name_pattern, elem_text) and 3 < len(elem_text) < 50:
                                # Check if it's not a common word
                                if elem_text.lower() not in ['contact', 'name', 'date', 'review', 'rating', 'stars', 'posted']:
                                    author = elem_text
                                    break
                    
                    # Use author from content if not found in HTML
                    if not author and author_from_content:
                        author = author_from_content
                    
                    # Clean up author: remove "REMOVED" suffix if present
                    if author and 'REMOVED' in author:
                        # Try to extract just the name part before REMOVED
                        name_match = re.search(r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+REMOVED', author)
                        if name_match:
                            author = name_match.group(1).strip()
                        # If author is just "REMOVED" or starts with "REMOVED", set to empty
                        elif author.strip().upper() == 'REMOVED' or author.strip().startswith('REMOVED'):
                            author = ""
                    
                    # Final validation: author should be a reasonable name
                    if author:
                        # Remove common invalid patterns
                        invalid_patterns = ['REMOVED This', 'REMOVED Vehicle', 'REMOVED Case']
                        if any(pattern in author for pattern in invalid_patterns):
                            # Try to extract just the name part
                            name_parts = author.split()
                            valid_parts = [p for p in name_parts if p.upper() != 'REMOVED' and len(p) > 2]
                            if valid_parts:
                                author = ' '.join(valid_parts)
                            else:
                                author = ""
                    
                    # Extract date - comprehensive search in HTML
                    date = ""
                    
                    # Method 1: Look for <time> elements
                    time_elem = card.find('time')
                    if time_elem:
                        date = time_elem.get('datetime', '') or time_elem.get_text(strip=True)
                        if date and "T" in date:
                            date = date.split("T")[0]
                    
                    # Method 2: Search by class/attribute patterns
                    if not date:
                        date_selectors = [
                            ('span', re.compile(r'date|time|posted|published', re.I)),
                            ('div', re.compile(r'date|time|posted|published', re.I)),
                            ('p', re.compile(r'date|time|posted', re.I)),
                            ('strong', re.compile(r'date|time', re.I)),
                        ]
                        for tag, pattern in date_selectors:
                            date_elem = card.find(tag, class_=pattern)
                            if date_elem:
                                date_text = date_elem.get_text(strip=True)
                                if date_text and len(date_text) > 5:  # Date should be at least 5 chars
                                    date = date_text
                                    break
                    
                    # Method 3: Search by data attributes
                    if not date:
                        date_attrs = ['data-date', 'data-time', 'data-posted', 'data-published', 'datetime']
                        for attr in date_attrs:
                            date_value = card.get(attr)
                            if date_value:
                                date = date_value.strip()
                                break
                    
                    # Method 4: Search in all visible text for date patterns
                    if not date:
                        card_text = card.get_text()
                        # Look for date patterns: MM/DD/YYYY, Month Day, Year, etc.
                        date_patterns = [
                            r'\b(\d{1,2}/\d{1,2}/\d{4})\b',
                            r'\b([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})\b',
                            r'\b(\d{4}-\d{2}-\d{2})\b',
                        ]
                        for pattern in date_patterns:
                            match = re.search(pattern, card_text)
                            if match:
                                date = match.group(1)
                                break
                    
                    # Use date from content if not found in HTML
                    if not date and date_from_content:
                        date = date_from_content
                    
                    # Parse date from various formats
                    if date:
                        # Try to extract YYYY-MM-DD
                        date_match = re.search(r'(\d{4}-\d{2}-\d{2})', date)
                        if date_match:
                            date = date_match.group(1)
                        else:
                            # Try MM/DD/YYYY format
                            date_match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', date)
                            if date_match:
                                m, d, y = date_match.group(1), date_match.group(2), date_match.group(3)
                                date = f"{y}-{m.zfill(2)}-{d.zfill(2)}"
                            else:
                                # Try Month Day, Year format (e.g., "July 16, 2025")
                                date_match = re.search(r'([A-Z][a-z]+)\s+(\d{1,2}),?\s+(\d{4})', date)
                                if date_match:
                                    try:
                                        month_str, day, year = date_match.group(1), date_match.group(2), date_match.group(3)
                                        month_map = {
                                            'january': '01', 'february': '02', 'march': '03', 'april': '04',
                                            'may': '05', 'june': '06', 'july': '07', 'august': '08',
                                            'september': '09', 'october': '10', 'november': '11', 'december': '12'
                                        }
                                        month = month_map.get(month_str.lower(), '01')
                                        date = f"{year}-{month}-{day.zfill(2)}"
                                    except:
                                        date = ""
                    
                    # If author/date not found in separate elements, try to extract from content
                    # BBB sometimes embeds author and date in content like "Lynne ADate:07/16/2025..."
                    if not author or not date:
                        # Try to extract from content start
                        content_start = content[:200] if content else ""
                        
                        # Pattern: "NameDate:MM/DD/YYYY" or "Name Date: MM/DD/YYYY"
                        author_date_pattern = r'^([A-Z][a-z]+(?:\s+[A-Z]\.?)?)\s*(?:Date|date)[:\s]*(\d{1,2}/\d{1,2}/\d{4})'
                        match = re.search(author_date_pattern, content_start, re.IGNORECASE)
                        
                        if match:
                            if not author:
                                author = match.group(1).strip()
                            if not date:
                                date_str = match.group(2)
                                date_match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', date_str)
                                if date_match:
                                    m, d, y = date_match.group(1), date_match.group(2), date_match.group(3)
                                    date = f"{y}-{m.zfill(2)}-{d.zfill(2)}"
                                # Also try to clean content to remove the author/date prefix
                                content = re.sub(author_date_pattern, '', content, flags=re.IGNORECASE).strip()
                        
                        # Alternative pattern: "Name Date: Month Day, Year" or "Name\nDate: MM/DD/YYYY"
                        if not author or not date:
                            alt_pattern = r'^([A-Z][a-z]+(?:\s+[A-Z]\.?)?)\s*(?:\n|\s+)?(?:Date|date)[:\s]*([A-Z][a-z]+\s+\d{1,2},?\s+\d{4}|\d{1,2}/\d{1,2}/\d{4})'
                            match = re.search(alt_pattern, content_start, re.MULTILINE | re.IGNORECASE)
                            if match:
                                if not author:
                                    author = match.group(1).strip()
                                if not date:
                                    date_str = match.group(2).strip()
                                    # Try MM/DD/YYYY format
                                    date_match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', date_str)
                                    if date_match:
                                        m, d, y = date_match.group(1), date_match.group(2), date_match.group(3)
                                        date = f"{y}-{m.zfill(2)}-{d.zfill(2)}"
                                    else:
                                        # Try Month Day, Year format
                                        date_match = re.search(r'([A-Z][a-z]+)\s+(\d{1,2}),?\s+(\d{4})', date_str)
                                        if date_match:
                                            try:
                                                month_str, day, year = date_match.group(1), date_match.group(2), date_match.group(3)
                                                month_map = {
                                                    'january': '01', 'february': '02', 'march': '03', 'april': '04',
                                                    'may': '05', 'june': '06', 'july': '07', 'august': '08',
                                                    'september': '09', 'october': '10', 'november': '11', 'december': '12'
                                                }
                                                month = month_map.get(month_str.lower(), '01')
                                                date = f"{year}-{month}-{day.zfill(2)}"
                                            except:
                                                pass
                                    # Clean content - remove author/date prefix from content
                                    if match:
                                        # Remove the matched pattern from content
                                        content = re.sub(alt_pattern, '', content, flags=re.MULTILINE | re.IGNORECASE).strip()
                                        # Also remove if content starts with author name followed by date
                                        content = re.sub(r'^' + re.escape(match.group(1)) + r'\s*', '', content, flags=re.IGNORECASE).strip()
                    
                    # Final cleanup: remove common prefixes from content
                    # Remove date pattern from start (e.g., "October 21, 2025 BBB Case")
                    content = re.sub(r'^[A-Z][a-z]+\s+\d{1,2},?\s+\d{4}\s+BBB\s+(?:Case|Review|Case:)\s*', '', content, flags=re.IGNORECASE).strip()
                    # Remove "Contact Name: Name" pattern
                    content = re.sub(r'Contact\s+Name:\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s*', '', content, flags=re.IGNORECASE).strip()
                    # Remove other common prefixes
                    content = re.sub(r'^(?:Date|date)[:\s]*', '', content, flags=re.IGNORECASE).strip()
                    content = re.sub(r'^[A-Z][a-z]+\s+[A-Z]\.?\s*', '', content).strip()  # Remove author initials at start
                    # Remove "Account Number: ..." if present
                    content = re.sub(r'Account\s+Number:\s*[^\s]+\s*', '', content, flags=re.IGNORECASE).strip()
                    # Remove "BBB Case: ..." if present
                    content = re.sub(r'BBB\s+Case:\s*[^\s]+\s*', '', content, flags=re.IGNORECASE).strip()
                    
                    # Check if this is a company response (before validation)
                    is_company = is_company_response(author, content)
                    
                    # Validate review
                    if not is_valid_review(content, author, date, is_company):
                        continue
                    
                    # Create content hash for deduplication
                    content_hash = hash((content[:100], author, date))
                    if content_hash in seen_content_hashes:
                        continue
                    
                    # Generate review ID
                    review_counter += 1
                    review_id = html_review_id or generate_review_id(content, author, date, review_counter)
                    
                    # Ensure unique ID
                    if review_id in seen_ids:
                        review_id = f"{review_id}_{review_counter}"
                    seen_ids.add(review_id)
                    
                    # Create source URL
                    if html_review_id:
                        source_url = f"{page_url}#review-{html_review_id}"
                    else:
                        source_url = page_url
                    
                    # Format review with new structure
                    formatted_review = format_review(
                        title, content, stars, author, date, source_url,
                        review_id, all_reviews, review_counter
                    )
                    
                    all_reviews.append(formatted_review)
                    seen_content_hashes.add(content_hash)
                    page_reviews += 1
                
                except Exception as e:
                    print(f"   ⚠️  Skipped one review, error: {e}")
                    continue
            
            print(f"   ✅ Extracted {page_reviews} new reviews from this page, total: {len(all_reviews)} unique reviews\n")
            
            if single_page_only:
                break
            
            if len(review_cards) == 0:
                break
            
            if page_reviews == 0:
                consecutive_empty_pages += 1
                if consecutive_empty_pages >= 2:
                    print("   ⚠️  No new reviews found for 2 consecutive pages, stopping")
                    break
            else:
                consecutive_empty_pages = 0
            
            page += 1
            time.sleep(2)  # Polite delay
            
        except Exception as e:
            print(f"❌ Request exception: {e}")
            break
    
    return all_reviews

def group_reviews_by_author(reviews: List[Dict]) -> List[Dict]:
    """
    Group reviews by author into nested format:
    {
        "author": "...",
        "main_review": {...},
        "follow_up": {...},  # Optional, single object
        "company_response": {...}  # Optional, single object
    }
    """
    # Build a map: review_id -> review
    review_map = {review.get("review_id"): review for review in reviews}
    
    # Group reviews by author
    author_reviews = {}
    company_responses_list = []
    
    for review in reviews:
        author = review.get("author", "").strip()
        
        if review.get("is_company_response", False):
            company_responses_list.append(review)
            continue
        
        # Skip if author is empty (will use review_id as identifier)
        if not author:
            review_id = review.get("review_id", "unknown")
            author = f"Anonymous_{review_id.split('_')[1] if '_' in review_id else review_id[:8]}"
        
        if author not in author_reviews:
            author_reviews[author] = []
        
        author_reviews[author].append(review)
    
    # Build result groups
    result = []
    company_response_map = {}  # review_id -> company_response
    
    # First, map company responses to customer reviews
    # For now, we'll try to match company responses to customer reviews by proximity/date
    # This is a simplified approach - in practice, you might need more sophisticated matching
    
    for company_response in company_responses_list:
        # Try to find the related customer review
        # Check if any customer review mentions this company response
        company_response_id = company_response.get("review_id")
        for review in reviews:
            if not review.get("is_company_response", False):
                # Simple heuristic: if customer review mentions company response keywords
                # and company response is close in date, link them
                review_content = review.get("content", "").lower()
                if mentions_company_response(review_content):
                    company_response_map[review.get("review_id")] = company_response
                    break
    
    # Build groups for each author
    for author, author_review_list in author_reviews.items():
        # Sort reviews by date (earliest first) to determine main review
        author_review_list.sort(key=lambda x: x.get("date", ""))
        
        if not author_review_list:
            continue
        
        # First review (earliest) is the main review
        main_review = author_review_list[0]
        
        # Find follow-up (if any) - next review by same author that is marked as follow-up
        follow_up = None
        for review in author_review_list[1:]:
            if review.get("is_follow_up", False):
                follow_up = {
                    "date": review.get("date"),
                    "content": review.get("content")
                }
                break  # Take first follow-up only
        
        # Find company response for this review
        company_response = None
        review_id = main_review.get("review_id")
        if review_id in company_response_map:
            company_response_obj = company_response_map[review_id]
            company_response = {
                "date": company_response_obj.get("date"),
                "content": company_response_obj.get("content")
            }
        
        group = {
            "author": author,
            "main_review": {
                "review_id": main_review.get("review_id"),
                "date": main_review.get("date"),
                "content": main_review.get("content"),
                "stars": main_review.get("stars", "")
            }
        }
        
        if follow_up:
            group["follow_up"] = follow_up
        
        if company_response:
            group["company_response"] = company_response
        
        result.append(group)
    
    # Sort by main review date (newest first)
    result.sort(key=lambda x: x["main_review"].get("date", ""), reverse=True)
    
    return result

if __name__ == "__main__":
    # Scrape BBB reviews
    reviews = scrape_bbb_reviews(single_page_only=False)
    
    # Remove duplicates one more time (safety check)
    unique_reviews = []
    seen = set()
    for review in reviews:
        key = (review.get("content", "")[:100], review.get("author", ""), review.get("date", ""))
        if key not in seen:
            seen.add(key)
            unique_reviews.append(review)
    
    print(f"\n📊 Statistics:")
    print(f"   Total scraped: {len(reviews)}")
    print(f"   Unique reviews: {len(unique_reviews)}")
    
    # Count follow-ups and company responses
    follow_ups = sum(1 for r in unique_reviews if r.get("is_follow_up", False))
    company_responses = sum(1 for r in unique_reviews if r.get("is_company_response", False))
    print(f"   Follow-up comments: {follow_ups}")
    print(f"   Company responses: {company_responses}")
    
    # Group reviews by author into nested format
    print(f"\n📦 Grouping reviews by author...")
    grouped_reviews = group_reviews_by_author(unique_reviews)
    print(f"   Grouped into {len(grouped_reviews)} author groups")
    
    # Save to data/raw directory (nested format)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / "bbb_toyota_reviews.json"
    
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(grouped_reviews, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Done! Saved {len(grouped_reviews)} grouped reviews to {output_file}")
    print(f"📄 Format: grouped by author with main_review, follow_up, and company_response")
