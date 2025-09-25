from fastapi import APIRouter, HTTPException
from api.schemas import UserCreate, UserLogin


auth_router = APIRouter()


@auth_router.post("/auth/create")
async def user_create(data: UserCreate):
    # Add to DB logic
    # TEMPORARY LOGIC
    users: list = ["taken_user"]
    if data.username in users:
        raise HTTPException(status_code=409, detail="The username provided already exists")
    #

    return {
        "Success": True,
        "username": data.username,
        "email": data.email
    }


@auth_router.post("/auth/login")
async def user_login(data: UserLogin):
    # Authenticate logic
    return {"login": "successful", "email": data.email}