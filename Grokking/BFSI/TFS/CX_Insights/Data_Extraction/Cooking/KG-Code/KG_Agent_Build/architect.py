import hashlib
from typing import List, Dict, Any, Set
from datetime import datetime
from langchain_core.output_parsers import JsonOutputParser
from langchain_google_vertexai import ChatVertexAI
from schemas import (
    Product, CustomerIntent, JourneyPath, InstructionStep, 
    EvidenceAnchor, ContentAsset, AssetType, JourneyPathWithSteps,
    Condition, Channel, ChannelType, LatencyWindow,
    EscalationPath, ResponsibleParty
)
from prompts import INTENT_PATH_PROMPT
from state import GraphState

# --- STATIC DEFINITIONS ---

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

STATIC_CHANNELS = {
    "CH_WEB": {
        "id": "CH_WEB",
        "type": ChannelType.WEB,
        "name": "TFS Web Portal",
        "contact": "toyotafinancial.com",
        "is_offline": False,
        "is_self_service": True,
        "availability": "24/7",
        "products": ["PROD_LEASE", "PROD_RETAIL", "PROD_VSA", "PROD_GAP", "PROD_EWU", "PROD_TWP"]
    },
    "CH_MOBILE": {
        "id": "CH_MOBILE",
        "type": ChannelType.MOBILE,
        "name": "MyTFS Mobile App",
        "contact": "App Store/Play",
        "is_offline": False,
        "is_self_service": True,
        "availability": "24/7",
        "products": ["PROD_LEASE", "PROD_RETAIL"]
    },
    "CH_PHONE_MAIN": {
        "id": "CH_PHONE_MAIN",
        "type": ChannelType.PHONE,
        "name": "Customer Service",
        "contact": "1-800-874-8822",
        "is_offline": False,
        "is_self_service": False,
        "availability": "Mon-Fri 8am-5pm Local",
        "products": ["PROD_LEASE", "PROD_RETAIL"]
    },
    "CH_DEALER_MAIN": {
        "id": "CH_DEALER_MAIN",
        "type": ChannelType.DEALER,
        "name": "Originating Dealer",
        "contact": "Varies by Location",
        "is_offline": True,
        "is_self_service": False,
        "availability": "Varies",
        "products": ["PROD_LEASE", "PROD_RETAIL"]
    },
    "CH_MAIL_GEN": {
        "id": "CH_MAIL_GEN",
        "type": ChannelType.MAIL,
        "name": "TFS Mail Center",
        "contact": "P.O. Box",
        "is_offline": True,
        "is_self_service": False,
        "availability": "Postal Hours",
        "products": ["PROD_LEASE", "PROD_RETAIL", "PROD_VSA", "PROD_GAP", "PROD_EWU", "PROD_TWP"]
    },
    "CH_EXT_DMV": {
        "id": "CH_EXT_DMV",
        "type": ChannelType.EXTERNAL,
        "name": "DMV / State Agency",
        "contact": "State Specific",
        "is_offline": True,
        "is_self_service": False,
        "availability": "State Hours",
        "products": ["PROD_LEASE", "PROD_RETAIL", "PROD_VSA", "PROD_GAP", "PROD_EWU", "PROD_TWP"]
    }
}

# Synonyms to merge duplicative parties
STATIC_PARTIES = {
    "CUSTOMER": ["user", "you", "borrower", "lessee", "customer", "i"],
    "DEALER": ["dealer", "dealership", "originating dealer", "retailer", "toyota dealer"],
    "TFS": ["tfs", "toyota financial", "we", "us", "lender", "toyota financial services"]
}

