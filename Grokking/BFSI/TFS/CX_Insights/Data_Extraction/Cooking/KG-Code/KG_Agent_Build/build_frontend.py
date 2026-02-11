import json
import os
import networkx as nx

# --- CONFIGURATION ---
INPUT_DIR = "data/processed"  # Changed to 'verified' to match your flow, or keep 'processed'
OUTPUT_FILE = "src/faq_data_gemini.json" 

def build_graph():
    print("🚀 Starting Universal Graph Build...")
    
    # 1. Initialize Graph
    G = nx.DiGraph()
    
    # 2. Load Nodes from JSON Files
    if not os.path.exists(INPUT_DIR):
        print(f"❌ Error: Input directory '{INPUT_DIR}' not found!")
        # Fallback to create if missing (for safety)
        os.makedirs(INPUT_DIR, exist_ok=True)
        return

    files = [f for f in os.listdir(INPUT_DIR) if f.endswith(".json")]
    print(f"📂 Found {len(files)} processed files.")

    for filename in files:
        filepath = os.path.join(INPUT_DIR, filename)
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
                
                # Handle both list-of-objects and single-object JSONs
                if isinstance(data, dict):
                    entities = [data]
                else:
                    entities = data

                for entity in entities:
                    # Flatten: Copy all properties to top level so App.jsx can read them
                    node_data = entity.copy()
                    
                    # --- UNIVERSAL DISPLAY NAME POLYFILL (All 14 Entities) ---
                    # The Frontend strictly looks for 'name'. We map specific fields to 'name'.
                    
                    # 1. Product / Intent / Path / Channel / Party (Already have 'name')
                    display_name = node_data.get("name")
                    
                    # 2. ContentAsset
                    if not display_name and node_data.get("title"):
                        display_name = node_data.get("title")

                    # 3. InstructionStep
                    if not display_name and node_data.get("instruction"):
                        display_name = f"{node_data.get('verb')} {node_data.get('object')}"

                    # 4. Condition
                    if not display_name and node_data.get("trigger"):
                        display_name = f"IF {node_data.get('trigger')}"

                    # 5. EvidenceAnchor
                    if not display_name and node_data.get("extracted_text"):
                        text = node_data.get("extracted_text")
                        display_name = (text[:50] + '...') if len(text) > 50 else text

                    # 6. LatencyWindow
                    if not display_name and node_data.get("duration"):
                        display_name = f"Wait {node_data.get('duration')}"

                    # Fallback
                    node_data["name"] = display_name or node_data.get("id", "Unknown")
                    
                    # Assign Group for Coloring based on ID prefix
                    node_id = node_data.get("id", "")
                    if node_id.startswith("PROD"): node_data["group"] = "Product"
                    elif node_id.startswith("INT"): node_data["group"] = "Intent"
                    elif node_id.startswith("PATH"): node_data["group"] = "Path"
                    elif node_id.startswith("STEP"): node_data["group"] = "Step"
                    elif node_id.startswith("COND"): node_data["group"] = "Condition"
                    elif node_id.startswith("EV"): node_data["group"] = "Evidence"
                    elif node_id.startswith("CA"): node_data["group"] = "Asset"
                    elif node_id.startswith("CH"): node_data["group"] = "Channel"
                    elif node_id.startswith("RP"): node_data["group"] = "Party"
                    else: node_data["group"] = "Other"

                    # Add Node to NetworkX (Merges duplicates automatically)
                    G.add_node(node_id, **node_data)

                    # --- LINKAGE LOGIC ---
                    
                    def add_link(ref_field, edge_label):
                        target = node_data.get(ref_field)
                        if target:
                            if isinstance(target, list):
                                for t in target:
                                     G.add_edge(node_id, t, label=edge_label)
                            else:
                                G.add_edge(node_id, target, label=edge_label)

                    # A. Core Hierarchy
                    add_link("product", "RELATED_TO")        
                    add_link("product_refs", "RELATED_TO")   
                    add_link("path_ref", "PART_OF_PATH")
                    add_link("step_ref", "MODIFIES_STEP")
                    add_link("channel_ref", "VIA_CHANNEL")
                    add_link("supports", "SUPPORTS") # Evidence -> Step (Forward)
                    
                    # B. Verification & Traceability
                    add_link("evidence_ref", "SUPPORTED_BY") # Step -> Evidence (Back)
                    
                    # --- NEW FIX: CONNECT EVIDENCE TO SOURCE ASSET ---
                    add_link("asset_ref", "FOUND_IN")   
                    # -------------------------------------------------

                    # C. Business Logic
                    add_link("friction_ref", "CAUSED_BY")
                    add_link("leakage_ref", "ADDRESSES")
                    add_link("products", "APPLIES_TO") # For Escalation/Parties

        except Exception as e:
            print(f"⚠️ Error processing {filename}: {e}")

    # 4. Export to Frontend JSON
    nodes = []
    for node_id, data in G.nodes(data=True):
        # Calculate degree for node size (visual importance)
        degree = G.degree(node_id)
        
        node_out = {
            "id": node_id,
            "val": degree, 
            **data  # Unpack all properties
        }
        nodes.append(node_out)

    links = []
    for source, target, data in G.edges(data=True):
        links.append({
            "source": source,
            "target": target,
            "name": data.get("label", "RELATED")
        })

    output_data = {"nodes": nodes, "links": links}

    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, "w") as f:
        json.dump(output_data, f, indent=2)

    print(f"✅ Graph built successfully!")
    print(f"   Nodes: {len(nodes)}")
    print(f"   Links: {len(links)}")
    print(f"   Saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    build_graph()