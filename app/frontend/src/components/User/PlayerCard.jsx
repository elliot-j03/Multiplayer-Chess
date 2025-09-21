// React
import { useEffect, useState } from "react";

function PlayerCard ({ username, profilePicture, pieceColour, capturedPieces, friendState, turnColour }) {
    const [isTurn, setIsTurn] = useState();

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

                    <p>{capturedPieces}</p>
                </div>
            </div>
        </>
    )
}

export default PlayerCard;