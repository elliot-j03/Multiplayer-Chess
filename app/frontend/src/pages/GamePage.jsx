// API
import { sendPieceMove } from "../api/game";
// React
import { useState } from "react";
// Components
import Header from "../components/Misc/Header";
import PlayerCard from "../components/User/PlayerCard";
import GameBoard from "../components/Game/GameBoard";
import { startingBoardState } from "../components/Game/BoardData";

function GamePage () {
    const [boardType, setBoardType] = useState("white");
    const [boardState, setBoardState] = useState(startingBoardState);
    const [selectedTile, setSelectedTile] = useState("");
    // Game state
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckMate, setIsCheckMate] = useState(false);
    const [isStaleMate, setIsStaleMate] = useState(false);
    const [isInsuffMats, setIsInsuffMats] = useState(false);
    const [turnColour, setTurnColour] = useState(true);


    async function handleTileClick (newTileID) {
        if (selectedTile !== "") {
            // Logic on previously selected tile
            try {
                const moveResponse = await sendPieceMove(selectedTile, newTileID);
                
                setIsCheck(moveResponse?.gameState?.isCheck);
                setIsCheckMate(moveResponse?.gameState?.isCheckMate);
                setIsStaleMate(moveResponse?.gameState?.isStaleMate);
                setIsInsuffMats(moveResponse?.gameState?.isInsufficientMaterial);
                setTurnColour(moveResponse?.gameState?.turnColour);

                if (moveResponse?.gameState?.pieceMoved === true) {
                    setBoardState(moveResponse.boardState);
                }
                setSelectedTile("");
            } catch (err) {
                console.log("[ERROR] GameBoard.jsx/handleTileClick: " + err);
                setSelectedTile("");
            }
        } else {
            // Selecting a tile
            setSelectedTile(newTileID);
        }
    }


    return (
        <>
            <Header />
            <div className="game-page">
                <PlayerCard 
                username={"player 2"}
                friendState={"add"}
                pieceColour={false}
                capturedPieces={"none"}
                turnColour={turnColour}/>
                <div className="board-container">
                    <GameBoard boardType={boardType}
                    boardState={boardState}
                    selectedTile={selectedTile} 
                    onPieceMove={handleTileClick}/>
                </div>
                <PlayerCard 
                username={"player 1"}
                friendState={"add"}
                pieceColour={true}
                capturedPieces={"none"}
                turnColour={turnColour}/>
                <h1>{isCheck ? "Check!" : ""}</h1>
            </div>
        </>
    )
}

export default GamePage;