# Scraper

Organized review scraping and extraction by source.

## Layout
- `sources/consumer_affairs/raw/` ConsumerAffairs HTML downloads.
- `sources/wallethub/raw/` WalletHub HTML downloads.
- `sources/credit_karma/raw/` Credit Karma HTML/API captures.
- `sources/app_store/raw/` Apple App Store API captures.
- `scripts/` Downloaders and shared extractor.
- `extracted/ca/` Extracted JSON for ConsumerAffairs.
- `extracted/wh/` Extracted JSON for WalletHub.
- `extracted/ck/` Extracted JSON for Credit Karma.
- `templates/` HTML report template.

## Source Codes
- `CA` = ConsumerAffairs
- `WH` = WalletHub
- `CK` = Credit Karma
- `AS` = Apple App Store

## ConsumerAffairs Download

```bash
python .\scripts\download_consumer_affairs.py --download-all --max-pages 50 --delay 1.0
```

Optional flags:

```bash
python .\scripts\download_consumer_affairs.py --no-open
python .\scripts\download_consumer_affairs.py --browser "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

## WalletHub Download

```bash
python .\scripts\download_wallethub.py
```

## Credit Karma Download

```bash
python .\scripts\download_creditkarma.py
```

## Review Extraction

Create a virtual environment before installing parsing libraries:

```bash
python -m venv .venv
.\\.venv\\Scripts\\activate
pip install -r requirements.txt
python -m playwright install chromium
```

Extract reviews to a single JSON per source:

```bash
python .\scripts\extract_reviews.py --source CA
python .\scripts\extract_reviews.py --source WH
python .\scripts\extract_reviews.py --source CK
```

Default outputs:
- `extracted/ca/reviews_ca.json`
- `extracted/wh/reviews_wh.json`
- `extracted/ck/reviews_ck.json`
- `extracted/as/reviews_as.json`

## Apple App Store Reviews

Fetch App Store reviews directly:

```bash
python .\scripts\extract_reviews.py --source AS --app-id 472110881 --storefront us
```

## Unified Review JSON Schema

Schema version: `2.0`. The new schema removes duplicate Google Play fields, consolidates
votes into a single object, namespaces source-specific data, and omits null/empty fields
inside reviews to reduce payload size.

Template schema file:
- `templates/review_schema.json`
- Detailed schema reference:
  - `JSON_SCHEMA.md`

Migration (v1 → v2):

```bash
python .\scripts\migrate_to_v2.py --input extracted --output extracted_v2
```

Normalize existing extracted JSON files in place:

```bash
python .\scripts\normalize_extracted.py --input extracted
```

Combine normalized JSON files into one:

```bash
python .\scripts\combine_reviews.py --input extracted --output combined\\reviews_all.json
```

Exclude Google Play (default) or other paths:

```bash
python .\scripts\combine_reviews.py --exclude external\\json\\google_play_toyota_reviews.json
```

## Automated Tag Generation

This project can generate standardized tags using LM Studio (local LLM API).

Configuration:
- `config/lm_studio_config.json` (endpoint, model, retries, rate limit)
- `config/tag_taxonomy.json` (tag taxonomy)
- `scripts/prompts/tagging_prompt.txt` (prompt template)

Available tags:
Payment Processing, Customer Service, Account Management, Billing & Charges, Payoff Process,
Loan Terms, Mobile App, Collections & Repo, Credit Reporting, Documentation, Deferrals & Hardship,
Transparency, Positive Experience, Negative Experience, Frustration, Satisfied, Needs Resolution,
Legal Concern, Recommendation Against, Would Recommend, App Bug, Website Issue, System Error

Tag a single file:

```bash
python .\scripts\tag_reviews.py --input extracted\\ca\\reviews_ca.json --output tagged\\reviews_ca.json
```

Generate tags during extraction:

```bash
python .\scripts\extract_reviews.py --source CA --auto-tag
```

Generate tags during normalization:

```bash
python .\scripts\normalize_extracted.py --input extracted --generate-tags
```

Generate tags when combining:

```bash
python .\scripts\combine_reviews.py --input extracted_v2 --tag-on-combine
```

## HTML Report

Open the report template with a JSON file path:

```bash
start "" "templates\\reviews_report.html?file=../extracted/ca/reviews_ca.json"
start "" "templates\\reviews_report.html?file=../extracted/wh/reviews_wh.json"
```

## Credit Karma API Capture

Capture the review API calls (Playwright):

```bash
python .\scripts\capture_creditkarma_api.py
```

Outputs:
- `sources/credit_karma/raw/ck_requests.json`
- `sources/credit_karma/raw/ck_graphql.json` (if GraphQL response captured)
- `sources/credit_karma/raw/ck_graphql_calls.json` (all captured GraphQL responses)

Capture with comment clicks:

```bash
python .\scripts\capture_creditkarma_api.py --capture-comments --headful
```
## Outputs
- Raw HTML is stored under `sources/` by source.
- Extracted JSON is stored under `extracted/` by source.

## Change Log
- 2025-09-18: Added LM Studio tagging pipeline, taxonomy config, prompt template, and tag CLI.
- 2025-09-18: Added schema v2 normalization, migration script, and updated combine logic to use the new structure.
- 2025-09-18: Replaced the schema template and documentation with v2 (canonical fields, votes object, interactions, source_data).
- 2025-09-18: Added exclude support to the combine script (Google Play excluded by default).
- 2025-09-18: Added a combined-review builder script to merge normalized JSON files.
- 2025-09-18: Added `JSON_SCHEMA.md` with field meanings and types for the unified review JSON.
- 2025-09-18: Expanded the schema documentation with field meanings/types and noted nested comment handling.
- 2025-09-18: Added Google Play review fields to the unified schema and mapped them into canonical fields during normalization.
- 2025-09-18: Added per-review source fields and folded nickname/helpful_count during normalization; added schema template JSON.
- 2025-09-18: Added unified review JSON schema normalization plus a normalization script.
- 2025-09-18: Added `open_page.py` for automatic fetch + browser open; added `AGENTS.md` with rules.
- 2025-09-18: Added optional browser path and paginated download support.
- 2025-09-18: Added browser auto-detect, no-open option, and improved fetch headers for 403s.
- 2025-09-18: Added cookie-aware opener, warm-up request, and defaulted to www subdomain.
- 2025-09-18: Added detailed fetch/download logging.
- 2025-09-18: Added review extraction script, HTML report template, and requirements.
- 2025-09-18: Added WalletHub single-page HTML downloader.
- 2025-09-18: Restructured folders by source and added shared extractor with source codes.
- 2025-09-18: Added Credit Karma downloader and source code entry.
- 2025-09-18: Added Playwright-based Credit Karma API capture and pinned Playwright dependency.
- 2025-09-18: Added Credit Karma API-backed extraction with pagination support.
- 2025-09-18: Added Credit Karma request header pass-through for API extraction reliability.
- 2025-09-18: Added Credit Karma extraction logs for request/response progress.
- 2025-09-18: Added Credit Karma comment capture support and duplicate-page stop logic.
- 2025-09-18: Added cursor-based pagination fallback for Credit Karma reviews.
- 2025-09-18: Adjusted Credit Karma pagination loop to retry offsets/cursors before stopping.
- 2025-09-18: Added Apple App Store review ingestion with dual sort modes and unified output.
