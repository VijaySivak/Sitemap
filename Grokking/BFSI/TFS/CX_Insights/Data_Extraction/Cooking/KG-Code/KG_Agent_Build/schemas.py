from typing import List, Optional, Any
from enum import Enum
from datetime import datetime
from pydantic import BaseModel, Field

# --- Enums ---

class ChannelType(str, Enum):
    WEB = "WEB"
    MOBILE = "MOBILE"
    PHONE = "PHONE"
    DEALER = "DEALER"
    MAIL = "MAIL"
    EXTERNAL = "EXTERNAL"

class AssetType(str, Enum):
    FAQ = "FAQ"
    PAGE = "PAGE"
    DOCUMENT = "DOCUMENT"
    TOOL = "TOOL"
    VIDEO = "VIDEO"

class ActionType(str, Enum):
    VIEW = "VIEW"
    DOWNLOAD = "DOWNLOAD"
    SCHEDULE = "SCHEDULE"
    CONTACT = "CONTACT"
    SUBMIT = "SUBMIT"
    SIGN = "SIGN"
    WAIT = "WAIT"
    BRING = "BRING"
    CANCEL = "CANCEL"

class LeakageType(str, Enum):
    ABANDON = "ABANDON"
    CALL_DEFLECTION = "CALL_DEFLECTION"
    COMPLAINT = "COMPLAINT"
    REPEAT_CONTACT = "REPEAT_CONTACT"
    UNKNOWN = "UNKNOWN"

class OpportunityType(str, Enum):
    AUTOMATION = "AUTOMATION"
    CONTENT_GAP = "CONTENT_GAP"
    PROCESS_IMPROVEMENT = "PROCESS_IMPROVEMENT"
    UNKNOWN = "UNKNOWN"

class SentimentPlatform(str, Enum):
    REDDIT = "REDDIT"
    TWITTER = "TWITTER"
    FORUM = "FORUM"
    SURVEY = "SURVEY"
    UNKNOWN = "UNKNOWN"

class SentimentPolarity(str, Enum):
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"
    NEUTRAL = "NEUTRAL"
    MIXED = "MIXED"

# --- Entities ---

class Product(BaseModel):
    id: str
    name: str
    description: str
    category: str
    complexity: str
    lifecycle_stages: List[str]
    support_phone: Optional[str] = None
    source_url: str

class CustomerIntent(BaseModel):
    id: str
    name: str
    category: str
    # CHANGED: Default to empty list instead of required
    product_refs: List[str] = Field(default_factory=list)
    volume_signal: Optional[str] = None
    complexity_tier: Optional[str] = None
    journey_stage: Optional[str] = None
    description: str

class ContentAsset(BaseModel):
    id: str
    type: AssetType
    url: str
    title: str
    format: Optional[str] = None
    products: List[str] = Field(default_factory=list)
    last_crawled: datetime
    content_hash: str

class Channel(BaseModel):
    id: str
    type: ChannelType
    name: str
    contact: str
    is_offline: bool
    is_self_service: bool
    availability: str
    products: List[str] = Field(default_factory=list)

class JourneyPath(BaseModel):
    id: str
    path_type: str
    name: str
    is_digital_contained: bool
    # CHANGED: Optional instead of required str
    product: Optional[str] = None
    trigger: Optional[str] = None
    ranking: Optional[int] = None

class InstructionStep(BaseModel):
    id: str
    sequence: int
    action_type: Optional[ActionType] = None
    verb: str
    object: str
    channel_ref: Optional[str] = None
    is_offline: bool = False
    is_manual: bool = False
    requires_auth: bool = False
    instruction: str
    path_ref: Optional[str] = None
    evidence_ref: Optional[str] = None

class Condition(BaseModel):
    id: str
    type: str
    trigger: str
    consequence: str
    impact: str
    # CHANGED: Optional instead of required str
    product: Optional[str] = None
    source: str
    evidence_ref: Optional[str] = None

class LatencyWindow(BaseModel):
    id: str
    description: str
    duration: str
    unit: str
    type: str
    controllable: bool
    creates_inquiry: bool
    # CHANGED: Optional instead of required str
    product: Optional[str] = None
    source: str
    evidence_ref: Optional[str] = None

class EscalationPath(BaseModel):
    id: str
    trigger: str
    destination: str
    severity: str
    avoidable: bool
    # CHANGED: Default to empty list
    products: List[str] = Field(default_factory=list)
    phone: Optional[str] = None

class ResponsibleParty(BaseModel):
    id: str
    name: str
    type: str
    role: str
    controllability: str
    is_human: bool
    # CHANGED: Default to empty list
    products: List[str] = Field(default_factory=list)

class EvidenceAnchor(BaseModel):
    id: str
    source_url: str
    source_type: str = "OFFICIAL_FAQ"
    extracted_text: str
    extraction_date: datetime = Field(default_factory=datetime.utcnow)
    extraction_method: str = "gemini-2.0-flash"
    confidence: float
    supports: List[str] = Field(default_factory=list)
    product: Optional[str] = None
    asset_ref: Optional[str] = None

# --- Missing Classes Restored ---

class ValueLeakage(BaseModel):
    id: str = Field(..., pattern=r'^VL_[A-Z0-9_]+$')
    label: str = "ValueLeakage"
    type: LeakageType = LeakageType.UNKNOWN
    driver: str
    proxy: str
    magnitude: str 
    product: str
    friction_ref: str

class OpportunitySignal(BaseModel):
    id: str = Field(..., pattern=r'^OPP_[A-Z0-9_]+$')
    label: str = "OpportunitySignal"
    type: OpportunityType = OpportunityType.UNKNOWN
    description: str
    readiness: str
    blockers: Optional[List[str]] = None
    product: str
    theme: str
    impact: Optional[str] = None

class SentimentSignal(BaseModel):
    id: str = Field(..., pattern=r'^SENT_[A-Z0-9_]+$')
    label: str = "SentimentSignal"
    platform: SentimentPlatform = SentimentPlatform.UNKNOWN
    theme: str
    polarity: SentimentPolarity = SentimentPolarity.NEUTRAL
    mention_count: int
    date_range: str
    product: str
    sample_verbatims: List[str]
    source_urls: List[str]

# --- Composites ---

class JourneyPathWithSteps(JourneyPath):
    steps: List[InstructionStep] = Field(default_factory=list)