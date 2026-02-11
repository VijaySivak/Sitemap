import sqlite3

conn = sqlite3.connect(r'C:\Users\Vijay\Desktop\Sitemap_TFS\Sitemap\output\tfs_crawl.sqlite')

print("=" * 60)
print("BROKEN LINKS (pages that return errors)")
print("=" * 60)
for row in conn.execute("SELECT url, status FROM documents WHERE status LIKE 'HTTP_4%' OR status = 'FETCH_ERROR' LIMIT 3").fetchall():
    print(f"  {row[0]}")
    print(f"  Status: {row[1]}")
    print()

print("=" * 60)
print("ORPHAN PAGES (no internal links pointing to them)")
print("=" * 60)
for row in conn.execute("""
    SELECT url FROM documents 
    WHERE status = 'CRAWLED' 
    AND depth_from_seed > 0 
    AND url NOT IN (SELECT DISTINCT child_url FROM link_edges WHERE is_external = 0) 
    LIMIT 3
""").fetchall():
    print(f"  {row[0]}")
    print()

print("=" * 60)
print("EXTERNAL HEAVY PAGES (many outbound external links)")
print("=" * 60)
for row in conn.execute("""
    SELECT parent_url, COUNT(*) as ext_count 
    FROM link_edges 
    WHERE is_external = 1 
    GROUP BY parent_url 
    HAVING ext_count > 5 
    ORDER BY ext_count DESC 
    LIMIT 3
""").fetchall():
    print(f"  {row[0]}")
    print(f"  External links: {row[1]}")
    print()

conn.close()
