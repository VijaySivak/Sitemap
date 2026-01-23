"""Google Play Store review scraper"""
from google_play_scraper import reviews_all, Sort
from datetime import datetime, timedelta
import json
from pathlib import Path
from typing import List, Dict

# Get project root directory (assuming script is in src/scrapers/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "raw"

# App ID (Toyota Financial Services)
APP_ID = "com.tmcc.click2pay.mytfs"

def scrape_google_play_reviews(app_id: str = None, lang: str = "en", country: str = "us", 
                               sort_by: Sort = Sort.NEWEST, limit_years: int = None) -> List[Dict]:
    """
    Scrape reviews from Google Play Store
    
    Args:
        app_id: Google Play app ID
        lang: Language code (default: "en")
        country: Country code (default: "us")
        sort_by: Sort order (default: Sort.NEWEST)
        limit_years: Limit to reviews from last N years (default: None for all)
    
    Returns:
        List of review dictionaries
    """
    if app_id is None:
        app_id = APP_ID
    
    print(f"📥 Fetching reviews from Google Play for app: {app_id}...")
    
    try:
        # Get all reviews
        all_reviews = reviews_all(
            app_id,
            lang=lang,
            country=country,
            sort=sort_by
        )
        
        print(f"   ✅ Fetched {len(all_reviews)} total reviews")
        
        # Filter by date if specified
        filtered = []
        if limit_years:
            cutoff_date = datetime.now() - timedelta(days=365 * limit_years)
            print(f"   📅 Filtering reviews from last {limit_years} year(s)...")
        else:
            cutoff_date = None
        
        for r in all_reviews:
            # Apply date filter if specified
            if cutoff_date and r.get("at"):
                if r["at"] < cutoff_date:
                    continue
            
            review_data = {
                "review_id": r.get("reviewId", ""),
                "title": "",  # Google Play reviews don't have titles
                "content": r.get("content", "").strip(),
                "stars": f"{r.get('score', 0)} out of 5 stars" if r.get("score") else "N/A out of 5 stars",
                "author": r.get("userName", "").strip(),
                "date": r["at"].strftime("%Y-%m-%d") if r.get("at") else "",
                "resource": "Google Play",
                "source": f"https://play.google.com/store/apps/details?id={app_id}",
                # LLM-processed fields (will be empty initially)
                "topic": "",
                "subtopic": "",
                "sentiment": "",
                "action_suggested": "",
                # Response fields
                "is_follow_up": False,
                "follow_up_type": "",
                "is_company_response": False,
                "mentions_company_response": bool(r.get("replyContent")),
            }
            
            # Add company reply if present
            if r.get("replyContent"):
                review_data["company_reply_content"] = r.get("replyContent", "").strip()
                review_data["company_reply_date"] = r.get("repliedAt").strftime("%Y-%m-%d") if r.get("repliedAt") else ""
            else:
                review_data["company_reply_content"] = ""
                review_data["company_reply_date"] = ""
            
            filtered.append(review_data)
        
        if limit_years:
            print(f"   ✅ Filtered to {len(filtered)} reviews from last {limit_years} year(s)")
        
        return filtered
        
    except Exception as e:
        print(f"❌ Error fetching reviews: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    # Scrape Google Play reviews
    # Limit to last 2 years (optional - set to None for all reviews)
    reviews = scrape_google_play_reviews(
        app_id=APP_ID,
        lang="en",
        country="us",
        sort_by=Sort.NEWEST,
        limit_years=2  # Set to None to get all reviews
    )
    
    if reviews:
        print(f"\n📊 Statistics:")
        print(f"   Total reviews: {len(reviews)}")
        
        # Count reviews with company replies
        with_replies = sum(1 for r in reviews if r.get("company_reply_content"))
        print(f"   Reviews with company replies: {with_replies}")
        
        # Save to data/raw directory
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        output_file = OUTPUT_DIR / "google_play_toyota_reviews.json"
        
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(reviews, f, ensure_ascii=False, indent=2)
        
        print(f"\n✅ Done! Saved {len(reviews)} reviews to {output_file}")
        print(f"📄 Format: flat list with all review fields")
    else:
        print("\n❌ No reviews were scraped. Please check the app ID and try again.")
