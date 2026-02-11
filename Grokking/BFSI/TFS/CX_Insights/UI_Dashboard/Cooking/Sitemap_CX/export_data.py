import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).parent / "output" / "tfs_crawl.sqlite"
OUTPUT_DIR = Path(__file__).parent / "dashboard-ui" / "public" / "data"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row

def export_stats():
    cursor = conn.cursor()
    
    total_pages = cursor.execute("SELECT COUNT(*) FROM documents").fetchone()[0]
    total_faqs = cursor.execute("SELECT COUNT(*) FROM faq_items").fetchone()[0]
    total_external = cursor.execute("SELECT COUNT(*) FROM external_links_global").fetchone()[0]
    
    status_dist = cursor.execute("""
        SELECT status, COUNT(*) as count 
        FROM documents 
        GROUP BY status
    """).fetchall()
    
    answer_modes = cursor.execute("""
        SELECT answer_mode, COUNT(*) as count 
        FROM faq_items 
        GROUP BY answer_mode
    """).fetchall()
    
    stats = {
        "overview": {
            "totalPages": total_pages,
            "totalFaqs": total_faqs,
            "totalExternalLinks": total_external
        },
        "statusDistribution": [{"name": row["status"], "value": row["count"]} for row in status_dist],
        "answerModes": [{"name": row["answer_mode"], "value": row["count"]} for row in answer_modes]
    }
    
    with open(OUTPUT_DIR / "stats.json", "w") as f:
        json.dump(stats, f, indent=2)
    print("✓ Exported stats.json")

def export_faqs():
    cursor = conn.cursor()
    faqs = cursor.execute("""
        SELECT id, question_text, answer_text, answer_mode, document_url
        FROM faq_items
        LIMIT 1000
    """).fetchall()
    
    faq_list = [dict(row) for row in faqs]
    
    with open(OUTPUT_DIR / "faqs.json", "w") as f:
        json.dump(faq_list, f, indent=2)
    print(f"✓ Exported {len(faq_list)} FAQs to faqs.json")

def export_external_stats():
    cursor = conn.cursor()
    
    total_unique = cursor.execute("""
        SELECT COUNT(*) FROM external_domains_global
    """).fetchone()[0]
    
    faq_unique = cursor.execute("""
        SELECT COUNT(DISTINCT SUBSTR(url, 1, INSTR(url || '/', '/') - 1))
        FROM external_links_global
        WHERE url IN (
            SELECT url FROM faq_items
        )
    """).fetchone()[0] or 0
    
    top_domains = cursor.execute("""
        SELECT domain, COUNT(*) as count
        FROM external_domains_global
        GROUP BY domain
        ORDER BY count DESC
        LIMIT 10
    """).fetchall()
    
    sensitive_keywords = ['competitor', 'bank', 'credit', 'loan', 'finance']
    sensitive = cursor.execute(f"""
        SELECT DISTINCT domain
        FROM external_domains_global
        WHERE {' OR '.join([f"domain LIKE '%{kw}%'" for kw in sensitive_keywords])}
    """).fetchall()
    
    external_stats = {
        "total_unique_domains": total_unique,
        "faq_unique_domains": faq_unique,
        "top_domains": [{"domain": row["domain"], "count": row["count"]} for row in top_domains],
        "sensitive_domains": [row["domain"] for row in sensitive]
    }
    
    with open(OUTPUT_DIR / "external-stats.json", "w") as f:
        json.dump(external_stats, f, indent=2)
    print("✓ Exported external-stats.json")

def export_redundant_content():
    redundant_stats = {
        "total_redundant_blocks": 0,
        "items": []
    }
    
    with open(OUTPUT_DIR / "redundant-content.json", "w") as f:
        json.dump(redundant_stats, f, indent=2)
    print("✓ Exported redundant-content.json (no data available)")

