#!/usr/bin/env python3
import argparse
import glob
import hashlib
import html as html_lib
import json
import os
import re
import time
from urllib import error as url_error
from urllib import request as url_request
from typing import Any

from bs4 import BeautifulSoup

from review_schema import normalize_output

SOURCES = {
    "CA": {
        "name": "ConsumerAffairs",
        "default_input": os.path.join("sources", "consumer_affairs", "raw"),
        "default_output": os.path.join("extracted", "ca", "reviews_ca.json"),
    },
    "WH": {
        "name": "WalletHub",
        "default_input": os.path.join("sources", "wallethub", "raw", "wallethub.html"),
        "default_output": os.path.join("extracted", "wh", "reviews_wh.json"),
    },
    "CK": {
        "name": "CreditKarma",
        "default_input": os.path.join("sources", "credit_karma", "raw", "ck_graphql.json"),
        "default_output": os.path.join("extracted", "ck", "reviews_ck.json"),
    },
    "AS": {
        "name": "Apple App Store",
        "default_input": None,
        "default_output": os.path.join("extracted", "as", "reviews_as.json"),
    },
}


def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        return f.read()


def normalize_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def safe_int(value: str | None) -> int | None:
    if value is None:
        return None
    try:
        return int(value)
    except ValueError:
        return None


def formatted_text_to_string(value: Any) -> str | None:
    if not isinstance(value, dict):
        return None
    spans = value.get("spans")
    if not isinstance(spans, list):
        return None
    parts = []
    for span in spans:
        if isinstance(span, dict) and span.get("text"):
            parts.append(span["text"])
    text = normalize_whitespace(" ".join(parts))
    return text if text else None


def apple_label(value: Any) -> str | None:
    if isinstance(value, dict):
        label = value.get("label")
        return label if isinstance(label, str) else None
    if isinstance(value, str):
        return value
    return None


def apple_review_id(entry: dict[str, Any]) -> str | None:
    review_id = apple_label(entry.get("id"))
    if review_id:
        return review_id
    return None


def apple_review_hash(entry: dict[str, Any]) -> str:
    stable_fields = {
        "author": apple_label((entry.get("author") or {}).get("name")),
        "title": apple_label(entry.get("title")),
        "content": apple_label((entry.get("content") or {}).get("label")),
        "rating": apple_label(entry.get("im:rating")),
        "updated": apple_label(entry.get("updated")),
        "version": apple_label(entry.get("im:version")),
    }
    payload = json.dumps(stable_fields, sort_keys=True, ensure_ascii=True)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def apple_review_key(entry: dict[str, Any]) -> str:
    review_id = apple_review_id(entry)
    if review_id:
        return f"id:{review_id}"
    return f"hash:{apple_review_hash(entry)}"


def fetch_app_store_feed(
    app_id: str,
    storefront: str,
    page: int,
    sort_mode: str,
) -> dict[str, Any]:
    url = (
        "https://itunes.apple.com/"
        f"{storefront}/rss/customerreviews/page={page}/id={app_id}/sortBy={sort_mode}/json"
    )
    print(f"[AS] Fetching reviews sort={sort_mode} page={page} url={url}")
    req = url_request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ReviewScraper/1.0)",
        },
        method="GET",
    )
    try:
        with url_request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            print(f"[AS] Response {resp.status} bytes={len(body)}")
            return json.loads(body)
    except url_error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"App Store API error {exc.code}: {detail[:200]}") from exc


def parse_app_store_last_page(feed: dict[str, Any]) -> int | None:
    links = feed.get("link")
    if not isinstance(links, list):
        return None
    for link in links:
        attrs = link.get("attributes") if isinstance(link, dict) else None
        if not isinstance(attrs, dict):
            continue
        if attrs.get("rel") != "last":
            continue
        href = attrs.get("href")
        if not isinstance(href, str):
            continue
        match = re.search(r"/page=(\d+)/", href)
        if match:
            return safe_int(match.group(1))
    return None


