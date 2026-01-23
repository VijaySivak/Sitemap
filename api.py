import logging
import sqlite3
import pandas as pd
from typing import List, Dict, Any
import os
import json
import io
import csv
from urllib.parse import urlparse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Sitemap Crawler Dashboard API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use absolute path to ensure DB is found
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "output", "tfs_crawl.sqlite")

def get_db_connection():
    if not os.path.exists(DB_PATH):
        logger.error(f"Database file not found at {DB_PATH}")
        raise HTTPException(status_code=404, detail="Database file not found")
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/api/stats")
async def get_stats():
    conn = get_db_connection()
    try:
        # Total Pages
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents")
        total_pages = cursor.fetchone()['count']
        
        # FAQs
        cursor = conn.execute("SELECT COUNT(*) as count FROM faq_items")
        total_faqs = cursor.fetchone()['count']
        
        # External Links
        cursor = conn.execute("SELECT COUNT(*) as count FROM link_edges WHERE is_external=1")
        total_external_links = cursor.fetchone()['count']
        
        # Status Distribution
        cursor = conn.execute("SELECT status, COUNT(*) as count FROM documents GROUP BY status")
        status_distribution = [{"name": row['status'], "value": row['count']} for row in cursor.fetchall()]
        
        # Answer Modes
        cursor = conn.execute("SELECT answer_mode, COUNT(*) as count FROM faq_items GROUP BY answer_mode")
        answer_modes = [{"name": row['answer_mode'], "value": row['count']} for row in cursor.fetchall()]
        
        return {
            "overview": {
                "totalPages": total_pages,
                "totalFaqs": total_faqs,
                "totalExternalLinks": total_external_links
            },
            "statusDistribution": status_distribution,
            "answerModes": answer_modes
        }
    finally:
        conn.close()

@app.get("/api/external-stats")
async def get_external_stats():
    conn = get_db_connection()
    try:
        logger.info("Fetching external stats...")
        
        # 1. Total Unique External Domains (Global)
        cursor = conn.execute("SELECT child_url FROM link_edges WHERE is_external=1")
        rows = cursor.fetchall()
        all_external_links = [row['child_url'] for row in rows]
        logger.info(f"Found {len(all_external_links)} external links in link_edges")
        
        all_domains = []
        for url in all_external_links:
            try:
                if url:
                    domain = urlparse(url).netloc
                    if domain:
                        all_domains.append(domain)
            except Exception as e:
                logger.warning(f"Failed to parse URL {url}: {e}")
                pass
                
        unique_domains_total = len(set(all_domains))
        logger.info(f"Total unique domains: {unique_domains_total}")
        
        # 2. Unique External Domains from FAQ Pages
        cursor = conn.execute("SELECT url, meta_tags FROM documents")
        faq_pages = []
        for row in cursor.fetchall():
            try:
                tags = json.loads(row['meta_tags']) if row['meta_tags'] else {}
                if tags.get('is_faq_page'):
                    faq_pages.append(row['url'])
            except:
                pass
        
        logger.info(f"Found {len(faq_pages)} FAQ pages")
        
        unique_domains_faq = 0
        if faq_pages:
             # chunks to avoid sqlite limit if many pages
             placeholders = ','.join(['?'] * len(faq_pages))
             query = f"SELECT child_url FROM link_edges WHERE is_external=1 AND parent_url IN ({placeholders})"
             cursor = conn.execute(query, faq_pages)
             faq_external_links = [row['child_url'] for row in cursor.fetchall()]
             
             faq_domains = []
             for url in faq_external_links:
                 try:
                     if url:
                         domain = urlparse(url).netloc
                         if domain:
                             faq_domains.append(domain)
                 except:
                     pass
             unique_domains_faq = len(set(faq_domains))
             logger.info(f"Unique domains in FAQ pages: {unique_domains_faq}")
             
        # 3. Top 10 Domains
        top_domains = []
        if all_domains:
            domain_counts = pd.Series(all_domains).value_counts().head(10).to_dict()
            top_domains = [{"domain": k, "count": int(v)} for k, v in domain_counts.items()]
        
        # 4. Confidential Domains
        sensitive_keywords = ['irs.gov', 'ssn', 'socialsecurity', 'login', 'account']
        found_sensitive = []
        unique_all_domains = set(all_domains)
        for domain in unique_all_domains:
            for kw in sensitive_keywords:
                if kw in domain.lower():
                    found_sensitive.append(domain)
        
        return {
            "total_unique_domains": unique_domains_total,
            "faq_unique_domains": unique_domains_faq,
            "top_domains": top_domains,
            "sensitive_domains": found_sensitive
        }
    except Exception as e:
        logger.error(f"Error in get_external_stats: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/api/faqs/export")
async def export_faqs_csv():
    conn = get_db_connection()
    try:
        cursor = conn.execute("SELECT question_text, answer_text, answer_mode, document_url FROM faq_items")
        rows = cursor.fetchall()
        
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(['Question', 'Answer', 'Mode', 'Source URL'])
        
        for row in rows:
            writer.writerow([row['question_text'], row['answer_text'], row['answer_mode'], row['document_url']])
            
        output.seek(0)
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=faqs_export.csv"}
        )
    finally:
        conn.close()

@app.get("/api/faqs")
async def get_faqs(limit: int = 1000, offset: int = 0, search: str = ""):
    conn = get_db_connection()
    try:
        query = "SELECT * FROM faq_items"
        params = []
        if search:
            query += " WHERE question_text LIKE ? OR answer_text LIKE ?"
            params.extend([f"%{search}%", f"%{search}%"])
        
        query += " LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        
        cursor = conn.execute(query, params)
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

@app.get("/api/pages")
async def get_pages(limit: int = 100, offset: int = 0):
    conn = get_db_connection()
    try:
        cursor = conn.execute("SELECT url, status, content_type, depth_from_seed, crawled_at FROM documents LIMIT ? OFFSET ?", (limit, offset))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
