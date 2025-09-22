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


# Saves the state of the game
class GameState():
    def __init__(self):
        self.is_check: bool = False
        self.is_checkmate: bool = False
        self.is_stalemate: bool = False
        self.is_insuff_mats: bool = False
        self.turn_colour: bool = True

game_state = GameState()


def state_check() -> None:
    game_state.is_check = board.is_check()
    game_state.is_checkmate = board.is_checkmate()
    game_state.is_stalemate = board.is_stalemate()
    game_state.is_insuff_mats = board.is_insufficient_material()
    game_state.turn_colour = board.turn


# Converting the FEN string to JSON
def fen_to_json(board_fen) -> dict:
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
def move_auth(move_str: str) -> tuple:
    piece_moved: bool = False

    try:    
        move = chess.Move.from_uci(move_str)

        if move in board.legal_moves:
            piece_moved = True
            board.push(move)
    
            state_check()

            return fen_to_json(board.fen()), {
                "pieceMoved": piece_moved,
                "turnColour": game_state.turn_colour,
                "isCheck": game_state.is_check,
                "isCheckMate": game_state.is_checkmate,
                "isStaleMate": game_state.is_stalemate,
                "isInsufficientMaterial": game_state.is_insuff_mats
            }
    except Exception as e:
        print(f"[ERROR] chess_logic.py/move_auth: {e}")
    
    return None, {
        "pieceMoved": piece_moved,
        "turnColour": game_state.turn_colour,
        "isCheck": game_state.is_check,
        "isCheckMate": game_state.is_checkmate,
        "isStaleMate": game_state.is_stalemate,
        "isInsufficientMaterial": game_state.is_insuff_mats
    } 