def extract_app_store_review(
    entry: dict[str, Any],
    sort_mode: str,
    storefront: str,
) -> dict[str, Any]:
    author = entry.get("author") or {}
    author_name = apple_label(author.get("name")) or apple_label(author.get("label"))
    author_uri = apple_label(author.get("uri"))
    title = apple_label(entry.get("title"))
    content_block = entry.get("content") or {}
    review_text = apple_label(content_block.get("label")) or apple_label(entry.get("content"))
    review_date = apple_label(entry.get("updated"))
    rating = safe_int(apple_label(entry.get("im:rating")))
    version = apple_label(entry.get("im:version"))
    review_id = apple_review_id(entry)
    link_attrs = (entry.get("link") or {}).get("attributes") if isinstance(entry.get("link"), dict) else {}
    review_url = link_attrs.get("href") if isinstance(link_attrs, dict) else None
    vote_sum = safe_int(apple_label(entry.get("im:voteSum")))
    vote_count = safe_int(apple_label(entry.get("im:voteCount")))
    content_type = None
    content_attrs = (entry.get("im:contentType") or {}).get("attributes")
    if isinstance(content_attrs, dict):
        content_type = content_attrs.get("label") or content_attrs.get("term")

    return {
        "review_id": review_id,
        "author": author_name,
        "location": None,
        "review_date": review_date,
        "rating": rating,
        "tags": [],
        "review_text": normalize_whitespace(review_text) if review_text else None,
        "helpful_count": vote_sum,
        "review_alias": None,
        "media": [],
        "nickname": None,
        "product": None,
        "verified": None,
        "upvotes": None,
        "downvotes": None,
        "review_title": normalize_whitespace(title) if title else None,
        "author_uri": author_uri,
        "review_url": review_url,
        "app_version": version,
        "vote_sum": vote_sum,
        "vote_count": vote_count,
        "content_type": content_type,
        "locale": storefront,
        "sort_modes": [sort_mode],
        "metadata": {
            "apple_entries": {sort_mode: entry},
            "apple_review_key": apple_review_key(entry),
        },
    }


def merge_app_store_review(
    existing: dict[str, Any],
    sort_mode: str,
    entry: dict[str, Any],
) -> None:
    modes = existing.get("sort_modes")
    if isinstance(modes, list) and sort_mode not in modes:
        modes.append(sort_mode)
    metadata = existing.get("metadata")
    if not isinstance(metadata, dict):
        metadata = {}
        existing["metadata"] = metadata
    apple_entries = metadata.get("apple_entries")
    if not isinstance(apple_entries, dict):
        apple_entries = {}
        metadata["apple_entries"] = apple_entries
    if sort_mode not in apple_entries:
        apple_entries[sort_mode] = entry


