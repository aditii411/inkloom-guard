from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, documents, audit, guidelines, approvals, analytics, audit_trail
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-Powered Brand Governance & Pre-Publication Compliance Platform (Team CTRL+ She)",
    version="2.4.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(audit.router, prefix=settings.API_V1_STR)
app.include_router(guidelines.router, prefix=settings.API_V1_STR)
app.include_router(approvals.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(audit_trail.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "platform": "Inkloom Guard",
        "tagline": "AI-Powered Brand Governance & Pre-Publication Compliance",
        "team": settings.TEAM_NAME,
        "team_members": [
            "Aditi Choudhary",
            "Khushi Chouhan",
            "Sanskrati Yadav",
            "Shruti Jadon"
        ],
        "workspace": settings.WORKSPACE_NAME,
        "api_docs": "/docs",
        "health": "OK"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Inkloom Guard FastAPI Core",
        "version": "2.4.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
