import logging
import os
import time
import requests
from datetime import datetime
from typing import List, Dict, Optional
from urllib.parse import urlparse
import mimetypes

from sitemap_crawler.storage.sqlite_store import SqliteStore
from sitemap_crawler.crawler.fetcher import Fetcher
from sitemap_crawler.crawler.robots import RobotsParser
from sitemap_crawler.crawler.canonicalization import canonicalize_url, get_domain
from sitemap_crawler.extractors.faq_extractor import FAQExtractor
from sitemap_crawler.extractors.document_extractor import DocumentExtractor
from sitemap_crawler.extractors.html_processor import get_soup, extract_links
from sitemap_crawler.utils import generate_deterministic_filename, ensure_directory

logger = logging.getLogger(__name__)

class Crawler:
    def __init__(self, config: Dict):
        self.config = config
        self.store = SqliteStore(config['db_path'])
        self.fetcher = Fetcher(config)
        self.robots = RobotsParser(config['user_agent'], config.get('robots_enabled', True))
        self.faq_extractor = FAQExtractor()
        self.doc_extractor = DocumentExtractor(config)
        
        self.allowed_domains = set(config['allowed_domains'])
        self.max_depth_faq = config['max_depth_faq']
        self.max_depth_general = config['max_depth_general']
        self.excluded_sections = config.get('excluded_sitemap_sections', [])
        self.content_type_allowlist = config.get('content_type_allowlist', [])
        
        self.output_dirs = config['output_directories']
        for path in self.output_dirs.values():
            ensure_directory(path)

    def start(self):
        """Initializes the crawl by seeding URLs."""
        for url in self.config['seed_urls']:
            if not self.store.is_url_visited_or_queued(url):
                self.store.queue_url(url, depth=0, priority=100)
        
        logger.info("Crawl initialized. Starting loop...")
        self.run_loop()

    def run_loop(self):
        """Main crawl loop."""
        while True:
            item = self.store.get_next_url()
            if not item:
                logger.info("Queue empty. Crawl finished.")
                break
                
            url = item['url']
            depth = item['depth']
            parent_url = item['parent_url']
            
            logger.info(f"Processing: {url} (Depth: {depth})")
            self.store.update_queue_status(url, 'processing')
            
            try:
                self.process_url(url, depth, parent_url)
                self.store.update_queue_status(url, 'completed')
            except Exception as e:
                logger.exception(f"Failed to process {url}")
                self.store.update_queue_status(url, 'failed')
                # Update document error if possible
                self.store.upsert_document({
                    'url': url,
                    'status': 'ERROR',
                    'error_message': str(e),
                    'crawled_at': None # Keep null or set time?
                })

    def process_url(self, url: str, depth: int, parent_url: Optional[str]):
        # 1. Check robots.txt
        if not self.robots.can_fetch(url):
            logger.warning(f"Blocked by robots.txt: {url}")
            self.store.upsert_document({
                'url': url,
                'status': 'BLOCKED_BY_ROBOTS',
                'depth_from_seed': depth
            })
            return

        # 2. Domain check (double check)
        domain = get_domain(url)
        if domain not in self.allowed_domains:
            # Should have been filtered before queueing, but safety net
            logger.info(f"Skipping external domain: {url}")
            return

        # 3. Policy check (Accounts/Payments/IR)
        for section in self.excluded_sections:
            # Simple keyword check in path or text? Spec says "sitemap headings".
            # Mapping URL structure to these headings is heuristic if not explicit.
            # Assuming URL path components reflect structure.
            if section.lower().replace(' ', '') in url.lower().replace('-', ''):
                 logger.info(f"Skipping excluded section {section}: {url}")
                 self.store.upsert_document({
                    'url': url,
                    'status': 'SKIPPED_BY_POLICY',
                    'depth_from_seed': depth
                })
                 return

        # 4. Fetch
        # Check if it's likely a binary file based on extension first to decide handling
        # But we need Content-Type header to be sure.
        # Fetcher handles simple GET.
        response, error = self.fetcher.fetch(url)
        
        if error:
            self.store.upsert_document({
                'url': url,
                'status': 'FETCH_ERROR',
                'error_message': error,
                'depth_from_seed': depth
            })
            return
            
        status_code = response.status_code
        if status_code != 200:
            self.store.upsert_document({
                'url': url,
                'status': f"HTTP_{status_code}",
                'depth_from_seed': depth
            })
            return
            
        content_type = response.headers.get('Content-Type', '').split(';')[0].strip()
        
        # 5. Content Type Validation
        if self.content_type_allowlist and content_type not in self.content_type_allowlist:
            logger.info(f"Skipping unsupported content type {content_type}: {url}")
            self.store.upsert_document({
                'url': url,
                'status': 'UNSUPPORTED_TYPE',
                'content_type': content_type,
                'depth_from_seed': depth
            })
            return

        # 6. Save Artifacts & Process
        # Upsert document initially to satisfy FK constraints for children/FAQs
        doc_data = {
            'url': url,
            'canonical_url': canonicalize_url(url),
            'status': 'CRAWLED', # Will be updated if error occurs during content processing?
            'depth_from_seed': depth,
            'url_path': urlparse(url).path,
            'content_type': content_type,
            'local_artifact_paths': {},
            'crawled_at': datetime.now().isoformat()
        }
        self.store.upsert_document(doc_data)
        
        try:
            if 'text/html' in content_type:
                self._handle_html(url, response, doc_data, depth)
            elif 'application/pdf' in content_type:
                self._handle_pdf(url, response, doc_data)
            elif 'video' in content_type or 'audio' in content_type:
                self._handle_media(url, response, doc_data)
            else:
                # Fallback for other allowed types if any
                pass
        except Exception as e:
            logger.error(f"Error processing content for {url}: {e}")
            doc_data['status'] = 'PROCESSING_ERROR'
            doc_data['error_message'] = str(e)
            
        # Final upsert with updated data (artifacts paths, extracted text, etc)
        self.store.upsert_document(doc_data)


    def _handle_html(self, url: str, response: requests.Response, doc_data: Dict, depth: int):
        html_content = response.text
        
        # Save Raw HTML
        filename = generate_deterministic_filename(url, '.html')
        filepath = os.path.join(self.output_dirs['html'], filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        doc_data['local_artifact_paths']['html'] = filepath
        
        # Extract Content
        extracted = self.doc_extractor.extract_content(html_content, url)
        doc_data['extracted_text'] = extracted['extracted_text']
        doc_data['title'] = extracted['title']
        
        # Save Markdown
        md_filename = generate_deterministic_filename(url, '.md')
        md_filepath = os.path.join(self.output_dirs['md'], md_filename)
        with open(md_filepath, 'w', encoding='utf-8') as f:
            f.write(extracted['markdown_content'])
        doc_data['local_artifact_paths']['md'] = md_filepath
        
        # Parse for Links & FAQs
        soup = get_soup(html_content)
        
        # FAQ Extraction
        # Spec implies "FAQ-structured pages". Heuristic detection? 
        # Or just try extraction on all pages and see if we get structured FAQs?
        # The spec says "extract FAQs where applicable".
        # We also need to decide depth limit based on FAQ vs General.
        # Simple logic: If page has FAQs, treat as FAQ page? 
        # But depth is for traversal. 
        # The spec says: "For FAQ-structured pages: allow exploration up to max_depth_faq... For non-FAQ pages: ... max_depth_general"
        # This implies we determine page type BEFORE deciding where to crawl next?
        # Or does it mean "If this page IS an FAQ page, we crawl its children up to depth 6"?
        # Or "If we are exploring a path looking for FAQs, we go deeper"?
        # Usually it means if the CURRENT page is an FAQ page, we might dig deeper, or if we are ON an FAQ trail.
        # Given the ambiguity, and "sitemap page as the only seed", we treat the sitemap as depth 0.
        # If we are on an FAQ page, we might relax the depth limit for its children?
        # Let's assume: If the current page contains FAQs, we consider it an "FAQ Context".
        # However, usually depth limits are global or per-seed. 
        # Let's implement: Default limit is 3. If we find FAQs, we might not stop there? 
        # Actually, maybe it means: "If we are at depth 3 and it's a general page, stop. If it's an FAQ page, we can go to depth 6."
        
        faqs = self.faq_extractor.extract(soup, url)
        is_faq_page = len(faqs) > 0
        
        if faqs:
            self.store.add_faq_items(faqs)
            
        doc_data['meta_tags'] = {'is_faq_page': is_faq_page}

        # Link Extraction & Queueing
        links = extract_links(soup, url)
        edges = []
        
        # Determine max depth for THIS page's children
        # If this page is FAQ page, maybe we allow going deeper? 
        # Or is it based on the child? We don't know child type yet.
        # "For FAQ-structured pages: allow exploration up to max_depth_faq"
        # This likely means if the current page is an FAQ page, its children are allowed to be at depth+1 up to 6.
        # If current page is NOT FAQ, its children are allowed up to 3.
        # This is a bit tricky if an FAQ page is at depth 4 (reached from general->general->general->faq).
        # Let's stick to: effective_max_depth = max_depth_faq if is_faq_page else max_depth_general
        # But wait, if I am at depth 3 (general), I can't go to depth 4 unless I was allowed to.
        # So I stop at depth 3 general.
        # If I am at depth 3 (FAQ), I can go to depth 4.
        
        effective_limit = self.max_depth_faq if is_faq_page else self.max_depth_general
        
        for link in links:
            child_url = link['url']
            anchor_text = link['text']
            
            # Record Edge
            canonical_child = canonicalize_url(child_url)
            child_domain = get_domain(child_url)
            is_external = child_domain not in self.allowed_domains
            
            edges.append({
                'parent_url': url,
                'child_url': child_url,
                'anchor_text': anchor_text,
                'is_external': is_external,
                'canonical_child_url': canonical_child
            })
            
            if is_external:
                self.store.register_external_url(child_url)
                self.store.register_external_domain(child_domain)
            else:
                # Internal Link -> Queue
                # Enforce depth
                next_depth = depth + 1
                if next_depth <= effective_limit:
                    if not self.store.is_url_visited_or_queued(canonical_child):
                        self.store.queue_url(canonical_child, next_depth, parent_url=url)
        
        self.store.add_link_edges(edges)

    def _handle_pdf(self, url: str, response: requests.Response, doc_data: Dict):
        filename = generate_deterministic_filename(url, '.pdf')
        filepath = os.path.join(self.output_dirs['pdf'], filename)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
            
        doc_data['local_artifact_paths']['pdf'] = filepath
        
        # Text extraction (placeholder or use pypdf if installed)
        # Spec says "Extract full text".
        try:
            from pypdf import PdfReader
            reader = PdfReader(filepath)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            
            txt_filename = generate_deterministic_filename(url, '.txt')
            txt_filepath = os.path.join(self.output_dirs['pdf_text'], txt_filename)
            with open(txt_filepath, 'w', encoding='utf-8') as f:
                f.write(text)
                
            doc_data['extracted_text'] = text
            doc_data['local_artifact_paths']['pdf_text'] = txt_filepath
        except Exception as e:
            logger.warning(f"Failed to extract PDF text for {url}: {e}")
            doc_data['error_message'] = f"PDF extraction failed: {e}"

        # Register as asset
        self.store.add_asset({
            'asset_url': url,
            'source_page_url': url, # Self-referenced or from parent?
            # Actually assets are usually discovered via links. 
            # If we crawled this URL as a document, it is a document. 
            # But the spec says "link to asset entries". 
            # If we treat PDF as a document, it's in documents table.
            # If we treat it as an asset, it's in assets table.
            # Spec: "documents ... assets (pdf/video ... with source page url linkage)"
            # Since we have "documents" table for everything we crawl, maybe we duplicate or just use documents?
            # "documents ... content_type" covers it.
            # "assets" table might be for non-crawled assets or just a convenience view?
            # Or maybe "Download and save linked PDFs" implies we don't "crawl" them as pages but download them as assets of a page?
            # But BFS crawl usually treats links as nodes.
            # Let's put it in assets table too for compliance.
            # Problem: We don't know the source page easily here if it came from queue. 
            # We know 'parent_url' passed to process_url.
            'asset_type': 'pdf',
            'local_path': filepath
        })

    def _handle_media(self, url: str, response: requests.Response, doc_data: Dict):
        # Spec: "Try subtitles first; else local STT... If video/audio can’t be downloaded: record VIDEO_UNAVAILABLE"
        # This implies we try to download.
        # Simple implementation: save bytes.
        ext = mimetypes.guess_extension(doc_data['content_type']) or '.bin'
        filename = generate_deterministic_filename(url, ext)
        filepath = os.path.join(self.output_dirs['video'], filename)
        
        try:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            doc_data['local_artifact_paths']['video'] = filepath
            
            self.store.add_asset({
                'asset_url': url,
                'source_page_url': url, # See PDF note
                'asset_type': 'video',
                'local_path': filepath
            })
        except Exception as e:
            logger.warning(f"Failed to save video {url}: {e}")
            doc_data['status'] = 'VIDEO_UNAVAILABLE'
            doc_data['error_message'] = str(e)