def gather_app_store_reviews(
    app_id: str,
    storefront: str,
    sort_modes: list[str],
    delay: float,
    max_pages: int | None,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    reviews_by_key: dict[str, dict[str, Any]] = {}
    feed_metadata: dict[str, Any] = {}

    for sort_mode in sort_modes:
        page = 1
        last_page = None
        consecutive_no_new = 0
        while True:
            payload = fetch_app_store_feed(app_id, storefront, page, sort_mode)
            feed = payload.get("feed", {}) if isinstance(payload, dict) else {}
            entries = feed.get("entry", [])
            if isinstance(entries, dict):
                entries = [entries]
            if not isinstance(entries, list):
                entries = []

            if sort_mode not in feed_metadata:
                feed_metadata[sort_mode] = feed

            if last_page is None:
                last_page = parse_app_store_last_page(feed)

            new_count = 0
            for entry in entries:
                if not isinstance(entry, dict):
                    continue
                key = apple_review_key(entry)
                if key in reviews_by_key:
                    merge_app_store_review(reviews_by_key[key], sort_mode, entry)
                    continue
                review = extract_app_store_review(entry, sort_mode, storefront)
                reviews_by_key[key] = review
                new_count += 1

            print(
                f"[AS] sort={sort_mode} page={page} new={new_count} total={len(reviews_by_key)}"
            )

            if new_count == 0:
                consecutive_no_new += 1
            else:
                consecutive_no_new = 0

            if max_pages and page >= max_pages:
                print("[AS] Stopping due to max-pages")
                break
            if last_page and page >= last_page:
                print("[AS] Reached last page")
                break
            if not entries or consecutive_no_new >= 1:
                print("[AS] No new reviews; stopping for this sort mode")
                break

            page += 1
            if delay > 0:
                print(f"[AS] Sleeping for {delay} seconds")
                time.sleep(delay)

    return list(reviews_by_key.values()), feed_metadata


def extract_company_meta_ca(soup: BeautifulSoup) -> dict[str, Any]:
    meta = {
        "overall_brand_rating": None,
        "total_review_count": None,
        "company_info": {},
    }

    rating = soup.find("meta", attrs={"name": "st_brand-star-rating-value"})
    if rating and rating.get("content"):
        try:
            meta["overall_brand_rating"] = float(rating["content"])
        except ValueError:
            meta["overall_brand_rating"] = rating["content"]

    count = soup.find("meta", attrs={"name": "st_star-rating-review-count"})
    if count and count.get("content"):
        try:
            meta["total_review_count"] = int(count["content"])
        except ValueError:
            meta["total_review_count"] = count["content"]

    info_dl = soup.select_one("dl.cpny-prf__info")
    if info_dl:
        dts = info_dl.find_all("dt")
        dds = info_dl.find_all("dd")
        for dt, dd in zip(dts, dds):
            key = normalize_whitespace(dt.get_text(" ", strip=True)).rstrip(":")
            val = normalize_whitespace(dd.get_text(" ", strip=True))
            if key:
                meta["company_info"][key] = val

    return meta


def extract_media_ca(review_soup: BeautifulSoup) -> list[dict[str, Any]]:
    media_items: list[dict[str, Any]] = []
    media_el = review_soup.find(attrs={"data-ca-modal-collection": True})
    if not media_el:
        return media_items

    raw = media_el.get("data-ca-modal-collection", "")
    if not raw:
        return media_items

    try:
        decoded = html_lib.unescape(raw)
        payload = json.loads(decoded)
        for item in payload:
            if not isinstance(item, dict):
                continue
            if "src" in item or "thumbnail" in item or "title" in item:
                media_items.append(
                    {
                        "src": item.get("src"),
                        "thumbnail": item.get("thumbnail"),
                        "title": item.get("title"),
                    }
                )
    except json.JSONDecodeError:
        return media_items

    return media_items


def extract_review_text_ca(review_soup: BeautifulSoup, review_id: str | None) -> str:
    text_parts: list[str] = []

    top = review_soup.select_one("div.rvw__top-text")
    if top:
        for more in top.select("span.rvw__more"):
            more.decompose()
        text_parts.append(normalize_whitespace(top.get_text(" ", strip=True)))

    if review_id:
        extra = review_soup.find("div", id=f"review-entry-{review_id}")
        if extra:
            text_parts.append(normalize_whitespace(extra.get_text(" ", strip=True)))

    text = " ".join([t for t in text_parts if t])
    return normalize_whitespace(text)


def extract_reviews_ca(soup: BeautifulSoup) -> list[dict[str, Any]]:
    reviews: list[dict[str, Any]] = []

    for review in soup.select("div.js-rvw.rvw"):
        review_id = review.get("data-id")
        if not review_id and review.get("id"):
            review_id = review.get("id", "").replace("review-", "")

        author = review.select_one("span.rvw__inf-nm")
        location = review.select_one("span.rvw__inf-lctn")
        date = review.select_one("p.rvw__rvd-dt")
        rating = review.select_one("meta[itemprop=ratingValue]")
        tags = [
            normalize_whitespace(t.get_text(" ", strip=True))
            for t in review.select("span.rvw__tag")
        ]

        alias_button = review.find(attrs={"data-review-alias": True})
        review_alias = alias_button.get("data-review-alias") if alias_button else None

        review_text = extract_review_text_ca(review, review_id)
        media = extract_media_ca(review)

        entry = {
            "review_id": review_id,
            "author": normalize_whitespace(author.get_text(" ", strip=True)) if author else None,
            "location": normalize_whitespace(location.get_text(" ", strip=True)) if location else None,
            "review_date": normalize_whitespace(date.get_text(" ", strip=True)).replace("Reviewed ", "")
            if date
            else None,
            "rating": safe_int(rating.get("content")) if rating else None,
            "tags": [t for t in tags if t],
            "review_text": review_text if review_text else None,
            "helpful_count": None,
            "review_alias": review_alias,
            "media": media,
            "nickname": None,
            "product": None,
            "verified": None,
            "upvotes": None,
            "downvotes": None,
        }

        reviews.append(entry)

    return reviews


def extract_company_meta_wh(soup: BeautifulSoup) -> dict[str, Any]:
    meta = {
        "overall_brand_rating": None,
        "total_review_count": None,
        "company_info": {},
    }

    title = soup.find("title")
    if title:
        meta["company_info"]["Page Title"] = normalize_whitespace(title.get_text(" ", strip=True))

    return meta


def extract_reviews_wh(soup: BeautifulSoup) -> list[dict[str, Any]]:
    reviews: list[dict[str, Any]] = []

    for review in soup.select("article.rvtab-citem[itemtype='http://schema.org/Review']"):
        review_id = review.get("data-rvid")
        author = review.select_one("span.rvtab-ci-name")
        nickname = review.select_one("span.rvtab-ci-nickname")
        date_meta = review.select_one("meta[itemprop=datePublished]")
        date_time = review.select_one("time.rvtab-ci-time")
        rating = review.select_one("meta[itemprop=ratingValue]")
        text = review.select_one("div.rvtab-ci-content")
        product = review.select_one("div.rvtab-ci-category span")
        verified = review.select_one("span.rvtab-ci-verified")
        upvotes = review.select_one("div.rvtab-ci-thumbs .up .span-like")
        downvotes = review.select_one("div.rvtab-ci-thumbs .dn .span-like")

        review_date = None
        if date_meta and date_meta.get("content"):
            review_date = date_meta.get("content")
        elif date_time and date_time.get("datetime"):
            review_date = date_time.get("datetime")
        elif date_time:
            review_date = normalize_whitespace(date_time.get_text(" ", strip=True))

        entry = {
            "review_id": review_id,
            "author": normalize_whitespace(author.get_text(" ", strip=True)) if author else None,
            "location": None,
            "review_date": review_date,
            "rating": safe_int(rating.get("content")) if rating else None,
            "tags": [],
            "review_text": normalize_whitespace(text.get_text(" ", strip=True)) if text else None,
            "helpful_count": None,
            "review_alias": None,
            "media": [],
            "nickname": normalize_whitespace(nickname.get_text(" ", strip=True)) if nickname else None,
            "product": normalize_whitespace(product.get_text(" ", strip=True)) if product else None,
            "verified": True if verified else False,
            "upvotes": safe_int(upvotes.get_text(" ", strip=True)) if upvotes else None,
            "downvotes": safe_int(downvotes.get_text(" ", strip=True)) if downvotes else None,
        }

        reviews.append(entry)

    return reviews


def load_ck_capture(path: str) -> dict[str, Any]:
    if not os.path.exists(path):
        print(f"[CK] Capture file not found: {path}")
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        print(f"[CK] Capture file is not valid JSON: {path}")
        return {}


def build_ck_headers(referer: str, request_headers: dict[str, str] | None) -> dict[str, str]:
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Origin": "https://www.creditkarma.com",
        "Referer": referer,
    }

    if request_headers:
        allowlist = {
            "accept",
            "ck-client-name",
            "ck-client-version",
            "ck-cookie-id",
            "ck-device-type",
            "ck-trace-id",
            "ck-unrecognized-user",
            "user-agent",
        }
        for key, value in request_headers.items():
            if key.lower() in allowlist:
                header_key = "-".join([part.capitalize() for part in key.split("-")])
                headers[header_key] = value

    return headers


