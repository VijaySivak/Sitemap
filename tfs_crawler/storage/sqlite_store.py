import sqlite3
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Any

class SqliteStore:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = None
        self.cursor = None
        self._init_db()

    def _init_db(self):
        """Initialize the database connection and schema."""
        # Ensure the directory exists
        Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
        
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()
        
        # Enable foreign keys
        self.cursor.execute("PRAGMA foreign_keys = ON;")
        
        self._create_tables()

    def _create_tables(self):
        """Create necessary tables if they don't exist."""
        
        # Documents table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                url TEXT PRIMARY KEY,
                canonical_url TEXT,
                status TEXT,
                depth_from_seed INTEGER,
                url_path TEXT,
                content_type TEXT,
                local_artifact_paths TEXT, -- JSON
                crawled_at TIMESTAMP,
                error_message TEXT,
                meta_tags TEXT -- JSON
            )
        """)
        
        # FAQ Items table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS faq_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                document_url TEXT,
                question_text TEXT,
                answer_text TEXT,
                answer_raw_html TEXT,
                answer_mode TEXT,
                link_depth_to_answer INTEGER,
                FOREIGN KEY (document_url) REFERENCES documents(url)
            )
        """)
        
        # Link Edges table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS link_edges (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                parent_url TEXT,
                child_url TEXT,
                anchor_text TEXT,
                is_external BOOLEAN,
                canonical_child_url TEXT,
                FOREIGN KEY (parent_url) REFERENCES documents(url)
            )
        """)
        
        # Assets table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS assets (
                asset_url TEXT PRIMARY KEY,
                source_page_url TEXT,
                asset_type TEXT,
                local_path TEXT,
                FOREIGN KEY (source_page_url) REFERENCES documents(url)
            )
        """)
        
        # External Links Global Registry
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS external_links_global (
                url TEXT PRIMARY KEY,
                first_seen_at TIMESTAMP
            )
        """)
        
        # External Domains Global Registry
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS external_domains_global (
                domain TEXT PRIMARY KEY,
                first_seen_at TIMESTAMP
            )
        """)
        
        # Crawl Queue (for resumability)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS crawl_queue (
                url TEXT PRIMARY KEY,
                depth INTEGER,
                parent_url TEXT,
                status TEXT DEFAULT 'pending', -- pending, processing, completed, failed, skipped
                added_at TIMESTAMP,
                priority INTEGER DEFAULT 0
            )
        """)
        
        # Crawl State (Key-Value store for global metadata)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS crawl_state (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        """)
        
        # FTS5 Virtual Table for searchable extracted text
        # Using separate table to avoid complexity with raw content updates if not needed frequently,
        # but spec says "FTS5 table(s) for searchable extracted text".
        # We'll index content from documents (if we stored full text there) or link it.
        # Since we are storing raw artifacts on disk, we might want to store extracted text here for search.
        self.cursor.execute("""
            CREATE VIRTUAL TABLE IF NOT EXISTS documents_fts USING fts5(
                url UNINDEXED,
                title,
                content
            )
        """)

        self.conn.commit()

    def close(self):
        if self.conn:
            self.conn.close()

    # --- Documents ---
    def upsert_document(self, doc_data: Dict[str, Any]):
        """Insert or update a document."""
        query = """
            INSERT INTO documents (
                url, canonical_url, status, depth_from_seed, url_path, 
                content_type, local_artifact_paths, crawled_at, error_message, meta_tags
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(url) DO UPDATE SET
                canonical_url=excluded.canonical_url,
                status=excluded.status,
                depth_from_seed=excluded.depth_from_seed,
                url_path=excluded.url_path,
                content_type=excluded.content_type,
                local_artifact_paths=excluded.local_artifact_paths,
                crawled_at=excluded.crawled_at,
                error_message=excluded.error_message,
                meta_tags=excluded.meta_tags
        """
        self.cursor.execute(query, (
            doc_data['url'],
            doc_data.get('canonical_url'),
            doc_data.get('status'),
            doc_data.get('depth_from_seed'),
            doc_data.get('url_path'),
            doc_data.get('content_type'),
            json.dumps(doc_data.get('local_artifact_paths', {})),
            doc_data.get('crawled_at', datetime.now().isoformat()),
            doc_data.get('error_message'),
            json.dumps(doc_data.get('meta_tags', {}))
        ))
        self.conn.commit()
        
        # Update FTS
        content = doc_data.get('extracted_text', '')
        if content:
             self.cursor.execute("""
                INSERT INTO documents_fts (url, title, content) 
                VALUES (?, ?, ?)
            """, (doc_data['url'], doc_data.get('title', ''), content))
             self.conn.commit()

    def get_document(self, url: str) -> Optional[Dict[str, Any]]:
        self.cursor.execute("SELECT * FROM documents WHERE url = ?", (url,))
        row = self.cursor.fetchone()
        if row:
            d = dict(row)
            d['local_artifact_paths'] = json.loads(d['local_artifact_paths']) if d['local_artifact_paths'] else {}
            d['meta_tags'] = json.loads(d['meta_tags']) if d['meta_tags'] else {}
            return d
        return None

    # --- FAQ Items ---
    def add_faq_items(self, items: List[Dict[str, Any]]):
        if not items:
            return
        query = """
            INSERT INTO faq_items (
                document_url, question_text, answer_text, answer_raw_html, 
                answer_mode, link_depth_to_answer
            ) VALUES (?, ?, ?, ?, ?, ?)
        """
        data = [
            (
                i['document_url'], i['question_text'], i['answer_text'], 
                i.get('answer_raw_html'), i.get('answer_mode'), i.get('link_depth_to_answer')
            ) for i in items
        ]
        self.cursor.executemany(query, data)
        self.conn.commit()

    # --- Link Edges ---
    def add_link_edges(self, edges: List[Dict[str, Any]]):
        if not edges:
            return
        query = """
            INSERT INTO link_edges (
                parent_url, child_url, anchor_text, is_external, canonical_child_url
            ) VALUES (?, ?, ?, ?, ?)
        """
        data = [
            (
                e['parent_url'], e['child_url'], e.get('anchor_text'), 
                e.get('is_external', False), e.get('canonical_child_url')
            ) for e in edges
        ]
        self.cursor.executemany(query, data)
        self.conn.commit()

    # --- Assets ---
    def add_asset(self, asset_data: Dict[str, Any]):
        query = """
            INSERT INTO assets (asset_url, source_page_url, asset_type, local_path)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(asset_url) DO UPDATE SET
                source_page_url=excluded.source_page_url,
                asset_type=excluded.asset_type,
                local_path=excluded.local_path
        """
        self.cursor.execute(query, (
            asset_data['asset_url'],
            asset_data['source_page_url'],
            asset_data['asset_type'],
            asset_data['local_path']
        ))
        self.conn.commit()

    # --- External Registries ---
    def register_external_url(self, url: str):
        self.cursor.execute("""
            INSERT OR IGNORE INTO external_links_global (url, first_seen_at)
            VALUES (?, ?)
        """, (url, datetime.now().isoformat()))
        self.conn.commit()

    def register_external_domain(self, domain: str):
        self.cursor.execute("""
            INSERT OR IGNORE INTO external_domains_global (domain, first_seen_at)
            VALUES (?, ?)
        """, (domain, datetime.now().isoformat()))
        self.conn.commit()

    # --- Queue Management ---
    def queue_url(self, url: str, depth: int, parent_url: Optional[str] = None, priority: int = 0):
        """Add a URL to the crawl queue if it doesn't exist."""
        try:
            self.cursor.execute("""
                INSERT OR IGNORE INTO crawl_queue (url, depth, parent_url, status, added_at, priority)
                VALUES (?, ?, ?, 'pending', ?, ?)
            """, (url, depth, parent_url, datetime.now().isoformat(), priority))
            self.conn.commit()
        except sqlite3.Error as e:
            logging.error(f"Error queueing URL {url}: {e}")

    def get_next_url(self) -> Optional[Dict[str, Any]]:
        """Get the next pending URL from the queue, ordered by priority and time."""
        # Simple FIFO with priority
        self.cursor.execute("""
            SELECT * FROM crawl_queue 
            WHERE status = 'pending' 
            ORDER BY priority DESC, added_at ASC 
            LIMIT 1
        """)
        row = self.cursor.fetchone()
        if row:
            return dict(row)
        return None

    def update_queue_status(self, url: str, status: str):
        self.cursor.execute("""
            UPDATE crawl_queue SET status = ? WHERE url = ?
        """, (status, url))
        self.conn.commit()

    def is_url_visited_or_queued(self, url: str) -> bool:
        """Check if URL is already known (in queue or documents)."""
        # Check documents (visited)
        self.cursor.execute("SELECT 1 FROM documents WHERE url = ?", (url,))
        if self.cursor.fetchone():
            return True
        
        # Check queue
        self.cursor.execute("SELECT 1 FROM crawl_queue WHERE url = ?", (url,))
        if self.cursor.fetchone():
            return True
            
        return False
    
    def get_queue_counts(self) -> Dict[str, int]:
        self.cursor.execute("SELECT status, COUNT(*) FROM crawl_queue GROUP BY status")
        return dict(self.cursor.fetchall())