def export_business_metrics():
    cursor = conn.cursor()
    
    # Content Health
    total_pages = cursor.execute("SELECT COUNT(*) FROM documents").fetchone()[0]
    successful_crawls = cursor.execute("SELECT COUNT(*) FROM documents WHERE status = 'CRAWLED'").fetchone()[0]
    broken_pages = cursor.execute("SELECT COUNT(*) FROM documents WHERE status LIKE '4%' OR status LIKE '5%'").fetchone()[0]
    fetch_errors = cursor.execute("SELECT COUNT(*) FROM documents WHERE status = 'FETCH_ERROR'").fetchone()[0]
    blocked_by_robots = cursor.execute("SELECT COUNT(*) FROM documents WHERE status = 'BLOCKED_BY_ROBOTS'").fetchone()[0]
    
    health_score = round((successful_crawls / total_pages * 100) if total_pages > 0 else 0, 1)
    
    # Navigation depth
    depth_dist = cursor.execute("""
        SELECT depth_from_seed as depth, COUNT(*) as count
        FROM documents
        WHERE depth_from_seed IS NOT NULL
        GROUP BY depth_from_seed
        ORDER BY depth_from_seed
    """).fetchall()
    
    deep_pages = cursor.execute("SELECT COUNT(*) FROM documents WHERE depth_from_seed > 3").fetchone()[0]
    
    # FAQ Quality
    total_faqs = cursor.execute("SELECT COUNT(*) FROM faq_items").fetchone()[0]
    direct_text = cursor.execute("SELECT COUNT(*) FROM faq_items WHERE answer_mode = 'DIRECT_TEXT'").fetchone()[0]
    escalation = cursor.execute("SELECT COUNT(*) FROM faq_items WHERE answer_mode IN ('PHONE_REDIRECT', 'PORTAL_REDIRECT')").fetchone()[0]
    short_answers = cursor.execute("SELECT COUNT(*) FROM faq_items WHERE LENGTH(answer_text) < 100").fetchone()[0]
    
    self_service_rate = round((direct_text / total_faqs * 100) if total_faqs > 0 else 0, 1)
    
    # Pages without FAQs
    pages_with_faqs = cursor.execute("SELECT COUNT(DISTINCT document_url) FROM faq_items").fetchone()[0]
    pages_without_faqs = total_pages - pages_with_faqs
    
    # Answer modes breakdown
    answer_modes_data = cursor.execute("""
        SELECT answer_mode, COUNT(*) as count
        FROM faq_items
        GROUP BY answer_mode
    """).fetchall()
    answer_modes = {row["answer_mode"]: row["count"] for row in answer_modes_data}
    
    # PDF count
    pdf_count = cursor.execute("SELECT COUNT(*) FROM assets WHERE asset_type = 'PDF'").fetchone()[0]
    pdf_pages = cursor.execute("""
        SELECT COUNT(DISTINCT source_page_url) 
        FROM assets 
        WHERE asset_type = 'PDF'
    """).fetchone()[0]
    
    # External heavy pages
    external_heavy = cursor.execute("""
        SELECT le.parent_url as url, COUNT(*) as external_links
        FROM link_edges le
        WHERE le.is_external = 1
        GROUP BY le.parent_url
        HAVING COUNT(*) > 5
        ORDER BY external_links DESC
        LIMIT 10
    """).fetchall()
    
    # Broken links
    broken_links = cursor.execute("""
        SELECT url, status, depth_from_seed as depth
        FROM documents
        WHERE status LIKE '4%' OR status LIKE '5%'
        ORDER BY depth_from_seed
        LIMIT 20
    """).fetchall()
    
    business_metrics = {
        "content_health": {
            "total_pages": total_pages,
            "successful_crawls": successful_crawls,
            "broken_pages": broken_pages,
            "fetch_errors": fetch_errors,
            "blocked_by_robots": blocked_by_robots,
            "health_score": health_score
        },
        "navigation": {
            "depth_distribution": [{"depth": row["depth"], "count": row["count"]} for row in depth_dist],
            "deep_pages_count": deep_pages,
            "orphan_pages": 0
        },
        "faq_quality": {
            "total_faqs": total_faqs,
            "self_service_rate": self_service_rate,
            "direct_text_count": direct_text,
            "escalation_count": escalation,
            "short_answers": short_answers,
            "pages_without_faqs": pages_without_faqs,
            "answer_modes": answer_modes
        },
        "dependencies": {
            "pdf_count": pdf_count,
            "pdf_pages": pdf_pages,
            "external_heavy_pages": [{"url": row["url"], "external_links": row["external_links"]} for row in external_heavy]
        },
        "issues": {
            "broken_links": [{"url": row["url"], "status": row["status"], "depth": row["depth"] or 0} for row in broken_links]
        }
    }
    
    with open(OUTPUT_DIR / "business-metrics.json", "w") as f:
        json.dump(business_metrics, f, indent=2)
    print(f"✓ Exported business-metrics.json (Health Score: {health_score}%)")

def export_pdf_analysis():
    cursor = conn.cursor()
    
    # Get all PDFs
    pdfs = cursor.execute("""
        SELECT asset_url as url
        FROM assets
        WHERE asset_type = 'PDF'
    """).fetchall()
    
    total_pdfs = len(pdfs)
    
    # Simple heuristic: check URL for form-related keywords
    form_keywords = ['form', 'application', 'enrollment', 'claim', 'request']
    info_keywords = ['guide', 'brochure', 'overview', 'fact', 'sheet']
    
    form_pdfs = []
    info_pdfs = []
    
    for pdf in pdfs:
        url_lower = pdf["url"].lower()
        form_matches = sum(1 for kw in form_keywords if kw in url_lower)
        info_matches = sum(1 for kw in info_keywords if kw in url_lower)
        
        if form_matches > info_matches:
            form_pdfs.append({"url": pdf["url"], "keyword_matches": form_matches})
        else:
            info_pdfs.append({"url": pdf["url"], "keyword_matches": info_matches})
    
    form_count = len(form_pdfs)
    info_count = len(info_pdfs)
    
    pdf_analysis = {
        "total_pdfs": total_pdfs,
        "form_filling": {
            "count": form_count,
            "percentage": round((form_count / total_pdfs * 100) if total_pdfs > 0 else 0, 1),
            "urls": form_pdfs[:10]
        },
        "informational": {
            "count": info_count,
            "percentage": round((info_count / total_pdfs * 100) if total_pdfs > 0 else 0, 1),
            "urls": info_pdfs[:10]
        }
    }
    
    with open(OUTPUT_DIR / "pdf-analysis.json", "w") as f:
        json.dump(pdf_analysis, f, indent=2)
    print(f"✓ Exported pdf-analysis.json ({total_pdfs} PDFs analyzed)")

if __name__ == "__main__":
    print("Exporting data from SQLite to JSON...")
    export_stats()
    export_faqs()
    export_external_stats()
    export_redundant_content()
    export_business_metrics()
    export_pdf_analysis()
    conn.close()
    print("\n✅ All data exported successfully!")
    print(f"📁 Files saved to: {OUTPUT_DIR}")
