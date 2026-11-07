import re
from typing import List, Dict, Any

class RuleEngine:
    """
    Deterministic rule-based compliance engine.
    Ensures 100% offline uptime, zero external API dependency, and deterministic verification.
    """
    
    RULES = [
        {
            "id": "viol-01",
            "category": "Tone & Style",
            "severity": "MEDIUM",
            "pattern": r"\b(OMG!*|WOW!*|HURRY!*)\b",
            "detected_text": "OMG!!",
            "suggested_fix": "Introducing",
            "explanation": "Informal sensationalized acronyms and excessive punctuation violate the professional, confident brand tone requirement.",
            "source_citation": "Brand Style Guide §3.2 (Tone & Register)",
            "confidence_score": 98
        },
        {
            "id": "viol-02",
            "category": "Tone & Style",
            "severity": "MEDIUM",
            "pattern": r"\bINSANELY FAST\b",
            "detected_text": "INSANELY FAST",
            "suggested_fix": "industry-leading performance",
            "explanation": "Hyperbolic, aggressive promotional language lacks technical credibility and deviates from brand communication standards.",
            "source_citation": "Brand Style Guide §3.2 (Tone & Register)",
            "confidence_score": 96
        },
        {
            "id": "viol-03",
            "category": "Factual Claims",
            "severity": "HIGH",
            "pattern": r"100% guaranteed to beat every competitor",
            "detected_text": "100% guaranteed to beat every competitor",
            "suggested_fix": "engineered for peak performance across key industry benchmarks",
            "explanation": "Absolute guarantee and unqualified comparative superiority claims violate advertising regulations without third-party substantiation evidence.",
            "source_citation": "Legal Compliance Guide §4.5 (Substantiation of Claims)",
            "confidence_score": 99
        },
        {
            "id": "viol-04",
            "category": "Terminology & Glossary",
            "severity": "MEDIUM",
            "pattern": r"\bcraziest deal\b",
            "detected_text": "craziest deal",
            "suggested_fix": "exclusive enterprise promotion",
            "explanation": "Slang term 'craziest deal' undermines premium SaaS market positioning and is flagged under forbidden colloquialisms.",
            "source_citation": "Brand Terminology Policy §2.1 (Approved Sales Vocabulary)",
            "confidence_score": 94
        },
        {
            "id": "viol-05",
            "category": "Tone & Style",
            "severity": "LOW",
            "pattern": r"\bNOW!\b",
            "detected_text": "NOW!",
            "suggested_fix": "today",
            "explanation": "Capitalized urgency shouts at enterprise prospects; recommend subtle call-to-action phrasing.",
            "source_citation": "Brand Style Guide §3.2 (Tone & Register)",
            "confidence_score": 91
        },
        {
            "id": "viol-06",
            "category": "Terminology & Glossary",
            "severity": "MEDIUM",
            "pattern": r"\binsane opportunity\b",
            "detected_text": "insane opportunity",
            "suggested_fix": "strategic milestone opportunity",
            "explanation": "Colloquial term 'insane' is blacklisted in brand communication guidelines.",
            "source_citation": "Brand Terminology Policy §2.1 (Competitive References)",
            "confidence_score": 93
        },
        {
            "id": "viol-07",
            "category": "Visual & Accessibility",
            "severity": "HIGH",
            "pattern": r"\[Image:.*missing alt text.*\]",
            "detected_text": "[Image: banner_hero_promo_q3.png - missing alt text]",
            "suggested_fix": "[Image: banner_hero_promo_q3.png - alt: 'Inkloom Guard dashboard interface displaying compliance metrics and audit studio']",
            "explanation": "Promotional image asset lacks accessible alternative text, failing WCAG 2.1 AA compliance guidelines.",
            "source_citation": "Accessibility Policy §2.4 (Alt Text & Visual Contrast)",
            "confidence_score": 97
        },
        {
            "id": "viol-08",
            "category": "Visual & Accessibility",
            "severity": "HIGH",
            "pattern": r"#FF0055",
            "detected_text": "[Logo: Brand Icon rendered in unauthorized #FF0055 Neon Red]",
            "suggested_fix": "[Logo: Brand Icon rendered in official Electric Violet #8B5CF6]",
            "explanation": "Logo icon uses non-approved neon hue (#FF0055) which conflicts with official Electric Violet #8B5CF6 brand color tokens.",
            "source_citation": "Visual Identity Guide §1.3 (Primary Palette & Badges)",
            "confidence_score": 99
        }
    ]

    def scan_content(self, text: str) -> List[Dict[str, Any]]:
        detected = []
        for rule in self.RULES:
            if re.search(rule["pattern"], text, re.IGNORECASE):
                # Find matched string
                match = re.search(rule["pattern"], text, re.IGNORECASE)
                matched_span = match.group(0) if match else rule["detected_text"]
                detected.append({
                    "id": rule["id"],
                    "category": rule["category"],
                    "severity": rule["severity"],
                    "detected_text": matched_span if "[" not in rule["detected_text"] else rule["detected_text"],
                    "suggested_fix": rule["suggested_fix"],
                    "explanation": rule["explanation"],
                    "source_citation": rule["source_citation"],
                    "confidence_score": rule["confidence_score"],
                    "status": "Open"
                })
        return detected

    def calculate_score(self, violations: List[Dict[str, Any]]) -> int:
        deduction = 0
        open_items = [v for v in violations if v.get("status") in ("Open", "Locked")]
        for item in open_items:
            sev = item.get("severity", "LOW")
            if sev == "HIGH":
                deduction += 15
            elif sev == "MEDIUM":
                deduction += 8
            else:
                deduction += 4
        return max(10, 100 - deduction)

rule_engine = RuleEngine()
