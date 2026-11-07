import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "Inkloom Guard"
    API_V1_STR: str = "/api"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./inkloom_guard.db")
    WORKSPACE_NAME: str = "CTRL+ She Workspace"
    TEAM_NAME: str = "CTRL+ She"

settings = Settings()
