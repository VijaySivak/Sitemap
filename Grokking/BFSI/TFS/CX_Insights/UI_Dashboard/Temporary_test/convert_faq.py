import pandas as pd
import json
import re
import uuid
import hashlib
import time
import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig

# ==============================================================================
# 1. SETUP & CONFIGURATION
# ==============================================================================
# TODO: REPLACE WITH YOUR ACTUAL PROJECT ID
PROJECT_ID = "upbeat-repeater-477110-q6"
LOCATION = "us-central1"

# TOGGLE THIS: Set to None to process the whole file
DEBUG_SAMPLE_SIZE = 50 

vertexai.init(project=PROJECT_ID, location=LOCATION)

INPUT_FILE = 'faq_viewer_export.csv'
OUTPUT_FILE = 'faq_data_gemini.json'
INTENT_LOG_FILE = 'debug_customer_intents.json'

print(f"Loading {INPUT_FILE}...")
try:
    df = pd.read_csv(INPUT_FILE)
except FileNotFoundError:
    print(f"Error: {INPUT_FILE} not found. Make sure it is in the project root.")
    exit()

# ==============================================================================
# 2. ONTOLOGY & STATIC DATA
# ==============================================================================

STATIC_PRODUCTS = {
    "PROD_LEASE": {
        "id": "PROD_LEASE",
        "name": "Vehicle Lease",
        "description": "Lease financing through Toyota Lease Trust. Includes lease-end process, mileage, wear & use."
    },
    "PROD_RETAIL": {
        "id": "PROD_RETAIL",
        "name": "Retail Finance",
        "description": "Traditional vehicle financing (loans). Includes APR, principal, lien release, payoff, simple interest."
    },
    "PROD_VSA": {
        "id": "PROD_VSA",
        "name": "Vehicle Service Agreement",
        "description": "Extended protection plans for mechanical breakdown. Includes deductibles and claims."
    },
    "PROD_GAP": {
        "id": "PROD_GAP",
        "name": "Guaranteed Auto Protection",
        "description": "Total loss protection. Covers the difference between insurance payout and finance balance."
    },
    "PROD_EWU": {
        "id": "PROD_EWU",
        "name": "Excess Wear & Use",
        "description": "Lease-end protection plan that waives charges for excess wear and use."
    },
    "PROD_TWP": {
        "id": "PROD_TWP",
        "name": "Tire & Wheel Protection",
        "description": "Road hazard protection for tires and wheels."
    }
}

PRODUCT_CONTEXT_STR = json.dumps([
    {"id": k, "desc": v["description"]} for k, v in STATIC_PRODUCTS.items()
], indent=2)

# ==============================================================================
# 3. VERTEX AI INTENT CLASSIFIER
# ==============================================================================
# ------------------------------------------------------------------------------
# NEW CATEGORY ENUM DEFINITIONS:
# - ORIGINATION:      Questions about getting a new vehicle/loan (e.g., Credit Scores, Co-buyers).
# - ACCOUNT_MGMT:     Questions about access/security (e.g., Login, Password Reset, Unlock Account).
# - GENERAL_SUPPORT:  Questions not tied to a product (e.g., Contact Info, Hours, Rewards Programs).
# - LEASE_END:        Specific to the end-of-lease process.
# - PAYMENT:          Specific to making/managing payments.
# - CLAIMS:           Specific to insurance/protection products.
# ------------------------------------------------------------------------------
model = GenerativeModel("gemini-2.0-flash-001")

