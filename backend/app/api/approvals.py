from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import ApprovalSubmit, ApprovalDecision
from app.utils.hasher import generate_audit_hash

router = APIRouter(prefix="/approvals", tags=["Approvals Workflow"])

PIPELINE_DB = [
    {
        "id": "doc-sample-01",
        "title": "Q4 HyperGrowth Product Launch Campaign",
        "campaign": "Project Falcon - Global Rollout",
        "type": "Advertisement",
        "author": "Aditi Choudhary",
        "stage": "In Review",
        "score": 88
    },
    {
        "id": "doc-pipe-03",
        "title": "Global Partner Ecosystem Invitation",
        "campaign": "Q4 Partner Summit",
        "type": "Email",
        "author": "Khushi Chouhan",
        "stage": "Approved",
        "score": 96
    }
]

@router.get("")
def get_approvals():
    return PIPELINE_DB

@router.post("/submit")
def submit_for_approval(payload: ApprovalSubmit):
    for d in PIPELINE_DB:
        if d["id"] == payload.document_id:
            d["stage"] = "In Review"
            return {"success": True, "document_id": d["id"], "stage": "In Review"}
    return {"success": True, "document_id": payload.document_id, "stage": "In Review"}

@router.post("/approve")
def approve_document(payload: ApprovalDecision):
    if payload.role not in ("Brand Manager", "Legal Compliance Reviewer"):
        raise HTTPException(status_code=403, detail="Unauthorized role for approval")
    
    hash_val = generate_audit_hash(
        payload.document_id,
        "Approved Document",
        "Approved Content Snapshot",
        100,
        payload.reviewer,
        "2026-11-04"
    )
    return {
        "success": True,
        "document_id": payload.document_id,
        "status": "Approved",
        "audit_hash": hash_val,
        "reviewer": payload.reviewer
    }

@router.post("/reject")
def reject_document(payload: ApprovalDecision):
    return {
        "success": True,
        "document_id": payload.document_id,
        "status": "Changes Requested",
        "reason": payload.comments
    }
