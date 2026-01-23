import requests
import json
import time
import re
from bs4 import BeautifulSoup

DOMAIN = "toyotafinancial.com"
OUTPUT_FILE = "toyota_trustpilot_reviews.json"

def format_review(title, content, stars, author, date, source_url=None):
    """Format review data to standard format"""
    # Ensure stars format is "X out of 5 stars"
    if isinstance(stars, (int, float)):
        stars_str = f"{int(stars)} out of 5 stars"
    elif isinstance(stars, str):
        # If already string format, try to extract number
        star_match = re.search(r'(\d+)', stars)
        if star_match:
            stars_str = f"{star_match.group(1)} out of 5 stars"
        else:
            stars_str = stars if "out of" in stars.lower() else f"{stars} out of 5 stars"
    else:
        stars_str = "N/A out of 5 stars"
    
    return {
        "title": title.strip() if title else "",
        "content": content.strip() if content else "",
        "stars": stars_str,
        "author": author.strip() if author else "",
        "date": date.strip() if date else "",
        "resource": "Trustpilot",
        "source": source_url if source_url else ""
    }

def is_valid_review(content, author, date):
    """Check if this is a valid review (not disclaimer or other non-review content)"""
    if not content:
        return False
    
    # Filter out common non-review content
    invalid_keywords = [
        "companies on trustpilot aren't allowed",
        "how is the trustscore calculated",
        "write a review",
        "visit website",
        "hasn't replied to negative reviews",
        "review summary",
        "how this company uses trustpilot",
        "trustscore",
        "bad",  # This might be too broad, but "bad" rating label is not a review
    ]
    
    content_lower = content.lower().strip()
    
    # Skip if content is just a single word that's a rating label
    if len(content_lower.split()) <= 2 and content_lower in ["bad", "poor", "average", "great", "excellent"]:
        return False
    
    for keyword in invalid_keywords:
        if keyword in content_lower:
            return False
    
    # Content should be substantial (at least 20 characters to avoid very short UI text)
    if len(content.strip()) < 20:
        return False
    
    # Prefer reviews with author or date, but don't require both
    # (some reviews might not have both, but still be valid)
    
    return True

