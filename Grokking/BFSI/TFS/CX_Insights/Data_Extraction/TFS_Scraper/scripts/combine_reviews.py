#!/usr/bin/env python3
import argparse
import datetime as dt
import json
import os
from typing import Any

from review_schema import normalize_output


def iter_json_files(root: str) -> list[str]:
    paths: list[str] = []
    if os.path.isfile(root) and root.lower().endswith(".json"):
        return [root]
    for dirpath, _, filenames in os.walk(root):
        for name in filenames:
            if name.lower().endswith(".json"):
                paths.append(os.path.join(dirpath, name))
    return sorted(paths)


def build_exclude_set(excludes: list[str]) -> set[str]:
    normalized: set[str] = set()
    for item in excludes:
        if not item:
            continue
        normalized.add(os.path.abspath(item))
    return normalized


def is_excluded(path: str, exclude_set: set[str]) -> bool:
    abs_path = os.path.abspath(path)
    if abs_path in exclude_set:
        return True
    for exclude in exclude_set:
        if abs_path.startswith(exclude + os.sep):
            return True
    return False


def load_payload(path: str) -> dict[str, Any] | list[Any] | None:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return None


def flatten_reviews(payload: dict[str, Any]) -> list[dict[str, Any]]:
    reviews = payload.get("reviews")
    if isinstance(reviews, list):
        return [r for r in reviews if isinstance(r, dict)]
    return []


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Combine multiple review JSON files into the unified schema."
    )
    parser.add_argument(
        "--input",
        default=os.path.join("extracted"),
        help="Input file or directory (default: extracted/)",
    )
    parser.add_argument(
        "--output",
        default=os.path.join("combined", "reviews_all.json"),
        help="Output JSON file path",
    )
    parser.add_argument(
        "--exclude",
        action="append",
        default=[os.path.join("external", "json", "google_play_toyota_reviews.json")],
        help="File or directory to exclude (can be used multiple times)",
    )
    parser.add_argument(
        "--tag-on-combine",
        action="store_true",
        help="Generate tags for reviews that are missing tags",
    )
    args = parser.parse_args()

    input_root = args.input
    output_path = args.output
    paths = iter_json_files(input_root)
    exclude_set = build_exclude_set(args.exclude or [])
    if not paths:
        print(f"No JSON files found under {input_root}")
        return 1

    combined_reviews: list[dict[str, Any]] = []
    sources: dict[str, dict[str, Any]] = {}
    tag_config = None
    taxonomy = None
    prompt_template = None
    if args.tag_on_combine:
        from tag_generator import (
            DEFAULT_CONFIG_PATH,
            DEFAULT_PROMPT_PATH,
            DEFAULT_TAXONOMY_PATH,
            build_taxonomy,
            load_json,
            load_prompt,
        )

        tag_config = load_json(DEFAULT_CONFIG_PATH)
        taxonomy = build_taxonomy(load_json(DEFAULT_TAXONOMY_PATH))
        prompt_template = load_prompt(DEFAULT_PROMPT_PATH)
    for path in paths:
        if is_excluded(path, exclude_set):
            continue
        payload = load_payload(path)
        if payload is None:
            print(f"Skipping invalid JSON: {path}")
            continue
        normalized = normalize_output(payload)
        if args.tag_on_combine and tag_config and taxonomy and prompt_template:
            from tag_generator import generate_tags_batch

            reviews = normalized.get("reviews") if isinstance(normalized, dict) else None
            if isinstance(reviews, list) and reviews:
                needs_tags = [r for r in reviews if not r.get("tags")]
                if needs_tags:
                    tags_list = generate_tags_batch(
                        needs_tags,
                        taxonomy,
                        prompt_template,
                        tag_config["endpoint"],
                        tag_config["model"],
                        tag_config["temperature"],
                        tag_config["max_tokens"],
                        tag_config["timeout"],
                        tag_config["retry_attempts"],
                        tag_config["min_tags"],
                        tag_config["max_tags"],
                        tag_config["rate_limit_delay"],
                        tag_config.get("confidence_threshold"),
                    )
                    for review, tags in zip(needs_tags, tags_list):
                        review["tags"] = tags
        source = normalized.get("source")
        if source:
            sources[source] = {
                "source": source,
                "source_name": normalized.get("source_name"),
                "title": normalized.get("title"),
            }
        combined_reviews.extend(flatten_reviews(normalized))

    combined = normalize_output(
        {
            "source": "ALL",
            "source_name": "Combined",
            "title": "Combined Reviews",
            "overall_brand_rating": None,
            "total_review_count": len(combined_reviews),
            "company_info": None,
            "statistics": None,
            "review_page_attributes": None,
            "helpful_reviews": None,
            "metadata": None,
            "sources": list(sources.values()) if sources else None,
            "reviews": combined_reviews,
        },
        source_hint=None,
        extraction_meta={
            "extracted_at": dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
            "extractor_version": "2.0",
            "raw_source_preserved": False,
        },
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(combined, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(combined_reviews)} reviews to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
