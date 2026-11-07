from fastapi import APIRouter
from app.schemas.schemas import ScanRequest, AutoFixRequest, ViolationResponse
from app.ai.rule_engine import rule_engine
from app.ai.gemini_service import gemini_service
from typing import List, Dict, Any

router = APIRouter(prefix="/audit", tags=["Auditing"])

@router.post("/scan")
async def run_audit_scan(req: ScanRequest):
    """
    Run brand compliance audit over supplied content.
    Uses Google Gemini if available or deterministic rule-based engine.
    """
    result = await gemini_service.analyze_compliance(req.content, req.content_type)
    return result

@router.post("/autofix")
def apply_autofix(req: AutoFixRequest):
    """
    Applies recommended remediation to target text string.
    """
    # Find matching rule
    for r in rule_engine.RULES:
        if r["id"] == req.violation_id:
            old_str = r["detected_text"]
            new_str = r["suggested_fix"]
            updated_content = req.document_content.replace(old_str, new_str)
            return {
                "success": True,
                "violation_id": req.violation_id,
                "original_text": old_str,
                "replacement_text": new_str,
                "updated_content": updated_content
            }
    return {"success": False, "detail": "Rule not found"}

@router.post("/ignore-issue")
def ignore_issue(violation_id: str):
    return {"success": True, "violation_id": violation_id, "status": "Ignored"}
