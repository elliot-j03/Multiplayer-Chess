// Image
import blackQueen from "../../assets/pieces/black_queen.png";
import whiteQueen from "../../assets/pieces/white_queen.png";
import blackRook from "../../assets/pieces/black_rook.png";
import whiteRook from "../../assets/pieces/white_rook.png";
import blackBishop from "../../assets/pieces/black_bishop.png";
import whiteBishop from "../../assets/pieces/white_bishop.png";
import blackKnight from "../../assets/pieces/black_knight.png";
import whiteKnight from "../../assets/pieces/white_knight.png";


function PromotionSelect ({ handleDecision, pieceColour }) {
    const pieceImgs = [
        [whiteQueen, blackQueen, "q"], 
        [whiteRook, blackRook, "r"], 
        [whiteBishop, blackBishop, "b"],
        [whiteKnight, blackKnight, "k"]
    ];

    return (
        <>
            <div className="promotion-select">
                <p>Select a piece to promote to...</p>
                <div className="promotion-select-row">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ backgroundColor: "#82b765ff", padding: "5px", borderRadius: "var(--border-radius)", margin: "2px" }}>
                            <button onClick={(e) => handleDecision(e.currentTarget.id)} id={pieceImgs[i][2]} 
                            style={{ backgroundColor: "transparent", border: "none" }}>
                                <img className="piece" src={pieceImgs[i][(pieceColour ? 0 : 1)]} alt={pieceImgs[i][2]} />
                            </button>
                        </div>
                    ))}
                </div> 
            </div>
        </>
    )
}

export default PromotionSelect;