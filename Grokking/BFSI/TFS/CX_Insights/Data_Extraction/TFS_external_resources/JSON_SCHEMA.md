# Review JSON Schema v2.0

This document defines the optimized unified JSON structure for review data. The schema
prioritizes canonical fields, minimizes null pollution, and namespaces source-specific data.

## Top-Level Object

- `schema_version` (string): Schema version, always `2.0`.
- `source` (string or null): Source code for single-source files (e.g., `CA`, `WH`, `CK`, `AS`, `GP`).
- `source_name` (string or null): Human-readable source name.
- `title` (string or null): Dataset title.
- `overall_brand_rating` (number or null): Source-level rating.
- `total_review_count` (number or null): Source-level total review count.
- `company_info` (object or null): Normalized company metadata (snake_case keys).
- `page_metadata` (object or null): Consolidated page-level metadata:
  - `statistics` (object or null)
  - `review_page_attributes` (object or null)
  - `helpful_reviews` (object or null)
- `metadata` (object or null): Dataset-level metadata with `source_data` namespace (see below).
- `extraction_meta` (object): Extraction provenance:
  - `extracted_at` (string, ISO 8601)
  - `extractor_version` (string)
  - `raw_source_preserved` (boolean)
- `sources` (array or null): For combined outputs, list of source descriptors:
  - `source` (string)
  - `source_name` (string)
  - `title` (string or null)
- `reviews` (array): List of review objects.

## Review Object (Canonical Fields)

Only canonical, cross-source fields live at the top of each review. Fields with no value
are omitted to minimize size.

- `review_id` (string): Unique review ID within its source.
- `author` (string or null): Display name.
- `location` (string or null): Location text if present.
- `review_date` (string or null): Raw date or timestamp.
- `rating` (number or null): Numeric rating, 1–5.
- `review_title` (string or null): Review title.
- `review_text` (string or null): Review body.
- `review_url` (string or null): Review URL.
- `tags` (array of strings): Categories/tags.
- `votes` (object or null): Vote metrics:
  - `helpful` (number or null): Generic helpful count.
  - `up` (number or null): Upvotes.
  - `down` (number or null): Downvotes.
  - `sum` (number or null): App Store vote sum.
  - `count` (number or null): App Store vote count.
- `interactions` (object or null): Comment-related data:
  - `comments_count` (number or null)
  - `comments` (array of Comment objects)
  - `reactions` (object or null): Reserved for emoji reactions.
  - `shares` (object or null): Reserved for share counts.
- `metadata` (object or null): Review-level metadata with `source_data` namespace.

## Comment Object

- `comment_id` (string or null)
- `author` (string or null)
- `comment_date` (string or null)
- `comment_text` (string or null)
- `upvotes` (number or null)
- `downvotes` (number or null)
- `reply_to` (string or null)
- `replies` (array of Comment objects)

## Source-Specific Data (`metadata.source_data`)

All source-specific fields live under a namespaced object to avoid collisions.

Example:
```json
{
  "metadata": {
    "source_data": {
      "app_store": {
        "app_version": "11.5",
        "locale": "us",
        "content_type": "Application",
        "sort_modes": ["mostrecent"]
      }
    }
  }
}
```

Known namespaces:
- `consumer_affairs`
- `wallethub`
- `credit_karma`
- `app_store`
- `google_play`
- `other` (fallback)

## Normalization Rules

- Omit null, empty objects, and empty lists to reduce payload size.
- `nickname` folds into `author` when `author` is missing.
- `rating` is normalized to a numeric 1–5 value; string ratings like `5 out of 5 stars` are parsed.
- Google Play `title`, `content`, `stars`, `date`, `resource`, `source` are mapped to canonical fields and not preserved separately.
- All non-canonical fields are preserved under `metadata.source_data.<namespace>` to avoid data loss.
- `page_metadata` consolidates `statistics`, `review_page_attributes`, and `helpful_reviews`.
- `company_info` keys are normalized to `snake_case`.

## Mapping (v1 → v2)

Canonical fields:
- `review_title` ← `review_title` or Google Play `title`
- `review_text` ← `review_text` or Google Play `content`
- `rating` ← `rating` or Google Play `stars`
- `review_date` ← `review_date` or Google Play `date`
- `review_url` ← `review_url` or Google Play `source`
- `author` ← `author` or `nickname`
- `votes.helpful` ← `helpful_count`
- `votes.up` ← `upvotes`
- `votes.down` ← `downvotes`
- `votes.sum` ← `vote_sum`
- `votes.count` ← `vote_count`
- `interactions.comments_count` ← `comments_count`
- `interactions.comments` ← `comments`

Source-specific fields move to `metadata.source_data`:
- App Store: `author_uri`, `app_version`, `content_type`, `locale`, `sort_modes`, `metadata`
- Credit Karma: `badges`, `flags`
- ConsumerAffairs: `review_alias`, `media`
- WalletHub: `product`, `verified`, `nickname`
- Google Play: `topic`, `subtopic`, `sentiment`, `action_suggested`,
  `is_follow_up`, `follow_up_type`, `is_company_response`, `mentions_company_response`,
  `company_reply_content`, `company_reply_date`

Removed:
- Per-review `review_source` and `review_source_name` (replaced by top-level `source` and `sources` array).
- Duplicate Google Play fields (`title`, `content`, `stars`, `date`, `resource`, `source`).
