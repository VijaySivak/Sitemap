#!/usr/bin/env python3
import argparse
import os
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

DEFAULT_URL = "https://www.creditkarma.com/reviews/auto-loan/single/id/toyota-financial-services5"


def fetch_html(url: str, retries: int = 2) -> str:
    last_err: Exception | None = None
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",
        "Connection": "close",
        "Referer": "https://www.creditkarma.com/",
    }
    for attempt in range(retries + 1):
        try:
            req = Request(url, headers=headers)
            with urlopen(req, timeout=20) as resp:
                charset = resp.headers.get_content_charset() or "utf-8"
                return resp.read().decode(charset, errors="replace")
        except (HTTPError, URLError) as e:
            last_err = e
            if attempt < retries:
                time.sleep(1.5 * (attempt + 1))
                continue
            break
    if last_err:
        raise last_err
    raise RuntimeError("Unknown error fetching HTML")


def main() -> int:
    parser = argparse.ArgumentParser(description="Download a Credit Karma reviews page HTML.")
    parser.add_argument("--url", default=DEFAULT_URL, help="Credit Karma reviews URL")
    parser.add_argument(
        "--output",
        default=os.path.join("sources", "credit_karma", "raw", "creditkarma.html"),
        help="Output HTML file",
    )
    args = parser.parse_args()

    try:
        html_text = fetch_html(args.url, retries=3)
    except (HTTPError, URLError) as e:
        print(f"Failed to fetch: {e}", file=sys.stderr)
        return 1

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(html_text)

    print(f"Saved HTML to: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
