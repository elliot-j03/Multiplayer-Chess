// React
import { useEffect, useState } from "react";
// Components
import BoardRow from "./BoardRow";
import Pawn from "./Pawn";


const startingBoardState = {
    "a2": <Pawn/>
};


function GameBoard ({ boardType }) {
    // Variables
    const [boardState, setBoardState] = useState(startingBoardState);
    const [selectedTile, setSelectedTile] = useState("");


    function handleTileClick (tileID) {
        if (selectedTile !== "") {
            const tileNum = Number(selectedTile[1]) + 1;
            const validTile = selectedTile[0] + tileNum.toString();

            if (boardState[selectedTile]?.type === Pawn && tileID === validTile) {
                setBoardState(prev => ({...prev, [tileID]: <Pawn />, [selectedTile]: undefined}));
            }

            setSelectedTile("");
        } else {
            setSelectedTile(tileID);
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