def generate_intent_metadata(question, answer):
    """
    Uses Gemini to classify the FAQ. 
    Includes reasoning request to explain product mapping decisions.
    """
    
    prompt = f"""
    You are an expert Data Architect building a CX Knowledge Graph.
    
    YOUR TASK:
    Analyze the following FAQ Question and Answer. 
    1. Convert the question into a structured 'CustomerIntent' entity.
    2. Map it to the most relevant Product(s) from the provided list.
    
    CRITICAL RULE:
    - If the intent applies strictly to specific products (e.g., "Lease End"), map ONLY those products.
    - If the intent applies to NO specific product (e.g., "Credit Card Rewards", "Website Login"), leave 'product_refs' EMPTY []. DO NOT FORCE A MAPPING.
    - Provide a short 'product_reasoning' explaining why you selected (or didn't select) products.
    
    AVAILABLE PRODUCTS (Strict Selection):
    {PRODUCT_CONTEXT_STR}
    
    INPUT DATA:
    Question: "{question}"
    Answer: "{answer}"
    
    OUTPUT SCHEMA (JSON Only):
    {{
        "id": "String (Must start with 'INT_' followed by UPPERCASE_SNAKE_CASE. Ex: INT_LEASE_RETURN)",
        "name": "String (Concise display name, e.g., 'Return Leased Vehicle')",
        "description": "String (Full description of what the customer is trying to do)",
        "category": "Enum (One of: LEASE_END, PAYMENT, CLAIMS, ACCOUNT_MGMT, ORIGINATION, GENERAL_SUPPORT)",
        "product_refs": ["Array of Strings (MUST be exact IDs from Available Products list)"],
        "product_reasoning": "String (Explain why specific products were chosen or why list is empty)",
        "volume_signal": "Enum (HIGH, MEDIUM, LOW)",
        "complexity_tier": "Enum (COMPLEX, MODERATE, SIMPLE)",
        "journey_stage": "Enum (ORIGINATION, USAGE, SERVICE, RENEWAL_EXIT)"
    }}
    """

    generation_config = GenerationConfig(
        response_mime_type="application/json",
        temperature=0.2
    )

    try:
        response = model.generate_content(prompt, generation_config=generation_config)
        parsed_response = json.loads(response.text)
        
        # Unwrap list if necessary
        if isinstance(parsed_response, list):
            if len(parsed_response) > 0:
                intent_obj = parsed_response[0]
            else:
                raise ValueError("LLM returned an empty list")
        else:
            intent_obj = parsed_response
        
        # Inject Original Q&A for Debugging
        intent_obj['original_question'] = question
        intent_obj['original_answer'] = answer
        
        return intent_obj
        
    except Exception as e:
        print(f"⚠️ Gemini Extraction Failed: {e}")
        error_msg = str(e).replace('"', "'")
        
        return {
            "id": f"INT_ERROR_{hashlib.md5(question.encode()).hexdigest()[:6]}",
            "name": f"[FAILED] {question[:40]}...",
            "description": f"EXTRACTION FAILED. Reason: {error_msg}.",
            "category": "GENERAL_SUPPORT", 
            "product_refs": [], 
            "product_reasoning": "Extraction Failed",
            "volume_signal": "LOW",
            "complexity_tier": "SIMPLE",
            "journey_stage": "USAGE",
            "is_error": True,
            "error_detail": error_msg,
            "original_question": question,
            "original_answer": answer
        }

# ==============================================================================
# 4. HELPER FUNCTIONS (Preserved)
# ==============================================================================
def generate_id(prefix):
    return f"{prefix}_{str(uuid.uuid4())[:8]}"

def create_evidence(text, source_url):
    text_hash = hashlib.md5(text.encode()).hexdigest()[:8]
    return {
        "id": f"EV_{text_hash}",
        "type": "EvidenceAnchor",
        "extracted_text": text,
        "source_url": source_url,
        "extraction_method": "rule_based"
    }

def identify_responsible_party(text):
    text_lower = text.lower()
    if 'dealer' in text_lower or 'retailer' in text_lower: return 'RP_DEALER_O'
    if 'dmv' in text_lower or 'state' in text_lower: return 'RP_DMV'
    if 'call' in text_lower or 'contact' in text_lower: return 'RP_TFS_CC'
    if 'mail' in text_lower: return 'RP_TFS_OPS'
    if 'app' in text_lower or 'online' in text_lower or 'log in' in text_lower: return 'RP_TFS_DIG'
    return 'RP_CUSTOMER'