def scrape_trustpilot_reviews(single_page_only=False):
    """
    Scrape reviews from Trustpilot website
    
    Args:
        single_page_only: If True, only scrape the first page. If False, scrape all pages.
                         Trustpilot typically shows 20 reviews per page, so with 215 total reviews,
                         you need to scrape multiple pages to get all reviews.
    """
    all_reviews = []
    page = 1
    seen_ids = set()  # Track review IDs to avoid duplicates
    seen_content_hashes = set()  # Track content hashes to avoid duplicates
    consecutive_empty_pages = 0  # Track consecutive pages with no new reviews
    
    if single_page_only:
        print(f"🚀 Starting to scrape Trustpilot reviews (first page only)...\n")
        print(f"ℹ️  Note: Trustpilot shows ~20 reviews per page. To get all 215 reviews, set single_page_only=False\n")
    else:
        print(f"🚀 Starting to scrape Trustpilot reviews (all pages)...\n")
        print(f"ℹ️  Note: Trustpilot uses pagination (~20 reviews per page). Will scrape all pages until no more reviews found.\n")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    
    while True:
        url = f"https://www.trustpilot.com/review/{DOMAIN}?page={page}"
        print(f"📡 Scraping page {page}: {url}")
        
        try:
            resp = requests.get(url, headers=headers, timeout=15)
            if resp.status_code != 200:
                print(f"❌ Error: {resp.status_code}")
                break
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Try multiple selectors to find review elements (use the original broader approach)
            review_cards = []
            
            # Method 1: section with data-consumer-review-id (most specific)
            cards = soup.find_all('section', {'data-consumer-review-id': True})
            if cards:
                review_cards.extend(cards)
                print(f"   Found {len(cards)} sections with data-consumer-review-id")
            
            # Method 2: article with data-review-id
            if not review_cards:
                cards = soup.find_all('article', {'data-review-id': True})
                if cards:
                    review_cards.extend(cards)
                    print(f"   Found {len(cards)} articles with data-review-id")
            
            # Method 3: div with review-related classes (broader search - this was finding 226 before)
            if not review_cards:
                cards = soup.find_all('div', class_=re.compile(r'review|card', re.I))
                review_cards.extend(cards)
                if review_cards:
                    print(f"   Found {len(review_cards)} divs with review/card class")
            
            # Method 4: Look for elements with data-review-text-typography and get their parents
            if not review_cards:
                text_elems = soup.find_all(attrs={'data-consumer-review-text-typography': True})
                # Get parent containers
                parent_set = set()
                for elem in text_elems:
                    parent = elem.find_parent(['section', 'article', 'div'])
                    if parent:
                        parent_set.add(parent)
                review_cards = list(parent_set)
                if review_cards:
                    print(f"   Found {len(review_cards)} elements via data-consumer-review-text-typography")
            
            print(f"   Found {len(review_cards)} review elements to process")
            
            if not review_cards:
                print("   ⚠️  No reviews found, likely reached the last page")
                break
            
            page_reviews = 0
            for card in review_cards:
                try:
                    # Get review ID to avoid duplicates
                    review_id = (
                        card.get('data-review-id') or 
                        card.get('data-consumer-review-id') or
                        None
                    )
                    
                    if review_id and review_id in seen_ids:
                        continue
                    
                    # Extract title
                    title_elem = (
                        card.find('h2', class_=re.compile(r'title|headline', re.I)) or
                        card.find('a', class_=re.compile(r'title|headline', re.I)) or
                        card.select_one('[data-review-title-typography]') or
                        card.select_one('h2')
                    )
                    title = title_elem.get_text(strip=True) if title_elem else ""
                    
                    # Extract content
                    content_elem = (
                        card.find('p', class_=re.compile(r'text|content|body', re.I)) or
                        card.select_one('[data-review-text-typography]') or
                        card.find('div', class_=re.compile(r'text|content', re.I)) or
                        card.find('p')
                    )
                    content = content_elem.get_text(strip=True) if content_elem else ""
                    
                    # Extract star rating
                    stars = None
                    star_elem = (
                        card.find('img', alt=re.compile(r'star|rating', re.I)) or
                        card.find('div', class_=re.compile(r'star|rating', re.I)) or
                        card.select_one('[data-star-rating]')
                    )
                    if star_elem:
                        try:
                            if star_elem.get('alt'):
                                alt_text = star_elem.get('alt', '').lower()
                                # Handle text like "five stars" or "5 stars"
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
                                    # Try to extract number
                                    star_match = re.search(r'(\d+)', alt_text)
                                    if star_match:
                                        stars = int(star_match.group(1))
                            elif star_elem.get('data-star-rating'):
                                stars = int(star_elem.get('data-star-rating'))
                            else:
                                # Find number in text
                                star_text = star_elem.get_text().lower()
                                if 'five' in star_text or '5' in star_text:
                                    stars = 5
                                elif 'four' in star_text or '4' in star_text:
                                    stars = 4
                                elif 'three' in star_text or '3' in star_text:
                                    stars = 3
                                elif 'two' in star_text or '2' in star_text:
                                    stars = 2
                                elif 'one' in star_text or '1' in star_text:
                                    stars = 1
                                else:
                                    star_match = re.search(r'(\d+)', star_text)
                                    if star_match:
                                        stars = int(star_match.group(1))
                        except (ValueError, AttributeError):
                            # If parsing fails, leave stars as None
                            pass
                    
                    # Extract author
                    author_elem = (
                        card.find('span', class_=re.compile(r'author|consumer|name', re.I)) or
                        card.select_one('[data-consumer-name-typography]') or
                        card.find('div', class_=re.compile(r'author|consumer', re.I))
                    )
                    author = author_elem.get_text(strip=True) if author_elem else ""
                    
                    # Extract date
                    date_elem = (
                        card.find('time') or
                        card.find('span', class_=re.compile(r'date|time', re.I))
                    )
                    date = ""
                    if date_elem:
                        date = date_elem.get('datetime', '') or date_elem.get_text(strip=True)
                        # If date is in ISO format, extract date part only
                        if "T" in date:
                            date = date.split("T")[0]
                    
                    # Validate and deduplicate review
                    if not is_valid_review(content, author, date):
                        continue
                    
                    # Create content hash for deduplication
                    content_hash = hash((content[:100], author, date))  # Use first 100 chars + author + date
                    if content_hash in seen_content_hashes:
                        continue
                    
                    # Create source URL for this review
                    review_id = (
                        card.get('data-review-id') or 
                        card.get('data-consumer-review-id') or
                        None
                    )
                    if review_id:
                        source_url = f"https://www.trustpilot.com/reviews/{review_id}"
                    else:
                        source_url = url  # Fallback to page URL
                    
                    formatted_review = format_review(title, content, stars, author, date, source_url)
                    all_reviews.append(formatted_review)
                    
                    # Track seen items
                    if review_id:
                        seen_ids.add(review_id)
                    seen_content_hashes.add(content_hash)
                    page_reviews += 1
                
                except Exception as e:
                    print(f"   ⚠️  Skipped one review, error: {e}")
                    continue
            
            print(f"   ✅ Extracted {page_reviews} new reviews from this page, total: {len(all_reviews)} unique reviews\n")
            
            # If single_page_only is True, stop after first page
            if single_page_only:
                print(f"   ℹ️  Single page mode: stopping after page 1")
                break
            
            # If we found review cards but extracted 0, it means all were duplicates or invalid
            # If we found 0 review cards, we've reached the end
            if len(review_cards) == 0:
                print("   ⚠️  No review cards found on this page, reached the end")
                break
            
            if page_reviews == 0:
                consecutive_empty_pages += 1
                if consecutive_empty_pages >= 2:
                    print("   ⚠️  No new reviews found for 2 consecutive pages, stopping")
                    break
            else:
                consecutive_empty_pages = 0
            
            page += 1
            time.sleep(2)  # Polite delay to avoid rate limiting
            
        except Exception as e:
            print(f"❌ Request exception: {e}")
            break
    
    return all_reviews

if __name__ == "__main__":
    # Set single_page_only=True to only scrape the first page
    # Set single_page_only=False to scrape all pages (default, needed for all 215 reviews)
    reviews = scrape_trustpilot_reviews(single_page_only=False)
    
    # Remove duplicates one more time (safety check)
    unique_reviews = []
    seen = set()
    for review in reviews:
        # Create a unique key from content and author
        key = (review.get("content", "")[:100], review.get("author", ""), review.get("date", ""))
        if key not in seen:
            seen.add(key)
            unique_reviews.append(review)
    
    print(f"\n📊 Statistics:")
    print(f"   Total scraped: {len(reviews)}")
    print(f"   Unique reviews: {len(unique_reviews)}")
    
    # Save to JSON file in standard format
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(unique_reviews, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Done! Saved {len(unique_reviews)} unique reviews to {OUTPUT_FILE}")
    print(f"📄 Format: [{{'title': '...', 'content': '...', 'stars': 'X out of 5 stars', 'author': '...', 'date': 'YYYY-MM-DD'}}, ...]")
