from fastapi import APIRouter
from api.schemas import FriendAction


user_router = APIRouter()


@user_router.post("/user/friend/request")
async def req_friend(data: FriendAction):
    pass


@user_router.post("/user/friend/accept")
async def accept_friend(data: FriendAction):
    pass


@user_router.post("/user/friend/deny")
async def deny_friend(data: FriendAction):
    pass


@user_router.post("/user/friend/remove")
async def rm_friend(data: FriendAction):
    pass