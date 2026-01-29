#!/usr/bin/env python3
import html
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

TARGET_URL = "https://consumeraffairs.com/finance/toyota-financial-services.html"


def fetch_html(url: str) -> str:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=15) as resp:
        charset = resp.headers.get_content_charset() or "utf-8"
        return resp.read().decode(charset, errors="replace")


def inject_base(html_text: str, base_href: str) -> str:
    base_tag = f"<base href=\"{html.escape(base_href, quote=True)}\">"
    lower = html_text.lower()
    head_idx = lower.find("<head")
    if head_idx != -1:
        # Insert base right after <head...>
        start = lower.find(">", head_idx)
        if start != -1:
            return html_text[: start + 1] + base_tag + html_text[start + 1 :]
    # Fallback: prepend
    return base_tag + html_text


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path.startswith("/raw"):
                content = fetch_html(TARGET_URL)
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write(content.encode("utf-8"))
                return

            content = fetch_html(TARGET_URL)
            content = inject_base(content, TARGET_URL)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(content.encode("utf-8"))
        except HTTPError as e:
            self.send_error(e.code, e.reason)
        except URLError as e:
            self.send_error(502, f"Upstream error: {e}")
        except Exception as e:
            self.send_error(500, f"Server error: {e}")


def pick_port(host: str, ports):
    for p in ports:
        try:
            httpd = HTTPServer((host, p), Handler)
            return httpd, p
        except OSError:
            continue
    raise OSError("No available ports in list")


if __name__ == "__main__":
    host = "127.0.0.1"
    preferred = [8000, 8080, 8888, 3000, 5000]
    httpd, port = pick_port(host, preferred)
    print(f"Serving proxy at http://{host}:{port} -> {TARGET_URL}")
    httpd.serve_forever()