class GraphArchitect:
    def __init__(self):
        self.llm = ChatVertexAI(
            model_name="gemini-2.0-flash-001",
            project="upbeat-repeater-477110-q6",
            location="us-central1",
            temperature=0.0, 
            max_output_tokens=8192,
        )
        self.parser = JsonOutputParser()

    def _generate_deterministic_id(self, prefix: str, source_text: str) -> str:
        if not source_text:
            source_text = str(datetime.utcnow())
        hash_digest = hashlib.sha256(source_text.encode()).hexdigest()[:8].upper()
        return f"{prefix}_{hash_digest}"

    def _create_content_asset(self, url: str, question: str) -> ContentAsset:
        asset_id = self._generate_deterministic_id("CA", url + question)
        return ContentAsset(
            id=asset_id,
            type=AssetType.FAQ,
            url=url,
            title=question,
            products=[], 
            content_hash=hashlib.sha256((url + question).encode()).hexdigest(),
            last_crawled=datetime.utcnow()
        )
    
    def _format_product_context(self) -> str:
        context = ""
        for pid, data in STATIC_PRODUCTS.items():
            context += f"- {pid}: {data['name']} ({data['description']})\n"
        return context

    def _format_channel_context(self) -> str:
        context = ""
        for cid, data in STATIC_CHANNELS.items():
            context += f"- {cid}: {data['name']} (Type: {data['type']}, Contact: {data['contact']})\n"
        return context

    def process_entry(self, state: GraphState) -> GraphState:
        print(f"--- ARCHITECT: Processing Row {state['row_id']} ---")
        
        # 1. Context Creation
        try:
            content_asset = self._create_content_asset(state["source_url"], state["question"])
        except Exception as e:
            print(f"Error creating ContentAsset: {e}")
            return state
            
        # 2. LLM Extraction Chain
        chain = INTENT_PATH_PROMPT | self.llm | self.parser
        
        # Prepare Contexts
        product_definitions = self._format_product_context()
        channel_definitions = self._format_channel_context()
        
        try:
            result = chain.invoke({
                "url": state["source_url"],
                "product_definitions": product_definitions,
                "channel_definitions": channel_definitions,
                "question": state["question"],
                "answer": state["answer"]
            })
        except Exception as e:
            print(f"LLM Extraction Failed: {e}")
            return state

        # 3. Post-Processing & Flattening
        final_nodes = []
        id_map = {} 
        referenced_channel_ids = set() 

        # A. Add Context Nodes
        final_nodes.append(content_asset)
        
        # B. Handle Product
        identified_product_id = result.get("product_id")
        
        if identified_product_id and identified_product_id in STATIC_PRODUCTS:
            prod_data = STATIC_PRODUCTS[identified_product_id]
            product_node = Product(
                id=prod_data["id"],
                name=prod_data["name"],
                description=prod_data["description"],
                category="FINANCING", 
                complexity="MEDIUM",
                lifecycle_stages=["USAGE"], 
                source_url="STATIC_DEF"
            )
            final_nodes.append(product_node)
            content_asset.products = [identified_product_id]

        # C. Intent
        if "intent" in result:
            intent_data = result["intent"]
            intent_data["id"] = intent_data.get("id") or f"INT_{state['row_id']}"
            if identified_product_id:
                intent_data["product_refs"] = [identified_product_id]
            final_nodes.append(CustomerIntent(**intent_data))
            
        # D. Paths & Steps
        if "paths" in result:
            for path_obj in result["paths"]:
                path_model = path_obj.get("path")
                steps_list = path_obj.get("steps", [])
                
                # Assign product ONLY if identified (No default forced)
                if identified_product_id:
                    path_model["product"] = identified_product_id

                original_path_id = path_model.get("id")
                path_seed = f"{path_model.get('name')}_{state['row_id']}"
                new_path_id = self._generate_deterministic_id("PATH", path_seed)
                path_model["id"] = new_path_id
                
                if original_path_id:
                    id_map[original_path_id] = new_path_id

                path_node = JourneyPath(**path_model)
                final_nodes.append(path_node)
                
                for step_data in steps_list:
                    step_data["path_ref"] = path_node.id
                    
                    if "channel_ref" in step_data and step_data["channel_ref"]:
                        referenced_channel_ids.add(step_data["channel_ref"])

                    original_step_id = step_data.get("id")
                    step_seed = step_data.get("instruction", "")
                    new_step_id = self._generate_deterministic_id("STEP", step_seed)
                    step_data["id"] = new_step_id
                    
                    if original_step_id:
                        id_map[original_step_id] = new_step_id
                    
                    seq_id = f"STEP_{step_data.get('sequence', 0):02d}"
                    id_map[seq_id] = new_step_id

                    final_nodes.append(InstructionStep(**step_data))

        # E. Conditions
        if "conditions" in result:
            for cond_data in result["conditions"]:
                original_cond_id = cond_data.get("id")
                cond_seed = cond_data.get("trigger", "")
                new_cond_id = self._generate_deterministic_id("COND", cond_seed)
                cond_data["id"] = new_cond_id
                
                if original_cond_id:
                    id_map[original_cond_id] = new_cond_id
                
                # Only assign product if we have one
                if identified_product_id:
                    cond_data["product"] = identified_product_id

                try:
                    condition_node = Condition(**cond_data)
                    final_nodes.append(condition_node)
                except Exception as e:
                    print(f"Skipping invalid condition: {e}")

        # F. Latency Windows
        if "latencies" in result:
            for lat_data in result["latencies"]:
                original_lat_id = lat_data.get("id")
                lat_seed = lat_data.get("description", "")
                new_lat_id = self._generate_deterministic_id("LAT", lat_seed)
                lat_data["id"] = new_lat_id
                
                if original_lat_id:
                    id_map[original_lat_id] = new_lat_id
                
                # Only assign product if we have one
                if identified_product_id:
                    lat_data["product"] = identified_product_id

                try:
                    latency_node = LatencyWindow(**lat_data)
                    final_nodes.append(latency_node)
                except Exception as e:
                    print(f"Skipping invalid latency: {e}")

        # G. Escalations
        if "escalations" in result:
            for esc_data in result["escalations"]:
                original_esc_id = esc_data.get("id")
                
                esc_seed = esc_data.get("trigger", "") + esc_data.get("destination", "")
                new_esc_id = self._generate_deterministic_id("ESC", esc_seed)
                esc_data["id"] = new_esc_id
                
                if original_esc_id:
                    id_map[original_esc_id] = new_esc_id

                if identified_product_id:
                    esc_data["products"] = [identified_product_id]
                
                try:
                    esc_node = EscalationPath(**esc_data)
                    final_nodes.append(esc_node)
                except Exception as e:
                    print(f"Skipping invalid escalation: {e}")

        # H. Responsible Parties
        if "parties" in result:
            for rp_data in result["parties"]:
                # 1. Normalization Step
                raw_name = rp_data.get("name", "").lower()
                for std_name, aliases in STATIC_PARTIES.items():
                    if any(alias in raw_name for alias in aliases):
                        rp_data["name"] = std_name
                        break
                
                # 2. ID Generation
                original_rp_id = rp_data.get("id")
                rp_seed = rp_data.get("name", "") + rp_data.get("role", "")
                new_rp_id = self._generate_deterministic_id("RP", rp_seed)
                rp_data["id"] = new_rp_id
                
                if original_rp_id:
                    id_map[original_rp_id] = new_rp_id
                
                if identified_product_id:
                    rp_data["products"] = [identified_product_id]

                try:
                    rp_node = ResponsibleParty(**rp_data)
                    final_nodes.append(rp_node)
                except Exception as e:
                    print(f"Skipping invalid party: {e}")

        # I. Add Static Channels
        for ch_id in referenced_channel_ids:
            if ch_id in STATIC_CHANNELS:
                ch_data = STATIC_CHANNELS[ch_id]
                try:
                    channel_node = Channel(**ch_data)
                    final_nodes.append(channel_node)
                except Exception as e:
                    print(f"Error creating Channel node {ch_id}: {e}")
            else:
                print(f"Warning: Unknown channel_ref '{ch_id}' found. Ignoring node creation.")

        # J. Evidence Anchors
        if "evidence" in result:
            evidence_id_map = {} 

            for ev_data in result["evidence"]:
                original_ev_id = ev_data.get("id")
                
                # Deterministic hashing for EV ID
                ev_seed = ev_data.get("extracted_text", "") + state["row_id"]
                new_ev_id = self._generate_deterministic_id("EV", ev_seed)
                ev_data["id"] = new_ev_id
                
                # FIX FOR ORPHANS: Explicitly link evidence to the ContentAsset
                ev_data["asset_ref"] = content_asset.id
                
                if original_ev_id:
                    evidence_id_map[original_ev_id] = new_ev_id

                if identified_product_id:
                    ev_data["product"] = identified_product_id
                
                new_supports = []
                for sup_id in ev_data.get("supports", []):
                    hashed_target = id_map.get(sup_id, sup_id)
                    new_supports.append(hashed_target)
                ev_data["supports"] = new_supports

                final_nodes.append(EvidenceAnchor(**ev_data))
            
            # K. BACK-PROPAGATION
            for node in final_nodes:
                if hasattr(node, "evidence_ref") and node.evidence_ref in evidence_id_map:
                    node.evidence_ref = evidence_id_map[node.evidence_ref]

        state["final_entities"] = final_nodes
        return state