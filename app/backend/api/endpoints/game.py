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
        
        move_str: str = data["move_str"]

        new_board_state, game_state = move_auth(move_str)
        await websocket.send_text(json.dumps({
            "boardState": new_board_state,
            "gameState": game_state}))