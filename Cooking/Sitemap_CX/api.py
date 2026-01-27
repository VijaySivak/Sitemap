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

@app.get("/api/business-metrics")
async def get_business_metrics():
    """
    Comprehensive business metrics for website health analysis.
    """
    conn = get_db_connection()
    try:
        logger.info("Calculating business metrics...")
        
        # 1. Content Health Metrics
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents")
        total_pages = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE status LIKE 'HTTP_4%' OR status LIKE 'HTTP_5%'")
        broken_pages = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE status = 'FETCH_ERROR'")
        fetch_errors = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE status = 'BLOCKED_BY_ROBOTS'")
        blocked_by_robots = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE status = 'CRAWLED'")
        successful_crawls = cursor.fetchone()['count']
        
        content_health_score = round((successful_crawls / total_pages * 100), 1) if total_pages > 0 else 0
        
        # 2. Crawl Depth Distribution
        cursor = conn.execute("SELECT depth_from_seed, COUNT(*) as count FROM documents WHERE depth_from_seed IS NOT NULL GROUP BY depth_from_seed ORDER BY depth_from_seed")
        depth_distribution = [{"depth": row['depth_from_seed'], "count": row['count']} for row in cursor.fetchall()]
        
        # Deep pages (depth > 3)
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE depth_from_seed > 3")
        deep_pages_count = cursor.fetchone()['count']
        
        # 3. FAQ Quality Metrics
        cursor = conn.execute("SELECT COUNT(*) as count FROM faq_items")
        total_faqs = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT answer_mode, COUNT(*) as count FROM faq_items GROUP BY answer_mode")
        faq_modes = {row['answer_mode']: row['count'] for row in cursor.fetchall()}
        
        direct_text_faqs = faq_modes.get('DIRECT_TEXT', 0)
        self_service_rate = round((direct_text_faqs / total_faqs * 100), 1) if total_faqs > 0 else 0
        
        escalation_faqs = faq_modes.get('PHONE_ESCALATION', 0) + faq_modes.get('PORTAL_REDIRECT', 0)
        
        # Short answers (less than 100 chars)
        cursor = conn.execute("SELECT COUNT(*) as count FROM faq_items WHERE LENGTH(answer_text) < 100")
        short_answers = cursor.fetchone()['count']
        
        # 4. Pages without FAQs
        cursor = conn.execute("""
            SELECT COUNT(*) as count FROM documents d 
            WHERE d.status = 'CRAWLED' 
            AND d.content_type LIKE '%text/html%'
            AND d.url NOT IN (SELECT DISTINCT document_url FROM faq_items)
        """)
        pages_without_faqs = cursor.fetchone()['count']
        
        # 5. PDF Dependency
        cursor = conn.execute("SELECT COUNT(*) as count FROM assets WHERE asset_type = 'pdf'")
        pdf_count = cursor.fetchone()['count']
        
        cursor = conn.execute("SELECT COUNT(*) as count FROM documents WHERE content_type LIKE '%pdf%'")
        pdf_pages = cursor.fetchone()['count']
        
        # 6. Orphan Pages (pages with no inbound internal links)
        cursor = conn.execute("""
            SELECT COUNT(*) as count FROM documents d
            WHERE d.status = 'CRAWLED'
            AND d.url NOT IN (
                SELECT DISTINCT child_url FROM link_edges WHERE is_external = 0
            )
            AND d.depth_from_seed > 0
        """)
        orphan_pages = cursor.fetchone()['count']
        
        # 7. External Link Heavy Pages (pages with >10 external links)
        cursor = conn.execute("""
            SELECT parent_url, COUNT(*) as ext_count 
            FROM link_edges 
            WHERE is_external = 1 
            GROUP BY parent_url 
            HAVING ext_count > 10
            ORDER BY ext_count DESC
            LIMIT 10
        """)
        external_heavy_pages = [{"url": row['parent_url'], "external_links": row['ext_count']} for row in cursor.fetchall()]
        
        # 8. Broken Links Detail
        cursor = conn.execute("""
            SELECT url, status, depth_from_seed 
            FROM documents 
            WHERE status LIKE 'HTTP_4%' OR status LIKE 'HTTP_5%' OR status = 'FETCH_ERROR'
            LIMIT 20
        """)
        broken_links_detail = [{"url": row['url'], "status": row['status'], "depth": row['depth_from_seed']} for row in cursor.fetchall()]
        
        return {
            "content_health": {
                "total_pages": total_pages,
                "successful_crawls": successful_crawls,
                "broken_pages": broken_pages,
                "fetch_errors": fetch_errors,
                "blocked_by_robots": blocked_by_robots,
                "health_score": content_health_score
            },
            "navigation": {
                "depth_distribution": depth_distribution,
                "deep_pages_count": deep_pages_count,
                "orphan_pages": orphan_pages
            },
            "faq_quality": {
                "total_faqs": total_faqs,
                "self_service_rate": self_service_rate,
                "direct_text_count": direct_text_faqs,
                "escalation_count": escalation_faqs,
                "short_answers": short_answers,
                "pages_without_faqs": pages_without_faqs,
                "answer_modes": faq_modes
            },
            "dependencies": {
                "pdf_count": pdf_count,
                "pdf_pages": pdf_pages,
                "external_heavy_pages": external_heavy_pages
            },
            "issues": {
                "broken_links": broken_links_detail
            }
        }
    except Exception as e:
        logger.error(f"Error in get_business_metrics: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/api/redundant-content")
