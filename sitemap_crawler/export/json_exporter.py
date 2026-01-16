import json
import logging
import os
from pathlib import Path
from typing import Dict, List, Any
from sitemap_crawler.storage.sqlite_store import SqliteStore

logger = logging.getLogger(__name__)

class JsonExporter:
    def __init__(self, config: Dict):
        self.db_path = config['db_path']
        self.output_dir = config['output_directories']['json']
        self.store = SqliteStore(self.db_path)
        
        # Ensure output directory exists
        Path(self.output_dir).mkdir(parents=True, exist_ok=True)

    def export_all(self):
        """Runs all exports."""
        logger.info("Starting JSON export...")
        self.export_documents()
        self.export_faq_items()
        self.export_link_edges()
        self.export_assets()
        self.export_external_urls()
        self.export_external_domains()
        logger.info("JSON export completed.")

    def _write_jsonl(self, filename: str, query: str):
        path = os.path.join(self.output_dir, filename)
        logger.info(f"Exporting to {path}")
        
        cursor = self.store.conn.cursor()
        cursor.execute(query)
        
        with open(path, 'w', encoding='utf-8') as f:
            while True:
                rows = cursor.fetchmany(1000)
                if not rows:
                    break
                for row in rows:
                    # Convert row to dict
                    item = dict(row)
                    # Handle JSON fields if any explicitly needed or just dump
                    # SQLite Row factory is used in store, but here we might get Row objects.
                    # dict(row) works with sqlite3.Row
                    
                    # Parse internal JSON strings back to objects if they are stored as strings in DB
                    # documents table has local_artifact_paths and meta_tags as JSON text
                    if 'local_artifact_paths' in item and isinstance(item['local_artifact_paths'], str):
                        try:
                            item['local_artifact_paths'] = json.loads(item['local_artifact_paths'])
                        except:
                            pass
                    if 'meta_tags' in item and isinstance(item['meta_tags'], str):
                         try:
                            item['meta_tags'] = json.loads(item['meta_tags'])
                         except:
                            pass
                            
                    f.write(json.dumps(item) + '\n')

    def _write_json(self, filename: str, query: str):
        path = os.path.join(self.output_dir, filename)
        logger.info(f"Exporting to {path}")
        
        cursor = self.store.conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        
        data = [dict(row) for row in rows]
        
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def export_documents(self):
        self._write_jsonl('documents.jsonl', "SELECT * FROM documents")

    def export_faq_items(self):
        self._write_jsonl('faq_items.jsonl', "SELECT * FROM faq_items")

    def export_link_edges(self):
        self._write_jsonl('link_edges.jsonl', "SELECT * FROM link_edges")

    def export_assets(self):
        self._write_jsonl('assets.jsonl', "SELECT * FROM assets")

    def export_external_urls(self):
        self._write_json('external_urls.json', "SELECT * FROM external_links_global")

    def export_external_domains(self):
        self._write_json('external_domains.json', "SELECT * FROM external_domains_global")
