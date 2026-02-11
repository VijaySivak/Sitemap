import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "output" / "tfs_crawl.sqlite"
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

print("Tables in database:")
tables = cursor.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
for table in tables:
    print(f"\n{table[0]}:")
    columns = cursor.execute(f"PRAGMA table_info({table[0]})").fetchall()
    for col in columns:
        print(f"  - {col[1]} ({col[2]})")

conn.close()
