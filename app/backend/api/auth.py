from fastapi import APIRouter
from api.schemas import UserCreate, UserLogin


auth_router = APIRouter()


@auth_router.post("/auth/create")
async def user_create(data: UserCreate):
    # Add to DB logic
    return {"username": data.username, "email": data.email}

@auth_router.post("/auth/login")
async def user_login(data: UserLogin):
    # Authenticate logic
    return {"login": "successful", "email": data.email}