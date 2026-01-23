from __future__ import annotations

import json
import os
import re
import time
from typing import Any
from urllib import error as url_error
from urllib import request as url_request

DEFAULT_CONFIG_PATH = os.path.join("config", "lm_studio_config.json")
DEFAULT_TAXONOMY_PATH = os.path.join("config", "tag_taxonomy.json")
DEFAULT_PROMPT_PATH = os.path.join("scripts", "prompts", "tagging_prompt.txt")


def load_json(path: str) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_prompt(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def build_taxonomy(taxonomy_config: dict[str, Any]) -> list[str]:
    taxonomy: list[str] = []
    for group in taxonomy_config.values():
        if isinstance(group, list):
            taxonomy.extend([t for t in group if isinstance(t, str)])
    return taxonomy


def validate_tags(tags: list[str], taxonomy: list[str], min_tags: int, max_tags: int) -> list[str]:
    allowed = {t.lower(): t for t in taxonomy}
    cleaned: list[str] = []
    for tag in tags:
        normalized = tag.strip()
        if not normalized:
            continue
        key = normalized.lower()
        if key in allowed:
            canonical = allowed[key]
            if canonical not in cleaned:
                cleaned.append(canonical)
    if len(cleaned) < min_tags:
        return []
    return cleaned[:max_tags]


def parse_tag_response(response: str, taxonomy: list[str]) -> list[str]:
    if not response:
        return []

    response = response.strip()

    json_match = re.search(r"\{.*\}", response, re.DOTALL)
    if json_match:
        try:
            payload = json.loads(json_match.group(0))
            if isinstance(payload, dict) and isinstance(payload.get("tags"), list):
                return [str(tag) for tag in payload["tags"]]
        except json.JSONDecodeError:
            pass

    lines = re.split(r"[\n,]", response)
    tags: list[str] = []
    for line in lines:
        line = re.sub(r"^[\s\-\*\d\.\)\(]+", "", line).strip()
        if not line:
            continue
        tags.append(line)

    if tags:
        return tags

    allowed = {t.lower(): t for t in taxonomy}
    found: list[str] = []
    for tag in taxonomy:
        if tag.lower() in response.lower():
            found.append(allowed[tag.lower()])
    return found


def extract_confidence_map(response: str) -> dict[str, float]:
    json_match = re.search(r"\{.*\}", response, re.DOTALL)
    if not json_match:
        return {}
    try:
        payload = json.loads(json_match.group(0))
    except json.JSONDecodeError:
        return {}
    if not isinstance(payload, dict):
        return {}
    confidences = payload.get("confidences") or payload.get("tag_confidences")
    if isinstance(confidences, dict):
        return {
            str(tag): float(score)
            for tag, score in confidences.items()
            if isinstance(score, (int, float))
        }
    if isinstance(confidences, list):
        output: dict[str, float] = {}
        for item in confidences:
            if not isinstance(item, dict):
                continue
            tag = item.get("tag")
            score = item.get("score")
            if isinstance(tag, str) and isinstance(score, (int, float)):
                output[tag] = float(score)
        return output
    return {}


def call_lm_studio(prompt: str, endpoint: str, model: str, temperature: float, max_tokens: int, timeout: int) -> str:
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    req = url_request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with url_request.urlopen(req, timeout=timeout) as resp:
        body = resp.read().decode("utf-8", errors="replace")
        parsed = json.loads(body)
    return parsed["choices"][0]["message"]["content"].strip()


def generate_tags(
    review_text: str | None,
    review_title: str | None,
    taxonomy: list[str],
    prompt_template: str,
    endpoint: str,
    model: str,
    temperature: float,
    max_tokens: int,
    timeout: int,
    retry_attempts: int,
    min_tags: int,
    max_tags: int,
    confidence_threshold: float | None = None,
) -> list[str]:
    prompt = prompt_template.format(
        review_title=review_title or "",
        review_text=review_text or "",
    )
    last_error = None
    for attempt in range(1, retry_attempts + 1):
        try:
            response = call_lm_studio(prompt, endpoint, model, temperature, max_tokens, timeout)
            tags = parse_tag_response(response, taxonomy)
            validated = validate_tags(tags, taxonomy, min_tags, max_tags)
            if confidence_threshold is not None:
                confidence_map = extract_confidence_map(response)
                if confidence_map:
                    validated = [
                        tag for tag in validated if confidence_map.get(tag, 0.0) >= confidence_threshold
                    ]
            return validated
        except (url_error.URLError, url_error.HTTPError, json.JSONDecodeError) as exc:
            if attempt >= retry_attempts:
                return []
            time.sleep(0.5 * attempt)
            last_error = exc
    return []


def generate_tags_batch(
    reviews: list[dict[str, Any]],
    taxonomy: list[str],
    prompt_template: str,
    endpoint: str,
    model: str,
    temperature: float,
    max_tokens: int,
    timeout: int,
    retry_attempts: int,
    min_tags: int,
    max_tags: int,
    rate_limit_delay: float,
    confidence_threshold: float | None = None,
) -> list[list[str]]:
    results: list[list[str]] = []
    for review in reviews:
        tags = generate_tags(
            review.get("review_text"),
            review.get("review_title"),
            taxonomy,
            prompt_template,
            endpoint,
            model,
            temperature,
            max_tokens,
            timeout,
            retry_attempts,
            min_tags,
            max_tags,
            confidence_threshold,
        )
        results.append(tags)
        if rate_limit_delay:
            time.sleep(rate_limit_delay)
    return results
