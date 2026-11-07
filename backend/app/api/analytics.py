from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["Analytics & Insights"])

@router.get("/overview")
def get_analytics_overview():
    return {
        "kpis": {
            "brand_health_score": 87,
            "total_audited": 248,
            "active_violations": 36,
            "auto_fix_rate": 78,
            "pending_approvals": 12,
            "avg_resolution_time": "14.2 min"
        },
        "breakdown": [
            {"category": "Tone & Style", "share": 38},
            {"category": "Terminology", "share": 24},
            {"category": "Factual Claims", "share": 20},
            {"category": "Visual Identity", "share": 10},
            {"category": "Accessibility", "share": 8}
        ]
    }

@router.get("/violations")
def get_violation_stats():
    return [
        {"category": "Tone & Style", "flagged": 85, "auto_fixed": 72},
        {"category": "Terminology", "flagged": 60, "auto_fixed": 52},
        {"category": "Factual Claims", "flagged": 45, "auto_fixed": 28},
        {"category": "Visual & A11y", "flagged": 35, "auto_fixed": 31}
    ]

@router.get("/trends")
def get_trends():
    return [
        {"day": "Oct 6", "violations": 28},
        {"day": "Oct 14", "violations": 42},
        {"day": "Oct 22", "violations": 26},
        {"day": "Oct 30", "violations": 18},
        {"day": "Nov 4", "violations": 14}
    ]