def build_ck_payload(
    persisted_hash: str,
    category: str,
    review_product_id: str,
    fetch_statistics: bool,
    limit: int | None,
    offset: int | None,
    after: str | None,
    cursor: str | None,
) -> dict[str, Any]:
    variables: dict[str, Any] = {
        "category": category,
        "fetchStatistics": fetch_statistics,
        "reviewProductId": review_product_id,
    }
    if limit is not None:
        variables["limit"] = limit
    if offset is not None:
        variables["offset"] = offset
    if after is not None:
        variables["after"] = after
    if cursor is not None:
        variables["cursor"] = cursor

    return {
        "extensions": {"persistedQuery": {"sha256Hash": persisted_hash, "version": 1}},
        "operationName": "getReviews",
        "variables": variables,
    }


def fetch_ck_json(url: str, payload: dict[str, Any], headers: dict[str, str]) -> dict[str, Any]:
    offset = payload.get("variables", {}).get("offset")
    limit = payload.get("variables", {}).get("limit")
    print(f"[CK] Fetching reviews offset={offset} limit={limit} url={url}")
    req = url_request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )
    try:
        with url_request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            print(f"[CK] Response {resp.status} bytes={len(body)}")
            return json.loads(body)
    except url_error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Credit Karma API error {exc.code}: {detail[:200]}") from exc


