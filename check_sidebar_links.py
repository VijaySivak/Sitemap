import sqlite3

conn = sqlite3.connect('output/tfs_crawl.sqlite')
conn.row_factory = sqlite3.Row

# Identify repeated external URLs (appearing on >5% of pages)
total_pages = conn.execute("SELECT COUNT(*) FROM documents WHERE status='SUCCESS'").fetchone()[0]
repeated_threshold = max(10, int(total_pages * 0.05))
print(f"Total pages: {total_pages}, Repeated threshold: {repeated_threshold}")

cursor = conn.execute("""
    SELECT child_url FROM link_edges 
    WHERE is_external=1 
    GROUP BY child_url 
    HAVING COUNT(DISTINCT parent_url) >= ?
""", (repeated_threshold,))
repeated_urls = {row['child_url'] for row in cursor.fetchall()}
print(f"Repeated external URLs excluded: {len(repeated_urls)}")

# Count unique external links per page (excluding repeated)
cursor = conn.execute("SELECT parent_url, child_url FROM link_edges WHERE is_external = 1")
page_unique_externals = {}
for row in cursor.fetchall():
    parent = row['parent_url']
    child = row['child_url']
    if child not in repeated_urls:
        if parent not in page_unique_externals:
            page_unique_externals[parent] = set()
        page_unique_externals[parent].add(child)

# Show distribution
print("\nPages by unique external link count:")
sorted_pages = sorted(page_unique_externals.items(), key=lambda x: len(x[1]), reverse=True)
for url, urls in sorted_pages[:15]:
    print(f"  {len(urls):3d} links: {url[:70]}")

conn.close()
