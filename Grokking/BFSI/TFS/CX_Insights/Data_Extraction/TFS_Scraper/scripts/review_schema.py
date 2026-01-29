from __future__ import annotations

import datetime as dt
import re
from typing import Any

SCHEMA_VERSION = "2.0"

SOURCE_DEFAULTS = {
    "CA": {
        "source": "CA",
        "source_name": "ConsumerAffairs",
        "title": "Consumer Affairs Reviews",
    },
    "WH": {
        "source": "WH",
        "source_name": "WalletHub",
        "title": "WalletHub Reviews",
    },
    "CK": {
        "source": "CK",
        "source_name": "CreditKarma",
        "title": "Credit Karma Reviews",
    },
    "AS": {
        "source": "AS",
        "source_name": "Apple App Store",
    },
    "GP": {
        "source": "GP",
        "source_name": "Google Play",
    },
}

SOURCE_DATA_KEYS = {
    "CA": "consumer_affairs",
    "WH": "wallethub",
    "CK": "credit_karma",
    "AS": "app_store",
    "GP": "google_play",
}

CANONICAL_REVIEW_KEYS = {
    "review_id",
    "author",
    "location",
    "review_date",
    "rating",
    "review_title",
    "review_text",
    "review_url",
    "tags",
    "votes",
    "interactions",
    "metadata",
}

GOOGLE_PLAY_DUPLICATES = {
    "title",
    "content",
    "stars",
    "date",
    "resource",
    "source",
}


def _snake_case(value: str) -> str:
    value = re.sub(r"[^0-9a-zA-Z]+", "_", value.strip())
    value = re.sub(r"_+", "_", value)
    return value.strip("_").lower()


def _normalize_company_info(info: Any) -> dict[str, Any] | None:
    if not isinstance(info, dict) or not info:
        return None
    normalized: dict[str, Any] = {}
    for key, val in info.items():
        if key is None:
            continue
        normalized_key = _snake_case(str(key))
        normalized[normalized_key] = val
    return normalized or None


def _strip_empty(value: Any) -> Any:
    if isinstance(value, dict):
        cleaned = {k: _strip_empty(v) for k, v in value.items()}
        cleaned = {k: v for k, v in cleaned.items() if v is not None}
        return cleaned if cleaned else None
    if isinstance(value, list):
        cleaned_list = [_strip_empty(item) for item in value]
        cleaned_list = [item for item in cleaned_list if item is not None]
        return cleaned_list if cleaned_list else None
    return value


def _parse_rating(value: Any) -> int | float | None:
    if isinstance(value, (int, float)):
        return value
    if isinstance(value, str):
        match = re.search(r"\d+(\.\d+)?", value)
        if match:
            try:
                return float(match.group(0)) if "." in match.group(0) else int(match.group(0))
            except ValueError:
                return None
    return None


def _build_votes(review: dict[str, Any]) -> dict[str, Any] | None:
    votes = {
        "helpful": review.get("helpful_count"),
        "up": review.get("upvotes"),
        "down": review.get("downvotes"),
        "sum": review.get("vote_sum"),
        "count": review.get("vote_count"),
    }
    return _strip_empty(votes)


def _normalize_comment(comment: dict[str, Any]) -> dict[str, Any] | None:
    if not isinstance(comment, dict):
        return None
    normalized = {
        "comment_id": comment.get("comment_id"),
        "author": comment.get("author"),
        "comment_date": comment.get("comment_date"),
        "comment_text": comment.get("comment_text"),
        "upvotes": comment.get("upvotes"),
        "downvotes": comment.get("downvotes"),
        "reply_to": comment.get("reply_to"),
        "replies": [
            _normalize_comment(reply)
            for reply in comment.get("replies", [])
            if isinstance(reply, dict)
        ]
        if isinstance(comment.get("replies"), list)
        else None,
    }
    return _strip_empty(normalized)


def _build_interactions(review: dict[str, Any]) -> dict[str, Any] | None:
    comments = review.get("comments")
    normalized_comments = None
    if isinstance(comments, list):
        normalized_comments = [
            _normalize_comment(comment)
            for comment in comments
            if isinstance(comment, dict)
        ]
        normalized_comments = [c for c in normalized_comments if c]

    interactions = {
        "comments_count": review.get("comments_count"),
        "comments": normalized_comments,
        "reactions": review.get("reactions"),
        "shares": review.get("shares"),
    }
    return _strip_empty(interactions)