async def get_redundant_content(min_occurrences: int = 2, min_length: int = 50, limit: int = 50):
    """
    Analyze scraped content for redundant paragraphs/strings.
    Returns content snippets that appear multiple times across pages.
    """
    conn = get_db_connection()
    try:
        logger.info("Analyzing content for redundancies...")
        
        # Get all extracted text content from documents_fts
        cursor = conn.execute("SELECT url, content FROM documents_fts WHERE content IS NOT NULL AND content != ''")
        rows = cursor.fetchall()
        
        # Track paragraph occurrences: paragraph -> list of source URLs
        paragraph_sources: Dict[str, List[str]] = {}
        
        for row in rows:
            url = row['url']
            content = row['content'] or ''
            
            # Split content into paragraphs (by double newlines or single newlines with length check)
            paragraphs = []
            for block in content.split('\n\n'):
                block = block.strip()
                if len(block) >= min_length:
                    paragraphs.append(block)
            
            # Also check for repeated sentences/phrases within single-newline splits
            for block in content.split('\n'):
                block = block.strip()
                if len(block) >= min_length and block not in paragraphs:
                    paragraphs.append(block)
            
            for para in paragraphs:
                # Normalize whitespace for comparison
                normalized = ' '.join(para.split())
                if len(normalized) >= min_length:
                    if normalized not in paragraph_sources:
                        paragraph_sources[normalized] = []
                    if url not in paragraph_sources[normalized]:
                        paragraph_sources[normalized].append(url)
        
        # Filter to only redundant content (appears in multiple pages)
        redundant_items = []
        for content_str, sources in paragraph_sources.items():
            if len(sources) >= min_occurrences:
                # Truncate display snippet if too long
                snippet = content_str[:200] + "..." if len(content_str) > 200 else content_str
                redundant_items.append({
                    "content_snippet": snippet,
                    "full_content": content_str,
                    "occurrences": len(sources),
                    "source_urls": sources[:5]  # Limit to first 5 URLs for display
                })
        
        # Sort by occurrences descending
        redundant_items.sort(key=lambda x: x['occurrences'], reverse=True)
        
        # Limit results
        redundant_items = redundant_items[:limit]
        
        total_redundant_blocks = len([p for p, s in paragraph_sources.items() if len(s) >= min_occurrences])
        
        logger.info(f"Found {total_redundant_blocks} redundant content blocks")
        
        return {
            "total_redundant_blocks": total_redundant_blocks,
            "items": redundant_items
        }
    except Exception as e:
        logger.error(f"Error in get_redundant_content: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
