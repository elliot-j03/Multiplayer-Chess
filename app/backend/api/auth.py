from fastapi import APIRouter
from pydantic import BaseModel


auth_router = APIRouter()


class AuthTest(BaseModel):
    username: str
    email: str
    password: str

@auth_router.post("/auth/create")
async def user_create(data: AuthTest):
    return {"username": data.username, "email": data.email}

@auth_router.post("/auth/login")
async def user_login(data: AuthTest):
    return {"login": "successful"}