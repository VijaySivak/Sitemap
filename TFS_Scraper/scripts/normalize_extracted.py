#!/usr/bin/env python3
import argparse
import json
import os
from typing import Any

from review_schema import normalize_output

SOURCE_MAP = {
    "reviews_ca.json": "CA",
    "reviews_wh.json": "WH",
    "reviews_ck.json": "CK",
    "reviews_as.json": "AS",
}


def iter_json_files(root: str) -> list[str]:
    paths: list[str] = []
    if os.path.isfile(root) and root.lower().endswith(".json"):
        return [root]
    for dirpath, _, filenames in os.walk(root):
        for name in filenames:
            if name.lower().endswith(".json"):
                paths.append(os.path.join(dirpath, name))
    return sorted(paths)


def infer_source_hint(path: str, payload: dict[str, Any]) -> str | None:
    source = payload.get("source")
    if isinstance(source, str):
        return source
    return SOURCE_MAP.get(os.path.basename(path))


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Normalize extracted review JSON files to the unified schema."
    )
    parser.add_argument(
        "--input",
        default=os.path.join("extracted"),
        help="Input JSON file or directory (default: extracted/)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Optional output directory; defaults to in-place normalization.",
    )
    parser.add_argument(
        "--generate-tags",
        action="store_true",
        help="Generate tags with LM Studio during normalization",
    )
    args = parser.parse_args()

    input_root = args.input
    output_root = args.output
    paths = iter_json_files(input_root)
    if not paths:
        print(f"No JSON files found under {input_root}")
        return 1

    for path in paths:
        with open(path, "r", encoding="utf-8") as f:
            try:
                payload = json.load(f)
            except json.JSONDecodeError:
                print(f"Skipping invalid JSON: {path}")
                continue

        source_hint = infer_source_hint(path, payload)
        normalized = normalize_output(payload, source_hint=source_hint)
        if args.generate_tags:
            from tag_generator import (
                DEFAULT_CONFIG_PATH,
                DEFAULT_PROMPT_PATH,
                DEFAULT_TAXONOMY_PATH,
                build_taxonomy,
                generate_tags_batch,
                load_json,
                load_prompt,
            )

            config = load_json(DEFAULT_CONFIG_PATH)
            taxonomy = build_taxonomy(load_json(DEFAULT_TAXONOMY_PATH))
            prompt_template = load_prompt(DEFAULT_PROMPT_PATH)
            reviews = normalized.get("reviews") if isinstance(normalized, dict) else None
            if isinstance(reviews, list) and reviews:
                tags_list = generate_tags_batch(
                    reviews,
                    taxonomy,
                    prompt_template,
                    config["endpoint"],
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
                for review, tags in zip(reviews, tags_list):
                    review["tags"] = tags

        output_path = path
        if output_root:
            rel = os.path.relpath(path, input_root)
            output_path = os.path.join(output_root, rel)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(normalized, f, ensure_ascii=False, indent=2)

        print(f"Normalized {path} -> {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
