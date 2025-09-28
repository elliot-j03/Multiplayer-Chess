import json
from fastapi import WebSocket, APIRouter
from services.chess_logic import move_auth
from services.match_pool import MatchPool
from api.schemas import Matchmaking


game_router = APIRouter()


mp = MatchPool()

@game_router.post("/game/match-search")
async def match_search(data: Matchmaking):
    uid: str = data.client_uid

    match_state: dict = mp.add_plyr(uid)
    return match_state


@game_router.post("/game/match-search/cancel")
async def cancel_search(data: Matchmaking):
    uid: str = data.client_uid

    request_outcome: dict = mp.cancel_search(uid)
    return request_outcome


@game_router.websocket("/game/client-socket")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data = json.loads(data)
        
        move_str: str = data["move_str"]

        new_board_state, game_state = move_auth(move_str)
        await websocket.send_text(json.dumps({
            "boardState": new_board_state,
            "gameState": game_state}))