from pydantic import BaseModel

# Auth Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# User Schemas
class FriendAction(BaseModel):
    action_tag: str
    client_uid: str
    friend_uid: str


# Game Schemas
class RequestMatch(BaseModel):
    client_uid: str