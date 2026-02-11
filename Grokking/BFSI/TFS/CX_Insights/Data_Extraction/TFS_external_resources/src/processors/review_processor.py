import json
import time
import os
from llm import classify_review_with_gpt, client

INPUT_FILE = "toyota_trustpilot_reviews.json"
OUTPUT_FILE = "toyota_trustpilot_reviews_with_llm.json"  # New file with classifications

def process_reviews():
    """Process reviews and add topic, subtopics, and entities using LLM"""
    
    print(f"🚀 Starting to process reviews...\n")
    
    # Check if API key is available
    if not client:
        print(f"❌ Error: OPENAI_API_KEY not found in environment variables!")
        print(f"\n📝 Solutions:")
        print(f"  1. Set environment variable directly:")
        print(f"     export OPENAI_API_KEY=your_api_key_here")
        print(f"     python3 process_reviews.py")
        print(f"\n  2. Add to your shell profile (~/.zshrc or ~/.bash_profile):")
        print(f"     echo 'export OPENAI_API_KEY=your_api_key_here' >> ~/.zshrc")
        print(f"     source ~/.zshrc")
        print(f"\n  3. Create .env file manually:")
        print(f"     echo 'OPENAI_API_KEY=your_api_key_here' > .env")
        print(f"\n  4. If .env file is disabled (macOS privacy protection):")
        print(f"     - Go to System Preferences > Security & Privacy > Privacy > Files and Folders")
        print(f"     - Allow your terminal/IDE to access the folder")
        print(f"     - Or use environment variable method instead (recommended)")
        print(f"\n  5. Get your API key from: https://platform.openai.com/api-keys")
        return
    
    print(f"📖 Reading reviews from: {INPUT_FILE}")
    
    # Read reviews from input file
    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            reviews = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: File {INPUT_FILE} not found!")
        return
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in {INPUT_FILE}: {e}")
        return
    
    print(f"✅ Loaded {len(reviews)} reviews from input file")
    
    # Try to load existing output file to resume progress
    existing_reviews = []
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                existing_reviews = json.load(f)
            print(f"📂 Found existing output file with {len(existing_reviews)} reviews")
            
            # Merge progress: use existing classifications if available
            if len(existing_reviews) == len(reviews):
                print(f"   Merging existing classifications with input data...")
                for i, (existing, current) in enumerate(zip(existing_reviews, reviews)):
                    if 'topic' in existing and existing.get('topic'):
                        # Copy classification from existing file
                        current['topic'] = existing.get('topic', '')
                        current['subtopics'] = existing.get('subtopics', [])
                        current['entities'] = existing.get('entities', [])
        except Exception as e:
            print(f"   ⚠️  Could not load existing file: {e}, starting fresh")
    
    print()
    
    # Process each review
    processed_count = 0
    skipped_count = 0
    error_count = 0
    
    for i, review in enumerate(reviews, 1):
        # Skip if already processed (has topic field)
        if 'topic' in review and review.get('topic'):
            print(f"[{i}/{len(reviews)}] ⏭️  Skipping review (already processed)")
            skipped_count += 1
            continue
        
        # Get review content (combine title and content)
        title = review.get('title', '').strip()
        content = review.get('content', '').strip()
        
        if not content:
            print(f"[{i}/{len(reviews)}] ⚠️  Skipping review (no content)")
            skipped_count += 1
            continue
        
        # Combine title and content for classification
        review_text = f"{title}\n{content}".strip() if title else content
        
        print(f"[{i}/{len(reviews)}] 🔍 Processing review...")
        print(f"   Content preview: {content[:100]}...")
        
        try:
            # Classify review using LLM
            classification = classify_review_with_gpt(review_text)
            
            # Handle different response formats
            if isinstance(classification, dict):
                # If LLM returned a dict directly, use it
                review['topic'] = classification.get('topic', '')
                review['subtopics'] = classification.get('subtopics', [])
                review['entities'] = classification.get('entities', [])
            elif isinstance(classification, str):
                # If LLM returned a string, try to parse it as JSON
                try:
                    parsed = json.loads(classification)
                    review['topic'] = parsed.get('topic', '')
                    review['subtopics'] = parsed.get('subtopics', [])
                    review['entities'] = parsed.get('entities', [])
                except json.JSONDecodeError:
                    # If parsing fails, store the raw response in topic
                    print(f"   ⚠️  Warning: LLM response is not valid JSON, storing as topic")
                    review['topic'] = classification
                    review['subtopics'] = []
                    review['entities'] = []
            else:
                print(f"   ⚠️  Warning: Unexpected response type, storing as topic")
                review['topic'] = str(classification)
                review['subtopics'] = []
                review['entities'] = []
            
            print(f"   ✅ Topic: {review.get('topic', 'N/A')}")
            print(f"   ✅ Subtopics: {review.get('subtopics', [])}")
            print(f"   ✅ Entities: {review.get('entities', [])}")
            
            processed_count += 1
            
        except Exception as e:
            print(f"   ❌ Error processing review: {e}")
            error_count += 1
            # Add empty fields on error
            review['topic'] = ''
            review['subtopics'] = []
            review['entities'] = []
        
        # Save progress every 10 reviews (in case of interruption)
        if i % 10 == 0 or i == len(reviews):
            try:
                with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                    json.dump(reviews, f, ensure_ascii=False, indent=2)
                if i % 10 == 0:
                    print(f"\n💾 Progress saved ({i}/{len(reviews)} processed)\n")
            except Exception as e:
                print(f"   ⚠️  Warning: Could not save progress: {e}")
        
        # Rate limiting: wait between API calls to avoid rate limits
        # Adjust delay based on your API rate limits
        time.sleep(0.5)  # 500ms delay between requests
    
    # Save final results
    print(f"\n💾 Saving final results...")
    try:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(reviews, f, ensure_ascii=False, indent=2)
        print(f"✅ Results saved to: {OUTPUT_FILE}")
    except Exception as e:
        print(f"❌ Error saving results: {e}")
        return
    
    # Print summary
    print(f"\n📊 Summary:")
    print(f"   Total reviews: {len(reviews)}")
    print(f"   Processed: {processed_count}")
    print(f"   Skipped: {skipped_count}")
    print(f"   Errors: {error_count}")
    print(f"\n✅ Done!")

if __name__ == "__main__":
    try:
        process_reviews()
    except KeyboardInterrupt:
        print(f"\n\n⚠️  Process interrupted by user")
        print(f"💾 Progress has been saved. You can resume by running the script again.")
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        raise

