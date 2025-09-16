// React
import { useState } from "react";
// Components
import BoardRow from "./BoardRow";
import Pawn from "./Pawn";


const startingBoardState = {
    "a2": <Pawn/>
};


function GameBoard ({ boardType }) {
    // Variables
    const [boardState, setBoardState] = useState(startingBoardState);
    const [selectedTile, setSelectedTile] = useState();


    function handleTileClick (tileID) {
        setSelectedTile(tileID);
    }


    return (
        <>
            <div className="board">
            {[...Array(8)].map((_, i) => (
                <BoardRow key={i} rowType={i % 2} 
                rowIndex={8 - i}
                boardType={boardType}
                boardState={boardState}
                onTileSelect={handleTileClick} />
            ))}
            </div>
            <p>selected tile: {selectedTile}</p>
        </>
    )
}

export default GameBoard;