def classify_step(text):
    text = text.lower()
    if any(x in text for x in ['call', 'dial', 'phone', 'contact']): return "CONTACT", "call", "support"
    if any(x in text for x in ['click', 'visit', 'go to', 'log in', 'sign in']): return "VIEW", "visit", "portal"
    if any(x in text for x in ['submit', 'enter', 'fill']): return "SUBMIT", "submit", "form"
    if any(x in text for x in ['download', 'pdf']): return "DOWNLOAD", "download", "document"
    if any(x in text for x in ['mail', 'send']): return "SUBMIT", "mail", "documents"
    if any(x in text for x in ['visit dealer']): return "VISIT", "visit", "dealer"
    if any(x in text for x in ['wait', 'allow', 'days']): return "WAIT", "wait for", "process"
    return "VIEW", "review", "information"

def derive_leakage(step_id, is_offline, text, evidence_id):
    leakages = []
    if is_offline:
        leakages.append({
            "id": generate_id("VL"),
            "type": "ValueLeakage",
            "leakage_type": "TIME",
            "magnitude": "HIGH",
            "driver": f"Offline step required: {text[:30]}...",
            "step_ref": step_id,
            "evidence_ref": evidence_id
        })
    return leakages

def analyze_step(text, step_seq, path_id, source_url):
    text = text.strip()
    if len(text) < 10: return None 
    
    evidence = create_evidence(text, source_url)
    party_id = identify_responsible_party(text)
    is_offline = party_id not in ['RP_TFS_DIG'] and 'online' not in text.lower() and 'app' not in text.lower()
    step_id = generate_id(f"STEP_{step_seq}")
    action_type, verb, obj = classify_step(text)

    step = {
        "id": step_id,
        "type": "InstructionStep",
        "journey_path_ref": path_id,
        "sequence": step_seq,
        "instruction": text,
        "action_type": action_type,
        "verb": verb,
        "object": obj,
        "responsible_party_ref": party_id,
        "is_offline": is_offline,
        "is_manual": is_offline,
        "evidence_ref": evidence['id']
    }

    condition = None
    if text.lower().startswith(('if ', 'unless ', 'note:')):
        condition = {
            "id": generate_id("COND"),
            "type": "Condition",
            "trigger": text.split(',')[0] if ',' in text else text[:50],
            "consequence": "See instruction",
            "impact": "MEDIUM",
            "step_ref": step_id,
            "evidence_ref": evidence['id']
        }
        
    return {
        "step": step,
        "evidence": evidence,
        "has_condition": condition,
        "leakages": derive_leakage(step_id, is_offline, text, evidence['id'])
    }

# ==============================================================================
# 5. INITIALIZE GRAPH & STATIC DATA
# ==============================================================================
FULL_PRODUCT_NODES = {
    "PROD_LEASE": { **STATIC_PRODUCTS["PROD_LEASE"], "category": "FINANCING", "complexity": "HIGH", "lifecycle_stages": ["ORIGINATION", "USAGE", "RENEWAL_EXIT"], "support_phone": "1-800-874-8822" },
    "PROD_RETAIL": { **STATIC_PRODUCTS["PROD_RETAIL"], "category": "FINANCING", "complexity": "MEDIUM", "lifecycle_stages": ["ORIGINATION", "USAGE", "PAYOFF"], "support_phone": "1-800-874-8822" },
    "PROD_VSA": { **STATIC_PRODUCTS["PROD_VSA"], "category": "PROTECTION", "complexity": "MEDIUM", "lifecycle_stages": ["USAGE", "CLAIMS"], "support_phone": "1-800-228-8559" },
    "PROD_GAP": { **STATIC_PRODUCTS["PROD_GAP"], "category": "PROTECTION", "complexity": "LOW", "lifecycle_stages": ["USAGE", "CLAIMS"], "support_phone": "1-800-255-8713" },
    "PROD_EWU": { **STATIC_PRODUCTS["PROD_EWU"], "category": "PROTECTION", "complexity": "LOW", "lifecycle_stages": ["RENEWAL_EXIT"], "support_phone": "1-800-874-8822" },
    "PROD_TWP": { **STATIC_PRODUCTS["PROD_TWP"], "category": "PROTECTION", "complexity": "LOW", "lifecycle_stages": ["USAGE", "CLAIMS"], "support_phone": "1-800-228-8559" }
}

