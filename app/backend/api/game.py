from fastapi import WebSocket, APIRouter
import json
from services.chess_logic import move_auth, fen_to_json


game_router = APIRouter()


@game_router.websocket("/game-socket")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data = json.loads(data)
        
        # current_brd_state = dict(data["board_state"])
        prev_tile = data["prev_tile"]
        req_tile = data["req_tile"]

        new_board_state, change = move_auth(prev_tile, req_tile)
        await websocket.send_text(json.dumps({
            "boardState": new_board_state,
            "change": change }))