def _build_source_data(review: dict[str, Any], source_code: str | None) -> dict[str, Any] | None:
    source_key = SOURCE_DATA_KEYS.get(source_code or "", "other")
    data: dict[str, Any] = {}

    if source_key == "consumer_affairs":
        data.update(
            {
                "review_alias": review.get("review_alias"),
                "media": review.get("media"),
            }
        )
    elif source_key == "wallethub":
        data.update(
            {
                "product": review.get("product"),
                "verified": review.get("verified"),
                "nickname": review.get("nickname"),
            }
        )
    elif source_key == "credit_karma":
        data.update(
            {
                "badges": review.get("badges"),
                "flags": review.get("flags"),
            }
        )
    elif source_key == "app_store":
        data.update(
            {
                "author_uri": review.get("author_uri"),
                "app_version": review.get("app_version"),
                "content_type": review.get("content_type"),
                "locale": review.get("locale"),
                "sort_modes": review.get("sort_modes"),
                "apple_metadata": review.get("metadata"),
            }
        )
    elif source_key == "google_play":
        data.update(
            {
                "topic": review.get("topic"),
                "subtopic": review.get("subtopic"),
                "sentiment": review.get("sentiment"),
                "action_suggested": review.get("action_suggested"),
                "is_follow_up": review.get("is_follow_up"),
                "follow_up_type": review.get("follow_up_type"),
                "is_company_response": review.get("is_company_response"),
                "mentions_company_response": review.get("mentions_company_response"),
                "company_reply_content": review.get("company_reply_content"),
                "company_reply_date": review.get("company_reply_date"),
            }
        )

    extras: dict[str, Any] = {}
    for key, value in review.items():
        if key in CANONICAL_REVIEW_KEYS:
            continue
        if key in GOOGLE_PLAY_DUPLICATES:
            continue
        if key in {
            "helpful_count",
            "upvotes",
            "downvotes",
            "vote_sum",
            "vote_count",
            "comments_count",
            "comments",
            "review_source",
            "review_source_name",
            "reactions",
            "shares",
        }:
            continue
        if key in data:
            continue
        if value is not None:
            extras[key] = value

    if extras:
        data["other"] = extras

    data = _strip_empty(data)
    if not data:
        return None
    return {"source_data": {source_key: data}}


def _normalize_review(review: dict[str, Any], source_code: str | None) -> dict[str, Any]:
    author = review.get("author") or review.get("nickname")
    review_title = review.get("review_title") or review.get("title")
    review_text = review.get("review_text") or review.get("content")
    review_date = review.get("review_date") or review.get("date")
    review_url = review.get("review_url") or review.get("source")
    rating = _parse_rating(review.get("rating") or review.get("stars"))
    tags = review.get("tags")
    if tags is not None and not isinstance(tags, list):
        tags = [tags]

    normalized = {
        "review_id": review.get("review_id"),
        "author": author,
        "location": review.get("location"),
        "review_date": review_date,
        "rating": rating,
        "review_title": review_title,
        "review_text": review_text,
        "review_url": review_url,
        "tags": tags,
        "votes": _build_votes(review),
        "interactions": _build_interactions(review),
        "metadata": _build_source_data(review, source_code),
    }

    return _strip_empty(normalized) or {}


def _normalize_top_metadata(payload: dict[str, Any], source_code: str | None) -> dict[str, Any] | None:
    metadata = payload.get("metadata")
    if not isinstance(metadata, dict):
        metadata = {}

    source_key = SOURCE_DATA_KEYS.get(source_code or "", "other")
    source_data: dict[str, Any] = {}

    if source_key == "app_store":
        apple_feeds = metadata.get("apple_feeds") if isinstance(metadata, dict) else None
        if apple_feeds is not None:
            source_data["apple_feeds"] = apple_feeds
        sort_modes = metadata.get("sort_modes") if isinstance(metadata, dict) else None
        if sort_modes is not None:
            source_data["sort_modes"] = sort_modes

    extras = {k: v for k, v in metadata.items() if k not in source_data}
    if extras:
        source_data["other"] = extras

    source_data = _strip_empty(source_data)
    if not source_data:
        return None
    return {"source_data": {source_key: source_data}}


def normalize_output(
    payload: dict[str, Any] | list[Any],
    source_hint: str | None = None,
    extraction_meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    if isinstance(payload, list):
        payload = {"reviews": payload}
    if not isinstance(payload, dict):
        payload = {}
    if payload.get("schema_version") == SCHEMA_VERSION:
        if extraction_meta and "extraction_meta" not in payload:
            payload["extraction_meta"] = extraction_meta
        return payload

    defaults = SOURCE_DEFAULTS.get(source_hint or "", {})
    source = payload.get("source", defaults.get("source"))
    source_name = payload.get("source_name", defaults.get("source_name"))
    title = payload.get("title", defaults.get("title"))
    overall_brand_rating = payload.get("overall_brand_rating")
    total_review_count = payload.get("total_review_count")

    company_info = _normalize_company_info(payload.get("company_info"))

    page_metadata = {
        "statistics": payload.get("statistics"),
        "review_page_attributes": payload.get("review_page_attributes"),
        "helpful_reviews": payload.get("helpful_reviews"),
    }
    page_metadata = _strip_empty(page_metadata)

    top_metadata = _normalize_top_metadata(payload, source)

    reviews_value = payload.get("reviews")
    reviews: list[dict[str, Any]] = []
    if isinstance(reviews_value, list):
        for review in reviews_value:
            if isinstance(review, dict):
                normalized_review = _normalize_review(review, source)
                if normalized_review:
                    reviews.append(normalized_review)
    elif isinstance(reviews_value, dict):
        normalized_review = _normalize_review(reviews_value, source)
        if normalized_review:
            reviews.append(normalized_review)

    if extraction_meta is None:
        extraction_meta = {
            "extracted_at": dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
            "extractor_version": SCHEMA_VERSION,
            "raw_source_preserved": False,
        }

    normalized: dict[str, Any] = {
        "schema_version": SCHEMA_VERSION,
        "source": source,
        "source_name": source_name,
        "title": title,
        "overall_brand_rating": overall_brand_rating,
        "total_review_count": total_review_count,
        "company_info": company_info,
        "page_metadata": page_metadata,
        "metadata": top_metadata,
        "extraction_meta": extraction_meta,
        "sources": payload.get("sources"),
        "reviews": reviews,
    }

    for key in ("company_info", "page_metadata", "metadata", "sources"):
        if normalized.get(key) is None:
            continue
        normalized[key] = normalized[key] or None

    return normalized