def extract_comment_payload(data: Any) -> list[dict[str, Any]]:
    comments: list[dict[str, Any]] = []
    if not isinstance(data, dict):
        return comments
    nodes = []
    if "edges" in data and isinstance(data["edges"], list):
        for edge in data["edges"]:
            if isinstance(edge, dict) and isinstance(edge.get("node"), dict):
                nodes.append(edge["node"])
    elif "nodes" in data and isinstance(data["nodes"], list):
        nodes = [n for n in data["nodes"] if isinstance(n, dict)]

    for node in nodes:
        comments.append(
            {
                "comment_id": node.get("id"),
                "author": (node.get("user") or {}).get("screenName"),
                "comment_date": node.get("createdAt"),
                "comment_text": formatted_text_to_string(node.get("text"))
                or node.get("text"),
                "upvotes": node.get("totalUpvotes"),
                "downvotes": node.get("totalDownvotes"),
                "reply_to": node.get("replyToCommentId"),
            }
        )
    return comments


def extract_reviews_ck(edges: list[dict[str, Any]]) -> list[dict[str, Any]]:
    reviews: list[dict[str, Any]] = []
    for edge in edges:
        node = edge.get("node", {}) if isinstance(edge, dict) else {}
        if not isinstance(node, dict):
            continue
        user = node.get("user") or {}
        attributes = node.get("attributes") or {}
        comments_block = None
        for key in ("comments", "commentThread", "commentsConnection"):
            if isinstance(node.get(key), dict):
                comments_block = node.get(key)
                break
        comments = extract_comment_payload(comments_block) if comments_block else []

        entry = {
            "review_id": node.get("id"),
            "author": user.get("screenName"),
            "location": None,
            "review_date": node.get("createdAt"),
            "rating": node.get("rating"),
            "tags": [],
            "review_text": formatted_text_to_string(node.get("text")),
            "helpful_count": None,
            "review_alias": None,
            "media": [],
            "nickname": None,
            "product": None,
            "verified": None,
            "upvotes": node.get("totalUpvotes"),
            "downvotes": node.get("totalDownvotes"),
            "review_title": formatted_text_to_string(node.get("title")),
            "comments_count": node.get("totalComments"),
            "comments": comments,
            "badges": attributes.get("badges", []) if isinstance(attributes, dict) else [],
            "flags": None,
        }
        reviews.append(entry)
    return reviews


