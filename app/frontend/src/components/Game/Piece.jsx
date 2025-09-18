function Piece ({ pieceType }) {
    
    const pieceMap = {
        pawn: "Pawn",
        king: "King",
        queen: "Queen",
        rook: "Rook",
        bishop: "Bishop",
        knight: "Knight"
    };
    const label = pieceMap[pieceType];

    if (!label) return null;
    return (
        <div className="piece">
            <p>{label}</p>
        </div>
    );
}

export default Piece;