STATIC_CHANNELS = [
    {"id": "CH_WEB", "type": "WEB", "name": "TFS Web Portal", "contact": "toyotafinancial.com", "is_offline": False, "is_self_service": True, "availability": "24/7", "products": ["ALL"]},
    {"id": "CH_MOBILE", "type": "MOBILE", "name": "MyTFS Mobile App", "contact": "App Store/Play", "is_offline": False, "is_self_service": True, "availability": "24/7", "products": ["PROD_LEASE", "PROD_RETAIL"]},
    {"id": "CH_PHONE_MAIN", "type": "PHONE", "name": "Customer Service", "contact": "1-800-874-8822", "is_offline": True, "is_self_service": False, "availability": "Mon-Fri 8am-5pm Local", "products": ["PROD_LEASE", "PROD_RETAIL"]}
]

STATIC_RESPONSIBLE_PARTIES = [
    {"id": "RP_CUSTOMER", "name": "Customer", "type": "CUSTOMER", "role": "Primary actor", "controllability": "HIGH", "is_human": True},
    {"id": "RP_TFS_CC", "name": "TFS Contact Center", "type": "INTERNAL", "role": "Phone support agent", "controllability": "HIGH", "is_human": True},
    {"id": "RP_DEALER_O", "name": "Originating Dealer", "type": "EXTERNAL", "role": "Vehicle return location", "controllability": "MEDIUM", "is_human": True},
    {"id": "RP_TFS_DIG", "name": "TFS Digital Platform", "type": "INTERNAL", "role": "Web/Mobile Interface", "controllability": "HIGH", "is_human": False},
    {"id": "RP_DMV", "name": "State DMV", "type": "EXTERNAL", "role": "Regulatory Body", "controllability": "LOW", "is_human": True},
    {"id": "RP_TFS_OPS", "name": "TFS Operations", "type": "INTERNAL", "role": "Back-office processing", "controllability": "HIGH", "is_human": True}
]

knowledge_graph = {
    "products": FULL_PRODUCT_NODES,
    "channels": STATIC_CHANNELS,
    "responsible_parties": STATIC_RESPONSIBLE_PARTIES,
    "intents": {},
    "journey_paths": [],
    "steps": [],
    "conditions": [],
    "evidence_anchors": [],
    "value_leakages": [],
    "content_assets": []
}

# ==============================================================================
# 6. MAIN PROCESSING LOOP
# ==============================================================================

if DEBUG_SAMPLE_SIZE:
    print(f"⚠️ DEBUG MODE ACTIVE: Processing only first {DEBUG_SAMPLE_SIZE} rows.")
    df_to_process = df.head(DEBUG_SAMPLE_SIZE)
else:
    print("🚀 PRODUCTION MODE: Processing entire file.")
    df_to_process = df

unique_assets = {}
raw_intent_logs = []  # Log raw outputs before deduplication

for index, row in df_to_process.iterrows():
    print(f"Processing row {index + 1}...")
    
    question = str(row['Question']).strip()
    answer = str(row['Answer']).strip()
    source_url = str(row['Source URL']).strip()
    
    # --- GEMINI CALL ---
    intent_data = generate_intent_metadata(question, answer)
    intent_id = intent_data['id']
    
    # Keep track of raw output
    raw_intent_logs.append(intent_data)
    
    # Asset Creation
    asset_id = f"CA_{hashlib.md5(source_url.encode()).hexdigest()[:8]}"
    if source_url and asset_id not in unique_assets:
        unique_assets[asset_id] = {
            "id": asset_id,
            "type": "ContentAsset",
            "url": source_url,
            "title": f"Source: {intent_data['name']}",
            "format": "WEB_PAGE",
            "products": intent_data['product_refs'],
            "last_crawled": "2026-01-27T00:00:00Z",
            "content_hash": f"sha256:{hashlib.sha256(source_url.encode()).hexdigest()[:10]}"
        }
    
    # 2. JourneyPath
    # Only create a path if we have at least one product, OR handle orphan paths differently
    # For now, we allow paths even if product_refs is empty, defaulting to "GENERAL" or first ref
    # CAUTION: If product_refs is empty, this path will be un-anchored in the UI (or need a catch-all)
    path_product = intent_data['product_refs'][0] if intent_data['product_refs'] else "PROD_LEASE" # Just for path anchoring
    
    path_id = f"PATH_{intent_id}_PRI"
    knowledge_graph['journey_paths'].append({
        "id": path_id,
        "type": "JourneyPath",
        "path_type": "PRIMARY",
        "intent_ref": intent_id,
        "name": "Standard Process",
        "product_ref": path_product
    })

    # 3. InstructionSteps
    raw_answer = answer.replace('e.g.', 'eg') 
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', raw_answer)
    
    seq_counter = 1
    for sentence in sentences:
        result = analyze_step(sentence, seq_counter, path_id, source_url)
        if result:
            knowledge_graph['steps'].append(result['step'])
            knowledge_graph['evidence_anchors'].append(result['evidence'])
            if result['has_condition']:
                knowledge_graph['conditions'].append(result['has_condition'])
            knowledge_graph['value_leakages'].extend(result['leakages'])
            seq_counter += 1
            
    time.sleep(0.5)

