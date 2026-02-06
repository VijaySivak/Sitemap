import csv
import json
import os
import pandas as pd
from typing import List, Dict, Optional
from datetime import datetime
from supervisor import app

# --- CONFIGURATION ---
INPUT_FILE = "faq_viewer_export.csv"
OUTPUT_DIR = "data/processed"
QUARANTINE_FILE = "data/quarantine.csv"

# SET THIS TO A NUMBER (e.g., 5) FOR DEBUGGING, OR None FOR THE WHOLE FILE
DEBUG_LIMIT = 50

def init_folders():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    # Clear quarantine if starting fresh (optional)
    if not os.path.exists(QUARANTINE_FILE):
        with open(QUARANTINE_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["ID", "Question", "Errors", "Timestamp"])

def save_json(row_id: str, data: List[dict]):
    """Saves the verified subgraph to a JSON file"""
    filename = os.path.join(OUTPUT_DIR, f"{row_id}.json")
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, default=str)

def log_failure(row_id: str, question: str, errors: List[str]):
    """Logs failed rows to a quarantine CSV"""
    with open(QUARANTINE_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            row_id, 
            question, 
            " | ".join(errors), 
            datetime.utcnow().isoformat()
        ])

def run_pipeline():
    init_folders()
    
    print(f"📂 Loading {INPUT_FILE}...")
    try:
        # Load CSV using pandas for robust handling of quoted answers
        df = pd.read_csv(INPUT_FILE)
    except Exception as e:
        print(f"❌ Error loading CSV: {e}")
        return

    total_rows = len(df)
    limit = DEBUG_LIMIT if DEBUG_LIMIT else total_rows
    print(f"🚀 Starting Extraction. Total Rows: {total_rows}. Target Batch: {limit}")

    success_count = 0
    fail_count = 0
    
    # Iterate through the DataFrame
    for i, (index, row) in enumerate(df.iterrows()):
        
        # Check against the counter 'i', NOT the 'index'
        if limit and i >= limit:
            print(f"\n🛑 Debug limit of {limit} reached. Stopping.")
            break

        # Map CSV columns
        row_id = str(row.get("ID", index))
        question = str(row.get("Question", ""))
        answer = str(row.get("Answer", ""))
        source_url = str(row.get("Source URL", ""))

        print(f"\n[{index + 1}/{limit}] Processing Row {row_id}...")

        # 1. Initialize State
        input_state = {
            "row_id": row_id,
            "question": question,
            "answer": answer,
            "source_url": source_url,
            "final_entities": [],
            "validation_errors": [],
            "is_verified": False
        }

        # 2. Run Agentic Pipeline
        try:
            result = app.invoke(input_state)
            
            # 3. Handle Result
            if result["is_verified"]:
                entities = result.get("final_entities", [])
                # Convert Pydantic models to dicts for JSON serialization
                entities_json = [e.model_dump() for e in entities]
                save_json(row_id, entities_json)
                print(f"   ✅ SUCCESS: Saved {len(entities)} nodes.")
                success_count += 1
            else:
                errors = result.get("validation_errors", [])
                print(f"   🔴 FAILED Validation.")
                for err in errors:
                    print(f"      - {err}")
                log_failure(row_id, question, errors)
                fail_count += 1

        except Exception as e:
            print(f"   🔥 CRASH: {e}")
            log_failure(row_id, question, [f"Pipeline Crash: {str(e)}"])
            fail_count += 1

    print("\n" + "="*40)
    print(f"🏁 BATCH COMPLETE")
    print(f"✅ Successful: {success_count}")
    print(f"❌ Failed/Quarantined: {fail_count}")
    print("="*40)

if __name__ == "__main__":
    run_pipeline()