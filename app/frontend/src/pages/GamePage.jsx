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
    const [isCheck, setIsCheck] = useState(false);


    async function handleTileClick (newTileID) {
        if (selectedTile !== "") {
            // Logic on previously selected tile
            try {
                const moveResponse = await sendPieceMove(selectedTile, newTileID);
                
                console.log("CHANGE: " + moveResponse?.change);
                console.log("CHECK: " + moveResponse?.check);
                setIsCheck(moveResponse?.check);

                if (moveResponse?.change === true) {
                    setBoardState(moveResponse.state);
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
                pieceColour={"black"}
                capturedPieces={"none"}/>
                <div className="board-container">
                    <GameBoard boardType={boardType}
                    boardState={boardState}
                    selectedTile={selectedTile} 
                    onPieceMove={handleTileClick}/>
                </div>
                <PlayerCard 
                username={"player 1"}
                friendState={"add"}
                pieceColour={"white"}
                capturedPieces={"none"}/>
                <h1>{isCheck ? "Check!" : ""}</h1>
            </div>
        </>
    )
}

export default GamePage;