// React
import { useEffect, useState } from "react";
// Images
import blackPawn from "../../assets/pieces/black_pawn.png";
import whitePawn from "../../assets/pieces/white_pawn.png";
import blackQueen from "../../assets/pieces/black_queen.png";
import whiteQueen from "../../assets/pieces/white_queen.png";
import blackRook from "../../assets/pieces/black_rook.png";
import whiteRook from "../../assets/pieces/white_rook.png";
import blackBishop from "../../assets/pieces/black_bishop.png";
import whiteBishop from "../../assets/pieces/white_bishop.png";
import blackKnight from "../../assets/pieces/black_knight.png";
import whiteKnight from "../../assets/pieces/white_knight.png";

function PlayerCard ({ username, profilePicture, pieceColour, capturedPieces, friendState, turnColour }) {
    const [isTurn, setIsTurn] = useState();
    const pieceMap = {
            pawn: [whitePawn, blackPawn, "Pawn"],
            queen: [whiteQueen, blackQueen, "Queen"],
            rook: [whiteRook, blackRook, "Rook"],
            bishop: [whiteBishop, blackBishop, "Bishop"],
            knight: [whiteKnight, blackKnight, "Knight"]
    };


    useEffect(() => {
        if (turnColour === pieceColour) {
            setIsTurn(true);
        } else {
            setIsTurn(false);
        }
    }, [turnColour]);

    return (
        <>
            <div style={{ backgroundColor: (isTurn ? "var(--highlight)" : "var(--secondary)"), 
                padding: "3px", borderRadius: "6px" }}>
                <div className="player-card">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div className="pfp-container">
                            <img src={profilePicture} alt="pfp" />
                        </div>
                        <h2 style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>{username}</h2>
                        <button>{friendState}</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ width: "15px", height: "15px", backgroundColor: (pieceColour ? "#ffffff" : "#000000ff") }}/>
                        <h3 style={{ paddingLeft: "0.5rem" }}>{pieceColour ? "White" : "Black"}</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {capturedPieces.map(([piece, col], idx) => {
                            return (
                                <img key={idx} className="piece-mini" src={pieceMap[piece][col === "w" ? 0 : 1]} 
                                alt={pieceMap[piece][2]}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerCard;