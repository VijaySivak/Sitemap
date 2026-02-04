import sqlite3
import os

conn = sqlite3.connect(r'C:\Users\Vijay\Desktop\Sitemap_TFS\Sitemap\output\tfs_crawl.sqlite')

print("PDF documents:")
pdfs = conn.execute("SELECT url FROM documents WHERE content_type LIKE '%pdf%' LIMIT 5").fetchall()
for r in pdfs:
    print(r[0])

print()
print("Total PDFs:", conn.execute("SELECT COUNT(*) FROM documents WHERE content_type LIKE '%pdf%'").fetchone()[0])

# Check if we have extracted PDF text
pdf_text_dir = r'C:\Users\Vijay\Desktop\Sitemap_TFS\Sitemap\artifacts\pdf_text'
if os.path.exists(pdf_text_dir):
    files = os.listdir(pdf_text_dir)
    print(f"\nExtracted PDF text files: {len(files)}")
    if files:
        print("Sample file:", files[0])
        with open(os.path.join(pdf_text_dir, files[0]), 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()[:500]
            print("Content preview:", content)

conn.close()
