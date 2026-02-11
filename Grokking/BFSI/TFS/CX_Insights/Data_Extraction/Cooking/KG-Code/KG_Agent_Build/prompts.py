from langchain_core.prompts import ChatPromptTemplate

# --- BASE SYSTEM PROMPT ---
BASE_SYSTEM_PROMPT = """You are an expert CX Knowledge Graph Architect for Toyota Financial Services.
Your goal is to extract structured entities from FAQ content to build a Neo4j knowledge graph.

CRITICAL RULES:
1. **Evidence First**: Never extract a fact (step, condition, latency) without the EXACT source text.
2. **Strict Schema**: You must output JSON that strictly matches the provided structure.
3. **No Hallucination**: If a field is not in the text, leave it null/None.
4. **Enums**: You MUST use the exact Enum values provided.
"""

# --- INTENT & PATH EXTRACTION (UPDATED) ---
INTENT_PATH_PROMPT = ChatPromptTemplate.from_messages([
    ("system", BASE_SYSTEM_PROMPT),
    ("user", """
    Analyze this FAQ content to extract the CustomerIntent, JourneyPaths, CONDITIONS, LATENCIES, ESCALATIONS, PARTIES and the associated Product.
    
    SOURCE INPUT:
    URL: {url}
    FAQ Question: {question}
    FAQ Answer: {answer}

    --- AVAILABLE PRODUCTS ---
    Choose ONE relevant product ID from this list. If the content does not strictly fit one, return null.
    {product_definitions}

    --- AVAILABLE CHANNELS ---
    Use these IDs for 'channel_ref' in steps. If the text implies a channel not listed (e.g. Fax), leave null or use nearest match.
    {channel_definitions}

    --- ANALYSIS INSTRUCTIONS ---
    1. **Identify Product**: Perform detailed matching against the definitions above.
    2. **Determine Structure**: Single Process vs Multiple Options (Fork in the road).
    3. **Entity Construction**: 
       - Assign the correct Enums for category, complexity, and stage.
       - **CRITICAL**: Break instructions into atomic steps. Capture preparatory actions (e.g., "Find dealer", "Schedule appt") as DISTINCT steps before the final action.
       - Assign 'channel_ref' from the Available Channels list.
    4. **Extract Conditions**: Look for branching logic (e.g., "If you live in Hawaii...", "Unless you have...").
    5. **Extract Latencies**: Look for wait times (e.g., "Allow 7-10 days").
    6. **Extract Escalations**: Look for "Call us if...", "Contact Support for...", or implies the user cannot do this online.
       - Trigger: What problem causes the need to call?
       - Destination: Who do they call?
       - Severity: REQUIRED (must call), RECOMMENDED (should call), INFORMATIONAL.
    7. **Extract Responsible Parties**: Who performs the work? (e.g., "The Dealer", "You/Customer", "TFS").
       - Role: What is their specific duty in this context?

    --- OUTPUT FORMAT ---
    You MUST return a JSON object with this EXACT structure:

    {{
        "product_id": "PROD_LEASE",
        "intent": {{
            "name": "Short, clear name of the user goal",
            "category": "LEASE_END", 
            "product_refs": ["PROD_LEASE"],
            "volume_signal": "HIGH", 
            "complexity_tier": "SIMPLE", 
            "journey_stage": "RENEWAL_EXIT", 
            "description": "Brief description",
            "faq_source": "{question}"
        }},
        "paths": [
            {{
                "path": {{
                    "id": "PATH_01", 
                    "path_type": "PRIMARY", 
                    "name": "Path Name",
                    "is_digital_contained": false,
                    "product": "PROD_LEASE",
                    "trigger": "User wants to..."
                }},
                "steps": [
                    {{
                        "sequence": 1,
                        "action_type": "SUBMIT",
                        "verb": "Turn in",
                        "object": "vehicle",
                        "channel_ref": "CH_DEALER_MAIN", 
                        "is_offline": true,
                        "is_manual": true,
                        "requires_auth": false,
                        "instruction": "Turn in your vehicle...",
                        "evidence_ref": "EV_STEP_01"
                    }}
                ]
            }}
        ],
        "conditions": [
            {{
                "type": "STATE",
                "trigger": "Customer resides in Hawaii",
                "consequence": "Pre-inspection NOT available",
                "impact": "HIGH",
                "product": "PROD_LEASE",
                "source": "Courtesy pre-inspection available to lease customers who do not reside in Hawaii",
                "evidence_ref": "EV_COND_01"
            }}
        ],
        "latencies": [
            {{
                "description": "Mail delivery time",
                "duration": "7-10",
                "unit": "CALENDAR_DAYS",
                "type": "MAILING",
                "controllable": false,
                "creates_inquiry": true,
                "product": "PROD_LEASE",
                "source": "allow 7-10 days for mail",
                "evidence_ref": "EV_LAT_01"
            }}
        ],
        "escalations": [
            {{
                "trigger": "General account questions",
                "destination": "Customer Service",
                "phone": "1-800-874-8822",
                "severity": "RECOMMENDED",
                "avoidable": true,
                "products": ["PROD_LEASE"],
                "evidence_ref": "EV_ESC_01"
            }}
        ],
        "parties": [
            {{
                "name": "Originating Dealer",
                "type": "EXTERNAL",
                "role": "Process vehicle return",
                "controllability": "LOW",
                "is_human": true,
                "products": ["PROD_LEASE"]
            }}
        ],
        "evidence": [
            {{
                "id": "EV_STEP_01",
                "label": "EvidenceAnchor",
                "source_url": "{url}",
                "source_type": "OFFICIAL_FAQ",
                "extracted_text": "Exact substring...",
                "confidence": 1.0,
                "supports": ["PATH_01", "STEP_01"]
            }}
        ]
    }}

    --- VALID ENUMS (USE THESE EXACTLY) ---
    - category: LEASE_END, PAYMENT, CLAIMS, ACCOUNT, GENERAL
    - volume_signal: HIGH, MEDIUM, LOW
    - complexity_tier: SIMPLE, MODERATE, COMPLEX
    - journey_stage: ORIGINATION, USAGE, RENEWAL_EXIT, SERVICE
    - path_type: PRIMARY, ALTERNATE, EXCEPTION
    - action_type: VIEW, DOWNLOAD, SCHEDULE, CONTACT, SUBMIT, SIGN, WAIT
    - ConditionType: STATE, TIME, FEE, ELIGIBILITY, ACCOUNT
    - ImpactLevel: HIGH, MEDIUM, LOW
    - LatencyUnit: BUSINESS_DAYS, CALENDAR_DAYS, BILLING_CYCLES
    - LatencyType: POSTING, PROCESSING, MAILING
    - Severity: INFORMATIONAL, RECOMMENDED, REQUIRED
    - PartyType: CUSTOMER, INTERNAL, EXTERNAL
    """)
])

# --- PRODUCT CLASSIFICATION ---
PRODUCT_CLASSIFIER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", "You are a product classifier for Toyota Financial Services."),
    ("user", """
    Given this text, identify which Product it relates to.
    
    Options:
    - PROD_LEASE (Leasing, Lease-End, Mileage, Wear & Use)
    - PROD_RETAIL (Financing, Loans, APR, Payoff)
    - PROD_SERVICE (Vehicle Service Agreements, Maintenance Plans)
    - BOTH (General account questions, Login, Address Change)

    Text: {text}
    
    Return ONLY the Product ID.
    """)
])

# --- CONTENT ANALYZER ---
CONTENT_ASSET_PROMPT = ChatPromptTemplate.from_messages([
    ("system", BASE_SYSTEM_PROMPT),
    ("user", """
    Analyze this FAQ content to populate a ContentAsset node.
    
    URL: {url}
    Question: {question}
    
    Extract:
    1. A concise `title` (usually the question).
    2. The list of `products` this applies to.
    3. The `type` (always "FAQ" for this task).
    
    Return JSON matching the ContentAsset model.
    """)
])