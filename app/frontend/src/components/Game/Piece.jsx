// Images
import blackPawn from "../../assets/pieces/black_pawn.png";
import whitePawn from "../../assets/pieces/white_pawn.png";
import blackKing from "../../assets/pieces/black_king.png";
import whiteKing from "../../assets/pieces/white_king.png";
import blackQueen from "../../assets/pieces/black_queen.png";
import whiteQueen from "../../assets/pieces/white_queen.png";
import blackRook from "../../assets/pieces/black_rook.png";
import whiteRook from "../../assets/pieces/white_rook.png";
import blackBishop from "../../assets/pieces/black_bishop.png";
import whiteBishop from "../../assets/pieces/white_bishop.png";
import blackKnight from "../../assets/pieces/black_knight.png";
import whiteKnight from "../../assets/pieces/white_knight.png";

function Piece ({ pieceType, pieceColour }) {
    
    const pieceMap = {
        pawn: [whitePawn, blackPawn, "Pawn"],
        king: [whiteKing, blackKing, "King"],
        queen: [whiteQueen, blackQueen, "Queen"],
        rook: [whiteRook, blackRook, "Rook"],
        bishop: [whiteBishop, blackBishop, "Bishop"],
        knight: [whiteKnight, blackKnight, "Knight"]
    };
    const pieceImage = (pieceColour === "w" ? pieceMap[pieceType][0] : pieceMap[pieceType][1]);
    const pieceAlt = pieceMap[pieceType][2];

    if (!pieceImage) return null;
    return (
        <div className="piece">
            <img src={pieceImage} alt={pieceAlt} width="30px"/>
        </div>
    );
}

export default Piece;