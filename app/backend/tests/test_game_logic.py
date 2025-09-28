import unittest
from services.chess_logic import fen_to_json, move_auth


class TestGameLogic(unittest.TestCase):
    
    def test_fen_conversion(self):
        fen_str: str = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        expected: dict = {
            "a8": ["rook", "b"], "b8": ["knight", "b"], "c8": ["bishop", "b"], "d8": ["queen", "b"], 
            "e8": ["king", "b"], "f8": ["bishop", "b"], "g8": ["knight", "b"], "h8": ["rook", "b"],
            "a7": ["pawn", "b"], "b7": ["pawn", "b"], "c7": ["pawn", "b"], "d7": ["pawn", "b"],
            "e7": ["pawn", "b"], "f7": ["pawn", "b"], "g7": ["pawn", "b"], "h7": ["pawn", "b"],
            "a6": None, "b6": None, "c6": None, "d6": None,
            "e6": None, "f6": None, "g6": None, "h6": None,
            "a5": None, "b5": None, "c5": None, "d5": None,
            "e5": None, "f5": None, "g5": None, "h5": None,
            "a4": None, "b4": None, "c4": None, "d4": None,
            "e4": None, "f4": None, "g4": None, "h4": None,
            "a3": None, "b3": None, "c3": None, "d3": None,
            "e3": None, "f3": None, "g3": None, "h3": None,
            "a2": ["pawn", "w"], "b2": ["pawn", "w"], "c2": ["pawn", "w"], "d2": ["pawn", "w"],
            "e2": ["pawn", "w"], "f2": ["pawn", "w"], "g2": ["pawn", "w"], "h2": ["pawn", "w"],
            "a1": ["rook", "w"], "b1": ["knight", "w"], "c1": ["bishop", "w"], "d1": ["queen", "w"], 
            "e1": ["king", "w"], "f1": ["bishop", "w"], "g1": ["knight", "w"], "h1": ["rook", "w"]
        }

        self.assertEqual(fen_to_json(fen_str), expected)

    def test_valid_move(self):
        move: str = "e2e4"
        result = move_auth(move)

        self.assertIsInstance(result, tuple)
        self.assertEqual(len(result), 2)

        board_state, game_state = result
        self.assertIsInstance(board_state, dict)

        expected_keys = {
            "pieceMoved", "capturedPiece", "turnColour", "isCheck",
            "isCheckMate", "isStaleMate", "isInsufficientMaterial"
        }
        self.assertEqual(set(game_state.keys()), expected_keys)

        for key in ["isCheck", "isCheckMate", "isStaleMate", "isInsufficientMaterial"]:
            self.assertIsInstance(game_state[key], bool)

    def test_invalid_move(self):
        move: str = "e7e8"
        result = move_auth(move)

        self.assertIsInstance(result, tuple)
        self.assertEqual(len(result), 2)

        board_state, game_state = result
        self.assertEqual(board_state, None)

        expected_keys = {
            "pieceMoved", "capturedPiece", "turnColour", "isCheck",
            "isCheckMate", "isStaleMate", "isInsufficientMaterial"
        }
        self.assertEqual(set(game_state.keys()), expected_keys)

        for key in ["isCheck", "isCheckMate", "isStaleMate", "isInsufficientMaterial"]:
            self.assertIsInstance(game_state[key], bool)

