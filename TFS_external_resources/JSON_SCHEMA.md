# Review JSON Schema

This document defines the unified JSON structure for extracted reviews, including field
types and meaning. All fields listed are always present; missing data is `null` or empty
collections as noted.

## Top-Level Object

- `source` (string): Source code for the file (e.g., `CA`, `WH`, `CK`, `AS`).
- `source_name` (string): Human-readable source name.
- `title` (string): Title for this dataset.
- `overall_brand_rating` (number or null): Source-level rating for the brand.
- `total_review_count` (number or null): Source-level total review count.
- `company_info` (object): Source-level company metadata (string keys/values).
- `statistics` (object): Source-specific rating stats (often CK only).
- `review_page_attributes` (object): Source-specific page attributes (often CK only).
- `helpful_reviews` (object): Source-specific helpful review payloads (often CK only).
- `metadata` (object): Source-specific metadata (e.g., App Store feed data).
- `reviews` (array of objects): Review entries.

## Review Object

- `review_id` (string): Unique ID within the source.
- `author` (string): Reviewer display name; if missing, `nickname` is folded here.
- `location` (string or null): Reviewer location string.
- `review_date` (string or null): Raw timestamp or date string.
- `rating` (number or null): Numeric rating out of 5.
- `tags` (array of strings): Review tags/categories.
- `review_text` (string or null): Review body text.
- `review_alias` (string or null): Source-specific alias (e.g., CA).
- `media` (array of objects): Each item may include `src`, `thumbnail`, `title`.
- `product` (string or null): Product label, if provided by source.
- `verified` (boolean or null): Verification status.
- `upvotes` (number or null): Upvote count.
- `downvotes` (number or null): Downvote count.
- `review_title` (string or null): Review title.
- `author_uri` (string or null): Reviewer profile URL.
- `review_url` (string or null): Review URL.
- `app_version` (string or null): App version string (App Store).
- `vote_sum` (number or null): Source-specific vote score (App Store).
- `vote_count` (number or null): Total votes (App Store).
- `content_type` (string or null): Content type (App Store).
- `locale` (string or null): Locale or storefront (App Store).
- `sort_modes` (array of strings): Sort modes used (App Store).
- `metadata` (object): Source-specific review metadata.
- `comments_count` (number or null): Number of comments.
- `comments` (array of objects): Comment entries (see Comment Object).
- `badges` (array): Source-specific badges.
- `flags` (array/object/null): Source-specific flags.
- `review_source` (string or null): Per-review source code (copied from top-level).
- `review_source_name` (string or null): Per-review source name (copied from top-level).

Google Play raw fields (preserved):
- `title` (string or null): Raw title.
- `content` (string or null): Raw content.
- `stars` (string or null): Raw rating string (e.g., `5 out of 5 stars`).
- `date` (string or null): Raw date.
- `resource` (string or null): Raw source name (e.g., `Google Play`).
- `source` (string or null): Raw source URL.
- `topic` (string or null)
- `subtopic` (string or null)
- `sentiment` (string or null)
- `action_suggested` (string or null)
- `is_follow_up` (boolean or null)
- `follow_up_type` (string or null)
- `is_company_response` (boolean or null)
- `mentions_company_response` (boolean or null)
- `company_reply_content` (string or null)
- `company_reply_date` (string or null)

## Comment Object

- `comment_id` (string or null): Comment ID.
- `author` (string or null): Comment author.
- `comment_date` (string or null): Comment timestamp.
- `comment_text` (string or null): Comment body.
- `upvotes` (number or null): Upvote count.
- `downvotes` (number or null): Downvote count.
- `reply_to` (string or null): Parent comment ID for threading.
- `replies` (array): Nested comment objects (can be empty).

## Normalization Rules

- Missing scalar values become `null`.
- Missing list values become `[]`.
- Missing object values become `{}`.
- `nickname` folds into `author` when `author` is missing.
- `helpful_count` folds into `upvotes` with `downvotes = 0` when `upvotes`/`downvotes` are missing.
- `review_source` and `review_source_name` are copied from the top-level fields.
- `rating` is normalized to a numeric 1-5 value; string ratings are parsed.
- `comments` may be nested via `replies` or flat via `reply_to`.
