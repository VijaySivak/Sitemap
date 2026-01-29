#!/usr/bin/env python3
import argparse
import json
import os
import time
from typing import Any

from tag_generator import (
    DEFAULT_CONFIG_PATH,
    DEFAULT_PROMPT_PATH,
    DEFAULT_TAXONOMY_PATH,
    build_taxonomy,
    generate_tags,
    generate_tags_batch,
    load_json,
    load_prompt,
)
from review_schema import normalize_output


def load_reviews(path: str) -> dict[str, Any] | list[Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_payload(path: str, payload: dict[str, Any] | list[Any]) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)


def iter_review_items(payload: dict[str, Any] | list[Any]) -> list[dict[str, Any]]:
    if isinstance(payload, dict) and isinstance(payload.get("reviews"), list):
        return [r for r in payload["reviews"] if isinstance(r, dict)]
    if isinstance(payload, list):
        return [r for r in payload if isinstance(r, dict)]
    return []


def load_checkpoint(path: str) -> set[int]:
    if not os.path.exists(path):
        return set()
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        return set()
    if isinstance(data, dict) and isinstance(data.get("processed_indices"), list):
        return set(int(i) for i in data["processed_indices"] if isinstance(i, int))
    return set()


def save_checkpoint(path: str, processed: set[int]) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"processed_indices": sorted(processed)}, f, indent=2)


def print_progress(done: int, total: int) -> None:
    if total <= 0:
        return
    width = 30
    filled = int(width * done / total)
    bar = "#" * filled + "-" * (width - filled)
    print(f"\r[{bar}] {done}/{total}", end="", flush=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate tags for review JSON files.")
    parser.add_argument("--input", required=True, help="Input JSON file path")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    parser.add_argument("--endpoint", default=None, help="LM Studio endpoint URL")
    parser.add_argument("--config", default=DEFAULT_CONFIG_PATH, help="Config JSON path")
    parser.add_argument("--taxonomy", default=DEFAULT_TAXONOMY_PATH, help="Tag taxonomy JSON path")
    parser.add_argument("--prompt", default=DEFAULT_PROMPT_PATH, help="Prompt template path")
    parser.add_argument("--dry-run", action="store_true", help="Preview tags without saving")
    parser.add_argument(
        "--checkpoint",
        default=None,
        help="Checkpoint file path (defaults to output + .checkpoint.json)",
    )
    parser.add_argument(
        "--consistency-check",
        type=int,
        default=1,
        help="Run multiple tag generations per review (default: 1)",
    )
    args = parser.parse_args()

    config = load_json(args.config)
    taxonomy_config = load_json(args.taxonomy)
    taxonomy = build_taxonomy(taxonomy_config)
    prompt_template = load_prompt(args.prompt)

    endpoint = args.endpoint or config["endpoint"]
    payload = load_reviews(args.input)
    payload = normalize_output(payload)
    reviews = iter_review_items(payload)
    total = len(reviews)

    checkpoint_path = args.checkpoint or f"{args.output}.checkpoint.json"
    processed = load_checkpoint(checkpoint_path)

    failures: list[dict[str, Any]] = []
    tag_counts: dict[str, int] = {}
    pending_indices = [
        idx
        for idx, review in enumerate(reviews)
        if idx not in processed and not (isinstance(review.get("tags"), list) and review.get("tags"))
    ]

    if args.consistency_check > 1:
        for idx in pending_indices:
            review = reviews[idx]
            run_tags: list[list[str]] = []
            for _ in range(args.consistency_check):
                tags = generate_tags(
                    review.get("review_text"),
                    review.get("review_title"),
                    taxonomy,
                    prompt_template,
                    endpoint,
                    config["model"],
                    config["temperature"],
                    config["max_tokens"],
                    config["timeout"],
                    config["retry_attempts"],
                    config["min_tags"],
                    config["max_tags"],
                    config.get("confidence_threshold"),
                )
                run_tags.append(tags)
                if config.get("rate_limit_delay"):
                    time.sleep(config["rate_limit_delay"])

            if not run_tags or not run_tags[0]:
                failures.append({"index": idx, "review_id": review.get("review_id")})
                review["tags"] = []
            else:
                review["tags"] = run_tags[0]

            unique = {tuple(sorted(tags)) for tags in run_tags if tags}
            if len(unique) > 1:
                failures.append(
                    {
                        "index": idx,
                        "review_id": review.get("review_id"),
                        "issue": "inconsistent_tags",
                    }
                )

            for tag in review.get("tags", []):
                tag_counts[tag] = tag_counts.get(tag, 0) + 1

            processed.add(idx)
            save_checkpoint(checkpoint_path, processed)
            print_progress(len(processed), total)
    else:
        batch_size = max(1, int(config.get("batch_size", 1)))
        for offset in range(0, len(pending_indices), batch_size):
            batch_indices = pending_indices[offset : offset + batch_size]
            batch_reviews = [reviews[idx] for idx in batch_indices]
            tags_list = generate_tags_batch(
                batch_reviews,
                taxonomy,
                prompt_template,
                endpoint,
                config["model"],
                config["temperature"],
                config["max_tokens"],
                config["timeout"],
                config["retry_attempts"],
                config["min_tags"],
                config["max_tags"],
                config["rate_limit_delay"],
                config.get("confidence_threshold"),
            )
            for idx, tags in zip(batch_indices, tags_list):
                review = reviews[idx]
                if not tags:
                    failures.append({"index": idx, "review_id": review.get("review_id")})
                review["tags"] = tags
                for tag in tags:
                    tag_counts[tag] = tag_counts.get(tag, 0) + 1
                processed.add(idx)
            save_checkpoint(checkpoint_path, processed)
            print_progress(len(processed), total)

    print()
    if failures:
        print(f"Failures: {len(failures)} reviews returned no tags or inconsistent tags.")
    print("Tag distribution:")
    for tag, count in sorted(tag_counts.items(), key=lambda item: (-item[1], item[0])):
        print(f"  {tag}: {count}")

    if args.dry_run:
        return 0

    save_payload(args.output, payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
