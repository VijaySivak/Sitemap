"""
Test script to validate reviews_all.json for missing data, ratings, and sources
"""
import json
from pathlib import Path
from typing import Dict, List, Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
REVIEWS_FILE = PROJECT_ROOT / "data" / "processed" / "reviews_all.json"

def test_reviews_all():
    """Test reviews_all.json for data completeness"""
    print("=" * 70)
    print("TESTING reviews_all.json")
    print("=" * 70)
    
    # Load the file
    try:
        with open(REVIEWS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"[ERROR] File not found: {REVIEWS_FILE}")
        return False
    except json.JSONDecodeError as e:
        print(f"[ERROR] Invalid JSON: {e}")
        return False
    
    all_passed = True
    
    # Test 1: Schema version
    print("\n[TEST 1] Schema Version")
    print("-" * 70)
    if data.get('schema_version') == '2.0':
        print("  [PASS] schema_version is 2.0")
    else:
        print(f"  [FAIL] schema_version is {data.get('schema_version')}, expected 2.0")
        all_passed = False
    
    # Test 2: Sources
    print("\n[TEST 2] Sources")
    print("-" * 70)
    sources = data.get('sources', [])
    if not sources:
        print("  [FAIL] No sources found")
        all_passed = False
    else:
        print(f"  [PASS] Found {len(sources)} sources:")
        expected_sources = ['BBB', 'GP', 'AS', 'CA', 'CK', 'WH', 'TP']
        found_sources = [s.get('source') for s in sources]
        
        for source_code in expected_sources:
            if source_code in found_sources:
                source_info = next(s for s in sources if s.get('source') == source_code)
                print(f"    [OK] {source_code}: {source_info.get('source_name')}")
            else:
                print(f"    [MISSING] {source_code}: MISSING")
                all_passed = False
        
        # Check for unexpected sources
        unexpected = [s for s in found_sources if s not in expected_sources]
        if unexpected:
            print(f"  [WARNING] Unexpected sources found: {unexpected}")
    
    # Test 3: Reviews array
    print("\n[TEST 3] Reviews Array")
    print("-" * 70)
    reviews = data.get('reviews', [])
    if not reviews:
        print("  [FAIL] No reviews found")
        all_passed = False
    else:
        print(f"  [PASS] Found {len(reviews)} reviews")
        expected_count = data.get('total_review_count', 0)
        if len(reviews) == expected_count:
            print(f"  [PASS] Review count matches total_review_count: {len(reviews)}")
        else:
            print(f"  [FAIL] Review count mismatch: {len(reviews)} vs {expected_count}")
            all_passed = False
    
    # Test 4: Missing ratings
    print("\n[TEST 4] Missing Ratings")
    print("-" * 70)
    missing_ratings = []
    ratings_distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    invalid_ratings = []
    valid_ratings = []
    
    for i, review in enumerate(reviews):
        review_id = review.get('review_id', f'review_{i}')
        rating = review.get('rating')
        
        if rating is None:
            missing_ratings.append(review_id)
        elif not isinstance(rating, (int, float)):
            invalid_ratings.append((review_id, rating))
        elif rating < 1 or rating > 5:
            invalid_ratings.append((review_id, rating))
        else:
            valid_ratings.append(rating)
            ratings_distribution[int(rating)] += 1
    
    if missing_ratings:
        coverage = (len(valid_ratings) / len(reviews) * 100) if reviews else 0
        print(f"  [WARNING] {len(missing_ratings)} reviews missing ratings (schema allows null)")
        print(f"    First 10 missing: {missing_ratings[:10]}")
        print(f"    Coverage: {len(valid_ratings)}/{len(reviews)} ({coverage:.1f}%) have ratings")
    else:
        print("  [PASS] All reviews have ratings")
    
    if invalid_ratings:
        print(f"  [FAIL] {len(invalid_ratings)} reviews have invalid ratings")
        print(f"    Examples: {invalid_ratings[:5]}")
        all_passed = False
    
    print(f"  Rating distribution:")
    for rating in range(1, 6):
        count = ratings_distribution[rating]
        pct = (count / len(reviews) * 100) if reviews else 0
        print(f"    {rating} star: {count} ({pct:.1f}%)")
    
    # Test 5: Missing required fields
    print("\n[TEST 5] Missing Required Fields")
    print("-" * 70)
    required_fields = ['review_id']
    missing_fields = {field: [] for field in required_fields}
    
    for i, review in enumerate(reviews):
        for field in required_fields:
            if field not in review or review[field] is None or review[field] == "":
                review_id = review.get('review_id', f'review_{i}')
                missing_fields[field].append(review_id)
    
    for field, missing_list in missing_fields.items():
        if missing_list:
            print(f"  [FAIL] {len(missing_list)} reviews missing '{field}'")
            print(f"    First 10: {missing_list[:10]}")
            all_passed = False
        else:
            print(f"  [PASS] All reviews have '{field}'")
    
    # Test 6: Missing source data in metadata
    print("\n[TEST 6] Source Data in Metadata")
    print("-" * 70)
    missing_source_data = []
    source_counts = {}
    
    for i, review in enumerate(reviews):
        review_id = review.get('review_id', f'review_{i}')
        metadata = review.get('metadata', {})
        source_data = metadata.get('source_data', {})
        
        if not source_data:
            missing_source_data.append(review_id)
        else:
            # Count sources
            for source_key in source_data.keys():
                source_counts[source_key] = source_counts.get(source_key, 0) + 1
    
    if missing_source_data:
        print(f"  [WARNING] {len(missing_source_data)} reviews missing source_data in metadata")
        print(f"    First 10: {missing_source_data[:10]}")
        print(f"    Note: Reviews from SUYASH file may not have source_data if already in v2.0 format")
        # This is a warning, not a failure, as some reviews might not need source_data
    
    print(f"  Source data distribution:")
    for source, count in sorted(source_counts.items()):
        print(f"    {source}: {count}")
    
    # Test 7: Overall brand rating
    print("\n[TEST 7] Overall Brand Rating")
    print("-" * 70)
    overall_rating = data.get('overall_brand_rating')
    if overall_rating is None:
        print("  [WARNING] overall_brand_rating is null")
    else:
        print(f"  [PASS] overall_brand_rating: {overall_rating}")
        # Verify it matches calculated average
        ratings = [r.get('rating') for r in reviews if r.get('rating') is not None]
        if ratings:
            calculated_avg = sum(ratings) / len(ratings)
            if abs(overall_rating - calculated_avg) < 0.01:
                print(f"  [PASS] Matches calculated average: {calculated_avg:.2f}")
            else:
                print(f"  [WARNING] Does not match calculated average: {calculated_avg:.2f}")
    
    # Test 8: Extraction meta
    print("\n[TEST 8] Extraction Metadata")
    print("-" * 70)
    extraction_meta = data.get('extraction_meta', {})
    required_meta_fields = ['extracted_at', 'extractor_version', 'raw_source_preserved']
    
    for field in required_meta_fields:
        if field in extraction_meta:
            print(f"  [PASS] {field}: {extraction_meta[field]}")
        else:
            print(f"  [FAIL] Missing {field}")
            all_passed = False
    
    # Test 9: Data quality - empty/null fields
    print("\n[TEST 9] Data Quality - Empty/Null Fields")
    print("-" * 70)
    empty_review_text = []
    empty_author = []
    empty_date = []
    
    for i, review in enumerate(reviews):
        review_id = review.get('review_id', f'review_{i}')
        
        if not review.get('review_text') or review.get('review_text', '').strip() == '':
            empty_review_text.append(review_id)
        
        if not review.get('author') or review.get('author', '').strip() == '':
            empty_author.append(review_id)
        
        if not review.get('review_date') or review.get('review_date', '').strip() == '':
            empty_date.append(review_id)
    
    print(f"  Reviews with empty review_text: {len(empty_review_text)}")
    if empty_review_text:
        print(f"    First 5: {empty_review_text[:5]}")
    
    print(f"  Reviews with empty author: {len(empty_author)}")
    if empty_author:
        print(f"    First 5: {empty_author[:5]}")
    
    print(f"  Reviews with empty review_date: {len(empty_date)}")
    if empty_date:
        print(f"    First 5: {empty_date[:5]}")
    
    # Test 10: Duplicate review IDs
    print("\n[TEST 10] Duplicate Review IDs")
    print("-" * 70)
    review_ids = [r.get('review_id') for r in reviews if r.get('review_id')]
    unique_ids = set(review_ids)
    
    if len(review_ids) == len(unique_ids):
        print(f"  [PASS] All {len(review_ids)} review IDs are unique")
    else:
        duplicates = len(review_ids) - len(unique_ids)
        print(f"  [FAIL] Found {duplicates} duplicate review IDs")
        # Find actual duplicates
        from collections import Counter
        id_counts = Counter(review_ids)
        dup_ids = [rid for rid, count in id_counts.items() if count > 1]
        print(f"    Duplicate IDs (first 10): {dup_ids[:10]}")
        all_passed = False
    
    # Summary
    print("\n" + "=" * 70)
    print("TEST SUMMARY")
    print("=" * 70)
    
    # Calculate statistics
    reviews_with_ratings = len([r for r in reviews if r.get('rating') is not None])
    rating_coverage = (reviews_with_ratings / len(reviews) * 100) if reviews else 0
    
    # Critical tests: schema, sources, review count, required fields, duplicates
    critical_passed = (
        data.get('schema_version') == '2.0' and
        len(sources) > 0 and
        len(reviews) > 0 and
        len(reviews) == data.get('total_review_count', 0) and
        len(review_ids) == len(unique_ids)
    )
    
    if critical_passed:
        print("[PASS] All critical tests passed!")
        print(f"\nData Quality Metrics:")
        print(f"  Total reviews: {len(reviews)}")
        print(f"  Reviews with ratings: {reviews_with_ratings} ({rating_coverage:.1f}%)")
        print(f"  Sources: {len(sources)}")
        print(f"  Unique review IDs: {len(unique_ids)}")
        if missing_ratings:
            print(f"  [NOTE] {len(missing_ratings)} reviews without ratings (allowed by schema)")
        if missing_source_data:
            print(f"  [NOTE] {len(missing_source_data)} reviews without source_data (may be expected)")
    else:
        print("[FAIL] Some critical tests failed. Please review the output above.")
        print(f"\nTotal reviews: {len(reviews)}")
        print(f"Reviews with ratings: {reviews_with_ratings}")
        print(f"Sources: {len(sources)}")
    
    print("=" * 70)
    
    return critical_passed

if __name__ == "__main__":
    test_reviews_all()

