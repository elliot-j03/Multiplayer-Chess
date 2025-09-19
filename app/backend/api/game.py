import json
from fastapi import WebSocket, APIRouter
from services.chess_logic import move_auth
from api.schemas import RequestMatch


game_router = APIRouter()


@game_router.post("/game/match-search")
async def match_search(data: RequestMatch):
    pass


@game_router.websocket("/game/client-socket")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data = json.loads(data)
        
        prev_tile = data["prev_tile"]
        req_tile = data["req_tile"]

        new_board_state, change, is_check = move_auth(prev_tile, req_tile)
        await websocket.send_text(json.dumps({
            "boardState": new_board_state,
            "change": change,
            "isCheck": is_check }))