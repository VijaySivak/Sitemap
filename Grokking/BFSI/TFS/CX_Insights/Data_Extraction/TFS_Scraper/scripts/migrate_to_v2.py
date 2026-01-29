#!/usr/bin/env python3
import argparse
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


def main() -> int:
    parser = argparse.ArgumentParser(description="Migrate review JSON files to schema v2.")
    parser.add_argument(
        "--input",
        default=os.path.join("extracted"),
        help="Input JSON file or directory (default: extracted/)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Optional output directory; defaults to in-place migration.",
    )
    args = parser.parse_args()

    input_root = args.input
    output_root = args.output
    paths = iter_json_files(input_root)
    if not paths:
        print(f"No JSON files found under {input_root}")
        return 1

    for path in paths:
        try:
            with open(path, "r", encoding="utf-8") as f:
                payload: dict[str, Any] | list[Any] = json.load(f)
        except json.JSONDecodeError:
            print(f"Skipping invalid JSON: {path}")
            continue

        normalized = normalize_output(payload)
        output_path = path
        if output_root:
            rel = os.path.relpath(path, input_root)
            output_path = os.path.join(output_root, rel)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(normalized, f, ensure_ascii=False, indent=2)

        print(f"Migrated {path} -> {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
