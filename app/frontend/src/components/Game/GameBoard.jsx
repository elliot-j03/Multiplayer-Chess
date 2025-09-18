// React
import { useState } from "react";
// Components
import BoardRow from "./BoardRow";
import { startingBoardState } from "./BoardData";


function GameBoard ({ boardType, onPieceMove }) {
    // Variables
    const [boardState, setBoardState] = useState(startingBoardState);
    const [selectedTile, setSelectedTile] = useState("");


    async function handleTileClick (newTileID) {
        if (selectedTile !== "") {
            // Logic on previously selected tile
            const moveResponse = await onPieceMove(boardState, selectedTile, newTileID);
            console.log("CHANGE: " + moveResponse?.change);
            if (moveResponse?.change === true) {
                setBoardState(moveResponse.state);
            }


            setSelectedTile("");
        } else {
            // Selecting a tile
            setSelectedTile(newTileID);
        }
    }


    return (
        <>
            <div className="board">
            {[...Array(8)].map((_, i) => (
                <BoardRow key={i} rowType={i % 2} 
                rowIndex={8 - i}
                boardType={boardType}
                boardState={boardState}
                onTileSelect={handleTileClick}
                selectedTile={selectedTile} />
            ))}
            </div>
            <p>selected tile: {selectedTile}</p>
        </>
    )
}

export default GameBoard;