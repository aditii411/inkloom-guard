import math
from typing import List, Dict, Any

class RAGEngine:
    def __init__(self):
        self.chunks = [
            {
                "id": "chunk-01",
                "rule_id": "rule-01",
                "title": "RULE 01: Professional Communication",
                "source": "Brand Style Guide §3.2",
                "text": "All customer-facing promotional content must maintain a professional, confident, and approachable tone. Avoid sensational slang, excessive punctuation (e.g. '!!', '???'), hyperbolic buzzwords, or colloquial shouting.",
                "keywords": ["tone", "voice", "professional", "slang", "omg", "exclamation", "insanely", "fast"]
            },
            {
                "id": "chunk-02",
                "rule_id": "rule-02",
                "title": "RULE 02: Forbidden Terminology & Competitor References",
                "source": "Brand Terminology Policy §2.1",
                "text": "Competitor names, unapproved comparative claims, and unvetted slang ('craziest deal', 'insane opportunity') must not appear in promotional content. Use standardized product vocabulary approved in the Brand Glossary.",
                "keywords": ["terminology", "glossary", "competitor", "craziest", "deal", "insane", "opportunity", "blacklist"]
            },
            {
                "id": "chunk-03",
                "rule_id": "rule-03",
                "title": "RULE 03: Verified Claims & Empirical Guarantees",
                "source": "Legal Compliance Guide §4.5",
                "text": "All numerical, performance, or absolute claims (such as '100% guaranteed', 'beat every competitor', 'zero latency') must be supported by verifiable third-party benchmark evidence or approved legal source citations before public release.",
                "keywords": ["claim", "guarantee", "100%", "beat", "competitor", "performance", "benchmark", "legal", "evidence"]
            },
            {
                "id": "chunk-04",
                "rule_id": "rule-04",
                "title": "RULE 04: Visual Identity & Color Specification",
                "source": "Visual Identity Guide §1.3",
                "text": "Only approved primary brand colors (Electric Violet #8B5CF6, Cyber Cyan #06B6D4) and dark UI tokens may be applied to visual elements. Unauthorized neon tones (#FF0055, hot pink) or distorted badge assets violate visual consistency.",
                "keywords": ["visual", "color", "logo", "palette", "hex", "#ff0055", "#8b5cf6", "violet", "cyan"]
            },
            {
                "id": "chunk-05",
                "rule_id": "rule-05",
                "title": "RULE 05: Accessibility & Descriptive Alt Text",
                "source": "Accessibility Policy §2.4",
                "text": "All meaningful promotional images, diagrams, banners, and infographics must include descriptive alternative text (WCAG 2.1 AA compliant) ensuring screen reader compatibility and semantic accessibility.",
                "keywords": ["accessibility", "wcag", "alt", "image", "screen reader", "contrast", "descriptive"]
            }
        ]

    def retrieve_relevant_policies(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        query_words = set(query.lower().split())
        scored = []
        for chunk in self.chunks:
            overlap = sum(1 for kw in chunk["keywords"] if kw in query.lower())
            similarity = min(0.99, 0.55 + (overlap * 0.12))
            scored.append({
                "chunk_id": chunk["id"],
                "rule_id": chunk["rule_id"],
                "title": chunk["title"],
                "source": chunk["source"],
                "text_snippet": chunk["text"],
                "similarity_score": round(similarity, 3)
            })

        scored.sort(key=lambda x: x["similarity_score"], reverse=True)
        return scored[:top_k]

rag_engine = RAGEngine()
