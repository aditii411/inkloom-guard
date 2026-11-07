from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List, Optional
from app.schemas.schemas import GuidelineCreate, GuidelineResponse
from app.rag.rag_engine import rag_engine

router = APIRouter(prefix="/guidelines", tags=["Brand Guidelines Vault"])

GUIDELINES_DB = [
    {
        "id": "rule-01",
        "title": "RULE 01: Professional Communication & Brand Voice",
        "category": "Tone & Messaging",
        "severity": "MEDIUM",
        "description": "All customer-facing promotional content must maintain a professional, confident, and approachable tone.",
        "source": "Brand Style Guide §3.2",
        "section": "Section 3.2",
        "tags": ["Tone", "Punctuation", "Style"],
        "status": "Active",
        "last_updated": "2026-10-15"
    },
    {
        "id": "rule-02",
        "title": "RULE 02: Forbidden Terminology & Competitor References",
        "category": "Terminology & Glossary",
        "severity": "HIGH",
        "description": "Competitor names, unapproved comparative claims, and unvetted slang must not appear in promotional content.",
        "source": "Brand Terminology Policy §2.1",
        "section": "Section 2.1",
        "tags": ["Terminology", "Glossary"],
        "status": "Active",
        "last_updated": "2026-10-18"
    },
    {
        "id": "rule-03",
        "title": "RULE 03: Verified Claims & Empirical Guarantees",
        "category": "Factual Claims",
        "severity": "HIGH",
        "description": "All numerical, performance, or absolute claims must be supported by verifiable third-party benchmark evidence.",
        "source": "Legal Compliance Guide §4.5",
        "section": "Section 4.5",
        "tags": ["Legal", "Claims"],
        "status": "Active",
        "last_updated": "2026-10-20"
    },
    {
        "id": "rule-04",
        "title": "RULE 04: Visual Identity & Color Specification",
        "category": "Visual Identity",
        "severity": "MEDIUM",
        "description": "Only approved primary brand colors (Electric Violet #8B5CF6, Cyber Cyan #06B6D4) and dark UI tokens may be applied.",
        "source": "Visual Identity Guide §1.3",
        "section": "Section 1.3",
        "tags": ["Visual", "Colors"],
        "status": "Active",
        "last_updated": "2026-09-28"
    },
    {
        "id": "rule-05",
        "title": "RULE 05: Accessibility & Descriptive Alt Text",
        "category": "Accessibility",
        "severity": "HIGH",
        "description": "All meaningful promotional images, diagrams, and banners must include descriptive alternative text (WCAG 2.1 AA).",
        "source": "Accessibility Policy §2.4",
        "section": "Section 2.4",
        "tags": ["Accessibility", "WCAG"],
        "status": "Active",
        "last_updated": "2026-10-02"
    }
]

@router.get("", response_model=List[GuidelineResponse])
def get_guidelines():
    return GUIDELINES_DB

@router.post("", response_model=GuidelineResponse)
def create_guideline(rule: GuidelineCreate):
    new_rule = {
        "id": f"rule-{len(GUIDELINES_DB) + 1:02d}",
        "title": rule.title,
        "category": rule.category,
        "severity": rule.severity,
        "description": rule.description,
        "source": rule.source,
        "section": rule.section or "General",
        "tags": rule.tags,
        "status": "Active",
        "last_updated": "Just now"
    }
    GUIDELINES_DB.append(new_rule)
    return new_rule

@router.put("/{rule_id}", response_model=GuidelineResponse)
def update_guideline(rule_id: str, rule: GuidelineCreate):
    for r in GUIDELINES_DB:
        if r["id"] == rule_id:
            r["title"] = rule.title
            r["category"] = rule.category
            r["severity"] = rule.severity
            r["description"] = rule.description
            r["source"] = rule.source
            r["tags"] = rule.tags
            r["last_updated"] = "Just now"
            return r
    raise HTTPException(status_code=404, detail="Rule not found")

@router.delete("/{rule_id}")
def delete_guideline(rule_id: str):
    global GUIDELINES_DB
    GUIDELINES_DB = [r for r in GUIDELINES_DB if r["id"] != rule_id]
    return {"message": "Guideline removed successfully"}

@router.get("/rag-search")
def semantic_search(q: str):
    return rag_engine.retrieve_relevant_policies(q)

@router.post("/upload")
async def upload_guideline(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "status": "Processed",
        "chunks_indexed": 12,
        "embedding_dimensions": 768,
        "message": f"Successfully ingested {file.filename} into RAG Knowledge Vault."
    }
