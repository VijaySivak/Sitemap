#!/usr/bin/env python3
import argparse
import json
import os
import time
from urllib.parse import urlparse
import re

from playwright.sync_api import sync_playwright

DEFAULT_URL = "https://www.creditkarma.com/reviews/auto-loan/single/id/toyota-financial-services5"


def should_keep(url: str) -> bool:
    lowered = url.lower()
    return any(
        token in lowered
        for token in ["review", "rating", "vote", "like", "dislike", "flag", "graphql"]
    ) or "creditkarma" in lowered


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Capture Credit Karma review API calls via Playwright."
    )
    parser.add_argument("--url", default=DEFAULT_URL, help="Credit Karma reviews URL")
    parser.add_argument(
        "--output",
        default=os.path.join("sources", "credit_karma", "raw", "ck_requests.json"),
        help="Output JSON file",
    )
    parser.add_argument("--headful", action="store_true", help="Run with a visible browser")
    parser.add_argument(
        "--capture-comments",
        action="store_true",
        help="Attempt to click comment buttons to capture comment API calls",
    )
    args = parser.parse_args()

    seen = []
    graphql_capture = None
    graphql_calls = []
    seen_urls = set()

    def record_response(response):
        url = response.url
        nonlocal graphql_capture
        if url in seen_urls:
            return
        if not should_keep(url):
            return
        seen_urls.add(url)

        if "api.creditkarma.com/graphql" in url:
            try:
                entry = {
                    "url": url,
                    "status": response.status,
                    "method": response.request.method,
                    "request_headers": dict(response.request.headers),
                    "request_post_data": response.request.post_data,
                    "response_text": response.text(),
                }
                graphql_calls.append(entry)
                if graphql_capture is None:
                    graphql_capture = entry
            except Exception:
                entry = {
                    "url": url,
                    "status": response.status,
                    "method": response.request.method,
                    "request_headers": dict(response.request.headers),
                    "request_post_data": response.request.post_data,
                    "response_text": None,
                }
                graphql_calls.append(entry)
                if graphql_capture is None:
                    graphql_capture = entry

        seen.append(
            {
                "url": url,
                "status": response.status,
                "method": response.request.method,
                "resource_type": response.request.resource_type,
            }
        )

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=not args.headful)
        context = browser.new_context()
        page = context.new_page()
        page.on("response", record_response)

        page.goto(args.url, wait_until="networkidle", timeout=60000)
        # Scroll to trigger review load.
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(5)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(5)
        if args.capture_comments:
            # Best-effort click on comment/reply buttons to trigger comment API calls.
            buttons = page.get_by_role("button", name=re.compile(r"comment|reply", re.I))
            count = buttons.count()
            for idx in range(min(count, 5)):
                try:
                    buttons.nth(idx).click(timeout=2000)
                    time.sleep(1)
                except Exception:
                    continue

        browser.close()

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(seen, f, indent=2)

    print(f"Captured {len(seen)} matching requests -> {args.output}")
    for entry in seen:
        host = urlparse(entry["url"]).netloc
        print(f"[{entry['status']}] {entry['method']} {host} {entry['url']}")

    if graphql_capture:
        graphql_out = os.path.join(
            os.path.dirname(args.output), "ck_graphql.json"
        )
        with open(graphql_out, "w", encoding="utf-8") as f:
            json.dump(graphql_capture, f, indent=2)
        print(f"Saved GraphQL capture -> {graphql_out}")
    if graphql_calls:
        graphql_calls_out = os.path.join(
            os.path.dirname(args.output), "ck_graphql_calls.json"
        )
        with open(graphql_calls_out, "w", encoding="utf-8") as f:
            json.dump(graphql_calls, f, indent=2)
        print(f"Saved GraphQL call list -> {graphql_calls_out}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
