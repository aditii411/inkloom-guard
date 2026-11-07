import os
import json
import httpx
from typing import List, Dict, Any
from app.ai.rule_engine import rule_engine

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        self.api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    async def analyze_compliance(self, text: str, content_type: str = "Advertisement") -> Dict[str, Any]:
        """
        Analyze content using Google Gemini API if key is present;
        Otherwise fallback cleanly to deterministic rule-based engine.
        """
        if not self.api_key:
            # Fallback to rule engine
            violations = rule_engine.scan_content(text)
            score = rule_engine.calculate_score(violations)
            return {
                "engine": "Deterministic Fallback Engine (Demo Verified)",
                "violations": violations,
                "compliance_score": score,
                "is_ai_live": False
            }

        prompt = f"""
You are the AI Brand Governance Engine for 'Inkloom Guard'.
Audit the following marketing copy against 5 brand governance pillars:
1. Tone & Style
2. Terminology & Glossary
3. Factual & Promotional Claims
4. Visual & Accessibility
5. Legal & Regulatory

Target Copy:
\"\"\"{text}\"\"\"

Return a valid JSON object with the key 'violations' containing a list of objects with:
- id: string
- category: string
- severity: "HIGH" | "MEDIUM" | "LOW"
- detected_text: exact string in text
- suggested_fix: improved compliant phrasing
- explanation: rationale
- source_citation: brand guide section
- confidence_score: int (1-100)
- status: "Open"
"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{self.api_url}?key={self.api_key}",
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {"temperature": 0.2, "response_mime_type": "application/json"}
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(raw_text)
                    violations = parsed.get("violations", [])
                    score = rule_engine.calculate_score(violations)
                    return {
                        "engine": "Google Gemini 1.5 Flash (Live)",
                        "violations": violations,
                        "compliance_score": score,
                        "is_ai_live": True
                    }
        except Exception:
            pass

        # Clean fallback
        violations = rule_engine.scan_content(text)
        score = rule_engine.calculate_score(violations)
        return {
            "engine": "Deterministic Fallback Engine (Demo Verified)",
            "violations": violations,
            "compliance_score": score,
            "is_ai_live": False
        }

gemini_service = GeminiService()
