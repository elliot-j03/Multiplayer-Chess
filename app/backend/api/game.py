from fastapi import WebSocket, APIRouter
import json


game_router = APIRouter()


def move_auth(board_state: dict, prev_tile: str, req_tile: str):
    tile_chars: tuple = (prev_tile[0], prev_tile[1])
    validTile: str = tile_chars[0] + (str(int(tile_chars[1]) + 1))
    change: bool = False

    if not board_state.get(prev_tile):
        return board_state, change

    piece: str = board_state[prev_tile][0]
    colour: str = board_state[prev_tile][1]
    if piece == "pawn" and req_tile == validTile:
        board_state[req_tile] = [piece, colour]
        board_state[prev_tile] = None
        change = True

    return board_state, change


@game_router.websocket("/game-socket")
async def game_socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        data = json.loads(data)
        
        current_brd_state = dict(data["board_state"])
        prev_tile = data["prev_tile"]
        req_tile = data["req_tile"]

        new_brd_state, change = move_auth(current_brd_state, prev_tile, req_tile)
        await websocket.send_text(json.dumps({
            "boardState": new_brd_state,
            "change": change}))