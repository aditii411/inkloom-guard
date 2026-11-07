from fastapi import APIRouter, HTTPException
from app.schemas.schemas import UserLogin, UserRegister, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

MOCK_USERS = {
    "aditi@ctrlshe.org": {
        "id": "user-1",
        "name": "Aditi Choudhary",
        "email": "aditi@ctrlshe.org",
        "role": "Creator",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "title": "Lead Content Strategist"
    },
    "khushi@ctrlshe.org": {
        "id": "user-2",
        "name": "Khushi Chouhan",
        "email": "khushi@ctrlshe.org",
        "role": "Brand Manager",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "title": "Head of Global Brand Governance"
    },
    "sanskrati@ctrlshe.org": {
        "id": "user-3",
        "name": "Sanskrati Yadav",
        "email": "sanskrati@ctrlshe.org",
        "role": "Legal Compliance Reviewer",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        "title": "Senior Legal Counsel"
    },
    "shruti@ctrlshe.org": {
        "id": "user-4",
        "name": "Shruti Jadon",
        "email": "shruti@ctrlshe.org",
        "role": "Legal Compliance Reviewer",
        "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        "title": "Regulatory Compliance Lead"
    }
}

@router.post("/login", response_model=UserResponse)
def login(creds: UserLogin):
    user = MOCK_USERS.get(creds.email.lower())
    if not user:
        # Allow default demo login
        return UserResponse(
            id="user-demo",
            name="Demo Operator",
            email=creds.email,
            role="Creator",
            title="Content Specialist"
        )
    return UserResponse(**user)

@router.post("/register", response_model=UserResponse)
def register(data: UserRegister):
    return UserResponse(
        id=f"user-{len(MOCK_USERS) + 1}",
        name=data.name,
        email=data.email,
        role="Creator",
        title=f"Member of {data.workspace_name}"
    )

@router.get("/me", response_model=UserResponse)
def get_me():
    return UserResponse(**MOCK_USERS["aditi@ctrlshe.org"])