knowledge_graph['content_assets'] = list(unique_assets.values())

# ==============================================================================
# 7. POST-PROCESSING: DEDUPLICATION & COMPLIANCE
# ==============================================================================

print("🧹 Running Deduplication & Compliance Checks...")

unique_intents = {}

# EXTENDED Valid Categories
VALID_CATEGORIES = [
    "LEASE_END", "PAYMENT", "CLAIMS", 
    "ORIGINATION", "ACCOUNT_MGMT", "GENERAL_SUPPORT" 
]

for intent in raw_intent_logs:
    i_id = intent['id']
    
    # 1. Enforce Category Enum
    if intent['category'] not in VALID_CATEGORIES:
        intent['category'] = "GENERAL_SUPPORT"
        
    # 2. Deduplication Logic
    if i_id not in unique_intents:
        # Create Master Node
        unique_intents[i_id] = {
            "id": i_id,
            "type": "CustomerIntent",
            "name": intent['name'],
            "category": intent['category'],
            "product_refs": intent['product_refs'],
            "volume_signal": intent['volume_signal'],
            "complexity_tier": intent['complexity_tier'],
            "journey_stage": intent['journey_stage'],
            "description": intent['description'],
            # DEBUG FIELDS (Will be removed from main graph later)
            "product_reasoning": intent.get('product_reasoning', 'N/A'),
            "faq_samples": [
                {"question": intent['original_question'], "answer_snippet": intent['original_answer']}
            ],
            "data_quality_flags": {
                "is_fallback": intent.get('is_error', False)
            }
        }
    else:
        # Merge Q&A into existing Master Node
        unique_intents[i_id]["faq_samples"].append(
             {"question": intent['original_question'], "answer_snippet": intent['original_answer']}
        )

# ==============================================================================
# 8. PREPARE SEPARATE OUTPUTS
# ==============================================================================

# A. Prepare Debug File (Contains EVERYTHING: Reasoning + Q&A Samples)
debug_output = list(unique_intents.values())

# B. Prepare Graph File (CLEAN: No Q&A, No Reasoning)
graph_intents = {}
for i_id, data in unique_intents.items():
    # Create a clean copy for the graph
    clean_node = data.copy()
    
    # Remove bulky debug fields
    clean_node.pop('faq_samples', None)      # Remove Q&A text
    clean_node.pop('product_reasoning', None) # Remove reasoning text
    
    graph_intents[i_id] = clean_node

# Assign clean intents to the main graph
knowledge_graph['intents'] = graph_intents

# ==============================================================================
# 9. SAVE FILES
# ==============================================================================

with open(OUTPUT_FILE, 'w') as f:
    json.dump(knowledge_graph, f, indent=2)

with open(INTENT_LOG_FILE, 'w') as f:
    json.dump(debug_output, f, indent=2)

print(f"✅ Generated {OUTPUT_FILE} (Clean Graph Data)")
print(f"✅ Generated {INTENT_LOG_FILE} (Full Debug Detail with Q&A)")
print(f"   - Total Questions Processed: {len(raw_intent_logs)}")
print(f"   - Unique Intents Created: {len(unique_intents)}")