def merge_review_comments_from_calls(
    reviews: list[dict[str, Any]], calls_path: str
) -> None:
    if not os.path.exists(calls_path):
        return
    try:
        with open(calls_path, "r", encoding="utf-8") as f:
            calls = json.load(f)
    except json.JSONDecodeError:
        return

    if not isinstance(calls, list):
        return

    review_map = {review.get("review_id"): review for review in reviews}
    for call in calls:
        resp_text = call.get("response_text")
        if not resp_text:
            continue
        try:
            payload = json.loads(resp_text)
        except json.JSONDecodeError:
            continue
        data = payload.get("data")
        if not isinstance(data, dict):
            continue
        for key in ("reviewComments", "comments", "reviewCommentThread"):
            block = data.get(key)
            if not isinstance(block, dict):
                continue
            review_id = block.get("reviewId") or block.get("reviewID")
            if not review_id:
                continue
            comments = extract_comment_payload(block)
            if not comments:
                continue
            target = review_map.get(review_id)
            if not target:
                continue
            existing = target.get("comments") or []
            if isinstance(existing, list):
                target["comments"] = existing + comments


def gather_ca_files(input_dir: str) -> list[str]:
    pattern = os.path.join(input_dir, "page_*.html")
    files = glob.glob(pattern)

    def page_number(path: str) -> int:
        base = os.path.basename(path)
        match = re.search(r"page_(\d+)\.html", base)
        return int(match.group(1)) if match else 0

    return sorted(files, key=page_number)


