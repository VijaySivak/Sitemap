#!/usr/bin/env python3
import argparse
import hashlib
import html
import os
import sys
import tempfile
import time
import webbrowser
from http.cookiejar import CookieJar
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit, urlunsplit, parse_qsl
from urllib.request import Request, build_opener, HTTPCookieProcessor

DEFAULT_URL = "https://www.consumeraffairs.com/finance/toyota-financial-services.html"


def request_headers(referer: str | None = None) -> dict[str, str]:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Upgrade-Insecure-Requests": "1",
        "DNT": "1",
        "Connection": "close",
    }
    if referer:
        headers["Referer"] = referer
    return headers


def fetch_html(
    opener, url: str, referer: str | None = None, retries: int = 2
) -> str:
    last_err: Exception | None = None
    for attempt in range(retries + 1):
        try:
            req = Request(url, headers=request_headers(referer))
            with opener.open(req, timeout=20) as resp:
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


def inject_base(html_text: str, base_href: str) -> str:
    base_tag = f"<base href=\"{html.escape(base_href, quote=True)}\">"
    lower = html_text.lower()
    head_idx = lower.find("<head")
    if head_idx != -1:
        end = lower.find(">", head_idx)
        if end != -1:
            return html_text[: end + 1] + base_tag + html_text[end + 1 :]
    return base_tag + html_text


def write_temp_html(html_text: str) -> str:
    fd, path = tempfile.mkstemp(suffix=".html", prefix="page_")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(html_text)
    return path


def detect_browser_path() -> str | None:
    if os.name != "nt":
        return None
    candidates = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\BraveSoftware\Brave-Browser\Application\brave.exe"),
    ]
    for path in candidates:
        if os.path.isfile(path):
            return path
    return None


def open_in_browser(path: str, browser_path: str | None) -> None:
    file_url = f"file://{path}"
    resolved = browser_path or detect_browser_path()
    if resolved:
        name = "custom-browser"
        webbrowser.register(name, None, webbrowser.BackgroundBrowser(resolved))
        webbrowser.get(name).open_new_tab(file_url)
        return
    webbrowser.open_new_tab(file_url)


def page_url(base_url: str, page: int) -> str:
    parts = urlsplit(base_url)
    query = dict(parse_qsl(parts.query))
    if page <= 1:
        query.pop("page", None)
    else:
        query["page"] = str(page)
    if page > 1:
        fragment = "scroll_to_reviews=true"
    else:
        fragment = parts.fragment
    new_query = urlencode(query, doseq=True)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, new_query, fragment))


def download_pages(
    opener, base_url: str, out_dir: str, max_pages: int, delay: float
) -> int:
    os.makedirs(out_dir, exist_ok=True)
    seen_hashes: set[str] = set()
    downloaded = 0

    for page in range(1, max_pages + 1):
        url = page_url(base_url, page)
        try:
            print(f"[download] fetching page {page}: {url}")
            html_text = fetch_html(opener, url, referer=base_url, retries=3)
        except HTTPError as e:
            print(f"[download] HTTP error on page {page}: {e.code} {e.reason}")
            if e.code == 404:
                break
            raise
        except URLError as e:
            print(f"[download] URL error on page {page}: {e}")
            raise
        content_hash = hashlib.sha256(html_text.encode("utf-8")).hexdigest()
        if content_hash in seen_hashes:
            print(f"[download] duplicate content at page {page}, stopping")
            break
        seen_hashes.add(content_hash)

        filename = os.path.join(out_dir, f"page_{page}.html")
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html_text)
        downloaded += 1
        print(f"[download] saved {filename}")
        time.sleep(delay)

    return downloaded


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download ConsumerAffairs reviews HTML."
    )
    parser.add_argument("--url", default=DEFAULT_URL, help="URL to fetch")
    parser.add_argument(
        "--save",
        default=os.path.join("sources", "consumer_affairs", "raw", "fetched.html"),
        help="File to save raw HTML",
    )
    parser.add_argument("--browser", default=None, help="Path to browser executable (avoids OS picker)")
    parser.add_argument("--no-open", action="store_true", help="Do not open the browser")
    parser.add_argument("--download-all", action="store_true", help="Download all paginated pages")
    parser.add_argument(
        "--out-dir",
        default=os.path.join("sources", "consumer_affairs", "raw"),
        help="Directory for downloaded pages",
    )
    parser.add_argument("--max-pages", type=int, default=50, help="Max pages to attempt")
    parser.add_argument("--delay", type=float, default=1.0, help="Delay between downloads (seconds)")
    args = parser.parse_args()

    cookie_jar = CookieJar()
    opener = build_opener(HTTPCookieProcessor(cookie_jar))

    try:
        # Warm up cookies to reduce 403s on some sites.
        try:
            print(f"[fetch] warm-up: {args.url}")
            fetch_html(opener, args.url, referer=None, retries=1)
        except Exception as e:
            print(f"[fetch] warm-up failed: {e}")
        print(f"[fetch] fetching main page: {args.url}")
        raw_html = fetch_html(opener, args.url, referer=None, retries=3)
    except (HTTPError, URLError) as e:
        print(f"Failed to fetch: {e}", file=sys.stderr)
        return 1

    with open(args.save, "w", encoding="utf-8") as f:
        f.write(raw_html)

    view_html = inject_base(raw_html, args.url)
    temp_path = write_temp_html(view_html)

    print(f"Saved raw HTML to: {args.save}")
    if not args.no_open:
        open_in_browser(temp_path, args.browser)
        print(f"Opened browser with: {temp_path}")

    if args.download_all:
        count = download_pages(opener, args.url, args.out_dir, args.max_pages, args.delay)
        print(f"Downloaded {count} page(s) to: {args.out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
