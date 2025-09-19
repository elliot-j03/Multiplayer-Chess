import chess

TILES: list = ["a", "b", "c", "d", "e", "f", "g", "h"]
PIECE_MAP: dict = {
    "P": ["pawn", "w"],
    "K": ["king", "w"],
    "Q": ["queen", "w"],
    "R": ["rook", "w"],
    "B": ["bishop", "w"],
    "N": ["knight", "w"],
    "p": ["pawn", "b"],
    "k": ["king", "b"],
    "q": ["queen", "b"],
    "r": ["rook", "b"],
    "b": ["bishop", "b"],
    "n": ["knight", "b"]
}
board = chess.Board()
        

# Converting the FEN string to JSON
def fen_to_json(board_fen):
    board_state: dict = {}
    tile_count: int = 0
    row_count: int = 0
    piece_positions = board_fen.split(" ")[0]
    valid_pieces: list = list(PIECE_MAP.keys())

    for char in piece_positions:
        tile: str = TILES[tile_count] + str(8 - row_count)
        if char in valid_pieces:
            board_state[tile] = PIECE_MAP[char]
            tile_count += 1
        elif char == "/":
            continue
        else:
            for _ in range(int(char)):
                tile = TILES[tile_count] + str(8 - row_count)
                board_state[tile] = None
                tile_count += 1

        if tile_count == 8:
            row_count += 1
            tile_count = 0
    return board_state



# Validating the move of the client
def move_auth(prev_tile: str, req_tile: str):
    try:
        move = chess.Move.from_uci(prev_tile + req_tile)
    except Exception as e:
        print(f"[ERROR] chess_logic.py/move_auth: {e}")
        return None, False

    # TODO: Fix inconsisten check state
    is_check: bool = False
    piece_moved: bool = False
    if move in board.legal_moves:
        piece_moved = True
        board.push(move)
        
        if board.is_check():
            is_check = True
        return fen_to_json(board.fen()), piece_moved, is_check
    else:
        return None, piece_moved, is_check