def ensure_output_dir(path: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract reviews into a single JSON file.")
    parser.add_argument(
        "--source",
        choices=sorted(SOURCES.keys()),
        required=True,
        help="Source code (CA, WH, or CK)",
    )
    parser.add_argument("--input", default=None, help="Input file or directory")
    parser.add_argument("--output", default=None, help="Output JSON file path")
    parser.add_argument("--product-id", default=None, help="Credit Karma review product id")
    parser.add_argument("--category", default=None, help="Credit Karma category (ex: AUTO_INSURANCE)")
    parser.add_argument("--page-size", type=int, default=100, help="Credit Karma page size")
    parser.add_argument("--max-pages", type=int, default=None, help="Credit Karma max pages to fetch")
    parser.add_argument("--delay", type=float, default=0.0, help="Delay between Credit Karma requests")
    parser.add_argument("--app-id", default=None, help="App Store app id")
    parser.add_argument("--app-name", default=None, help="App Store app name")
    parser.add_argument("--storefront", default="us", help="App Store storefront (ex: us)")
    parser.add_argument(
        "--sort-modes",
        default="mostrecent,mosthelpful",
        help="App Store sort modes (comma-separated)",
    )
    parser.add_argument(
        "--comments-capture",
        default=os.path.join("sources", "credit_karma", "raw", "ck_graphql_calls.json"),
        help="Optional GraphQL capture list containing comment responses",
    )
    parser.add_argument(
        "--auto-tag",
        action="store_true",
        help="Generate tags with LM Studio after extraction",
    )
    args = parser.parse_args()

    source = SOURCES[args.source]
    input_path = args.input or source["default_input"]
    output_path = args.output or source["default_output"]

    if args.source == "CA":
        files = gather_ca_files(input_path)
        if not files:
            print(f"No page_*.html files found in {input_path}")
            return 1

        first_html = read_file(files[0])
        first_soup = BeautifulSoup(first_html, "html.parser")
        meta = extract_company_meta_ca(first_soup)

        all_reviews: list[dict[str, Any]] = []
        seen_ids: set[str] = set()

        for path in files:
            html_text = read_file(path)
            soup = BeautifulSoup(html_text, "html.parser")
            for review in extract_reviews_ca(soup):
                rid = review.get("review_id")
                if rid and rid in seen_ids:
                    continue
                if rid:
                    seen_ids.add(rid)
                all_reviews.append(review)

        output = {
            "source": args.source,
            "source_name": source["name"],
            "title": "Consumer Affairs Reviews",
            "overall_brand_rating": meta["overall_brand_rating"],
            "total_review_count": meta["total_review_count"],
            "company_info": meta["company_info"],
            "reviews": all_reviews,
        }
    elif args.source == "WH":
        html_text = read_file(input_path)
        soup = BeautifulSoup(html_text, "html.parser")
        meta = extract_company_meta_wh(soup)
        all_reviews = extract_reviews_wh(soup)

        output = {
            "source": args.source,
            "source_name": source["name"],
            "title": "WalletHub Reviews",
            "overall_brand_rating": meta["overall_brand_rating"],
            "total_review_count": meta["total_review_count"],
            "company_info": meta["company_info"],
            "reviews": all_reviews,
        }
    elif args.source == "AS":
        app_id = args.app_id or "472110881"
        app_name = args.app_name or "Toyota Financial Services"
        storefront = args.storefront or "us"
        sort_modes = [m.strip() for m in (args.sort_modes or "").split(",") if m.strip()]
        if not sort_modes:
            sort_modes = ["mostrecent", "mosthelpful"]

        reviews, feed_metadata = gather_app_store_reviews(
            app_id=app_id,
            storefront=storefront,
            sort_modes=sort_modes,
            delay=args.delay,
            max_pages=args.max_pages,
        )

        output = {
            "source": args.source,
            "source_name": source["name"],
            "title": f"Apple App Store Reviews - {app_name}",
            "overall_brand_rating": None,
            "total_review_count": len(reviews),
            "company_info": {
                "app_name": app_name,
                "app_id": app_id,
                "storefront": storefront,
                "app_store_url": f"https://apps.apple.com/{storefront}/app/id{app_id}",
            },
            "reviews": reviews,
            "metadata": {
                "apple_feeds": feed_metadata,
                "sort_modes": sort_modes,
            },
        }
    else:
        capture = load_ck_capture(input_path)
        post_data = {}
        if capture.get("request_post_data"):
            try:
                post_data = json.loads(capture["request_post_data"])
            except json.JSONDecodeError:
                post_data = {}

        variables = post_data.get("variables", {}) if isinstance(post_data, dict) else {}
        persisted = post_data.get("extensions", {}).get("persistedQuery", {}) if post_data else {}

        persisted_hash = persisted.get(
            "sha256Hash",
            "811df42c1aea633e1f56cecb8e5e815249a179f522447feacb54d2386289b627",
        )
        review_product_id = args.product_id or variables.get("reviewProductId") or "toyota-financial-services5"
        category = args.category or variables.get("category") or "AUTO_INSURANCE"
        fetch_statistics = bool(variables.get("fetchStatistics", True))

        referer = f"https://www.creditkarma.com/reviews/auto-loan/single/id/{review_product_id}"
        headers = build_ck_headers(
            referer=referer,
            request_headers=capture.get("request_headers", {}) or {},
        )
        print(
            "[CK] Using persisted hash, product id, category:",
            persisted_hash,
            review_product_id,
            category,
        )

        all_reviews: list[dict[str, Any]] = []
        seen_ids: set[str] = set()
        total_count = None
        statistics = {}
        review_page_attributes = {}
        helpful_reviews = {}

        url = capture.get("url") or "https://api.creditkarma.com/graphql"
        offset = 0
        pagination_mode = "offset"
        seen_cursors: set[str] = set()
        last_cursor = None
        page_size = max(1, args.page_size)
        page_count = 0
        consecutive_no_new = 0
        seen_requests: set[tuple[str, int | None, str | None]] = set()

        while True:
            request_key = (
                pagination_mode,
                offset if pagination_mode == "offset" else None,
                last_cursor if pagination_mode == "cursor" else None,
            )
            if request_key in seen_requests:
                print("[CK] Pagination request already seen; stopping to avoid loop")
                break
            seen_requests.add(request_key)
            payload = build_ck_payload(
                persisted_hash=persisted_hash,
                category=category,
                review_product_id=review_product_id,
                fetch_statistics=fetch_statistics,
                limit=page_size,
                offset=offset if pagination_mode == "offset" else None,
                after=last_cursor if pagination_mode == "cursor" else None,
                cursor=None,
            )
            response = fetch_ck_json(url, payload, headers)
            reviews_root = response.get("data", {}).get("reviews", {})
            reviews_block = reviews_root.get("reviews", {}) if isinstance(reviews_root, dict) else {}
            edges = reviews_block.get("edges", []) if isinstance(reviews_block, dict) else []
            print(f"[CK] Received edges={len(edges)} total_so_far={len(all_reviews)}")

            if not statistics and isinstance(reviews_block, dict):
                statistics = reviews_block.get("statistics", {}) or {}
            if not review_page_attributes and isinstance(reviews_root, dict):
                review_page_attributes = reviews_root.get("reviewPageAttributes", {}) or {}
            if not helpful_reviews and isinstance(reviews_root, dict):
                helpful_reviews = reviews_root.get("helpfulReviews", {}) or {}

            total_count = total_count or reviews_block.get("totalCount")

            new_count = 0
            for review in extract_reviews_ck(edges):
                rid = review.get("review_id")
                if rid and rid in seen_ids:
                    continue
                if rid:
                    seen_ids.add(rid)
                all_reviews.append(review)
                new_count += 1

            if edges and isinstance(edges[-1], dict):
                last_cursor = edges[-1].get("cursor") or last_cursor
                if last_cursor:
                    if last_cursor in seen_cursors:
                        print("[CK] Cursor already seen; stopping to avoid loop")
                        break
                    seen_cursors.add(last_cursor)

            if new_count == 0 and edges:
                consecutive_no_new += 1
                if pagination_mode == "offset" and last_cursor:
                    pagination_mode = "cursor"
                    print("[CK] Switching to cursor-based pagination")
                else:
                    pagination_mode = "offset"
                    offset += page_size
                    print("[CK] No new reviews; advancing offset")
                if consecutive_no_new >= 2:
                    print("[CK] No new reviews after multiple attempts; stopping")
                    break
            else:
                consecutive_no_new = 0

            page_info = reviews_block.get("pageInfo", {}) if isinstance(reviews_block, dict) else {}
            has_next = page_info.get("hasNextPage")
            page_count += 1
            print(f"[CK] Page {page_count} has_next={has_next} total_reviews={len(all_reviews)}")
            if args.max_pages and page_count >= args.max_pages:
                print("[CK] Stopping due to max-pages")
                break
            if not has_next or not edges:
                print("[CK] Stopping due to no next page or empty edges")
                break
            if total_count is not None and len(all_reviews) >= total_count:
                print("[CK] Stopping because total count reached")
                break
            if pagination_mode == "offset":
                offset += page_size
            if args.delay > 0:
                print(f"[CK] Sleeping for {args.delay} seconds")
                time.sleep(args.delay)

        merge_review_comments_from_calls(all_reviews, args.comments_capture)

        output = {
            "source": args.source,
            "source_name": source["name"],
            "title": "Credit Karma Reviews",
            "overall_brand_rating": statistics.get("overallRating"),
            "total_review_count": total_count,
            "company_info": {},
            "statistics": statistics,
            "review_page_attributes": review_page_attributes,
            "helpful_reviews": helpful_reviews,
            "reviews": all_reviews,
        }

    ensure_output_dir(output_path)
    output = normalize_output(output, source_hint=args.source)
    if args.auto_tag:
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
        reviews = output.get("reviews") if isinstance(output, dict) else None
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
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(output['reviews'])} reviews to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
