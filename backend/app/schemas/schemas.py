from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    workspace_name: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar: Optional[str] = None
    title: Optional[str] = None

class DocumentCreate(BaseModel):
    title: str
    campaign_name: str
    content_type: str
    content: str

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    campaign_name: Optional[str] = None
    content_type: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None

class DocumentResponse(BaseModel):
    id: str
    title: str
    campaign_name: str
    content_type: str
    content: str
    status: str
    author: str
    compliance_score: int
    created_at: str
    updated_at: str

class ViolationResponse(BaseModel):
    id: str
    category: str
    severity: str
    detected_text: str
    suggested_fix: str
    explanation: str
    source_citation: str
    confidence_score: int
    status: str

class ScanRequest(BaseModel):
    document_id: Optional[str] = None
    title: str
    content: str
    content_type: str = "Advertisement"

class AutoFixRequest(BaseModel):
    violation_id: str
    document_content: str

class GuidelineCreate(BaseModel):
    title: str
    category: str
    severity: str
    description: str
    source: str
    section: Optional[str] = None
    tags: List[str] = []

class GuidelineResponse(BaseModel):
    id: str
    title: str
    category: str
    severity: str
    description: str
    source: str
    section: Optional[str] = None
    tags: List[str] = []
    status: str
    last_updated: str

class ApprovalSubmit(BaseModel):
    document_id: str

class ApprovalDecision(BaseModel):
    document_id: str
    decision: str # "APPROVE" or "REJECT"
    reviewer: str
    role: str
    comments: Optional[str] = None

class AuditTrailResponse(BaseModel):
    id: str
    document_id: str
    document_name: str
    user: str
    role: str
    action: str
    previous_state: str
    updated_state: str
    compliance_score: int
    timestamp: str
    audit_hash: str
