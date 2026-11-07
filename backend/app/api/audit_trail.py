from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import AuditTrailResponse

router = APIRouter(prefix="/audit-trail", tags=["Audit Trail"])

AUDIT_LOGS_DB = [
    {
        "id": "audit-001",
        "document_id": "doc-sample-01",
        "document_name": "Q4 HyperGrowth Product Launch Campaign",
        "user": "Aditi Choudhary",
        "role": "Creator",
        "action": "Document Created",
        "previous_state": "None",
        "updated_state": "Draft",
        "compliance_score": 42,
        "timestamp": "2026-11-04 10:15:22",
        "audit_hash": "8f4b23c91e0a9d82e176b94c34a123df658b432a90e32b45cf0912ab7364d901"
    },
    {
        "id": "audit-002",
        "document_id": "doc-sample-01",
        "document_name": "Q4 HyperGrowth Product Launch Campaign",
        "user": "System (AI Diagnostic Engine)",
        "role": "System",
        "action": "Audit Initiated",
        "previous_state": "Draft",
        "updated_state": "Scanning",
        "compliance_score": 42,
        "timestamp": "2026-11-04 10:16:04",
        "audit_hash": "7a9e34c982312fb44901abdc2193f54817a23efbc01289de349281ab8912ef02"
    },
    {
        "id": "audit-003",
        "document_id": "doc-sample-01",
        "document_name": "Q4 HyperGrowth Product Launch Campaign",
        "user": "System (AI Diagnostic Engine)",
        "role": "System",
        "action": "Violations Detected (8)",
        "previous_state": "Scanning",
        "updated_state": "Issues Flagged",
        "compliance_score": 42,
        "timestamp": "2026-11-04 10:16:18",
        "audit_hash": "19ab840e9271ac820f845d098e213bfa76210ef89a0123cb9845720deaf18243"
    },
    {
        "id": "audit-004",
        "document_id": "doc-prev-09",
        "document_name": "Annual Sustainability Whitepaper",
        "user": "Khushi Chouhan",
        "role": "Brand Manager",
        "action": "Document Approved",
        "previous_state": "In Review",
        "updated_state": "Approved",
        "compliance_score": 98,
        "timestamp": "2026-11-03 04:45:10",
        "audit_hash": "32fd891e45cb6701a2389e023847acff8910243bcda9018274ef901235678129"
    }
]

@router.get("", response_model=List[AuditTrailResponse])
def get_audit_trail():
    return AUDIT_LOGS_DB

@router.get("/{log_id}", response_model=AuditTrailResponse)
def get_audit_log(log_id: str):
    for l in AUDIT_LOGS_DB:
        if l["id"] == log_id:
            return l
    raise HTTPException(status_code=404, detail="Audit log entry not found")
