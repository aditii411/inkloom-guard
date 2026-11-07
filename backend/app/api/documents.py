from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import DocumentCreate, DocumentUpdate, DocumentResponse

router = APIRouter(prefix="/documents", tags=["Documents"])

DOCUMENTS_DB = [
    {
        "id": "doc-sample-01",
        "title": "Q4 HyperGrowth Product Launch Campaign",
        "campaign_name": "Project Falcon - Global Rollout",
        "content_type": "Advertisement",
        "status": "Draft",
        "author": "Aditi Choudhary",
        "compliance_score": 42,
        "created_at": "2026-11-04 10:15 AM",
        "updated_at": "Just now",
        "content": "OMG!! Our new product is INSANELY FAST! It is 100% guaranteed to beat every competitor. Get the craziest deal NOW! Don't miss this insane opportunity!\n\n[Image: banner_hero_promo_q3.png - missing alt text]\n[Logo: Brand Icon rendered in unauthorized #FF0055 Neon Red]"
    },
    {
        "id": "doc-pipe-02",
        "title": "Enterprise AI Security Datasheet",
        "campaign_name": "CyberSec Conference 2026",
        "content_type": "Website",
        "status": "Scanning",
        "author": "Aditi Choudhary",
        "compliance_score": 72,
        "created_at": "2026-11-04 09:00 AM",
        "updated_at": "1 hour ago",
        "content": "Industry validated enterprise AI protection. Fully compliant with SOC2 guidelines."
    }
]

@router.get("", response_model=List[DocumentResponse])
def get_documents():
    return DOCUMENTS_DB

@router.post("", response_model=DocumentResponse)
def create_document(doc: DocumentCreate):
    new_doc = {
        "id": f"doc-{len(DOCUMENTS_DB) + 1}",
        "title": doc.title,
        "campaign_name": doc.campaign_name,
        "content_type": doc.content_type,
        "content": doc.content,
        "status": "Draft",
        "author": "Aditi Choudhary",
        "compliance_score": 100,
        "created_at": "Just now",
        "updated_at": "Just now"
    }
    DOCUMENTS_DB.append(new_doc)
    return new_doc

@router.get("/{doc_id}", response_model=DocumentResponse)
def get_document(doc_id: str):
    for d in DOCUMENTS_DB:
        if d["id"] == doc_id:
            return d
    raise HTTPException(status_code=404, detail="Document not found")

@router.put("/{doc_id}", response_model=DocumentResponse)
def update_document(doc_id: str, updates: DocumentUpdate):
    for d in DOCUMENTS_DB:
        if d["id"] == doc_id:
            if updates.title is not None: d["title"] = updates.title
            if updates.campaign_name is not None: d["campaign_name"] = updates.campaign_name
            if updates.content_type is not None: d["content_type"] = updates.content_type
            if updates.content is not None: d["content"] = updates.content
            if updates.status is not None: d["status"] = updates.status
            d["updated_at"] = "Just now"
            return d
    raise HTTPException(status_code=404, detail="Document not found")

@router.delete("/{doc_id}")
def delete_document(doc_id: str):
    global DOCUMENTS_DB
    DOCUMENTS_DB = [d for d in DOCUMENTS_DB if d["id"] != doc_id]
    return {"message": "Document deleted successfully"}
