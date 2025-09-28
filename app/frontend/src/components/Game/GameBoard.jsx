// Components
import BoardRow from "./BoardComponents";


function GameBoard ({ boardType, boardState, selectedTile, onPieceMove }) {

    return (
        <>
            <div className="board">
            {[...Array(8)].map((_, i) => (
                <BoardRow key={i} rowType={i % 2} 
                rowIndex={8 - i}
                boardType={boardType}
                boardState={boardState}
                onTileSelect={onPieceMove}
                selectedTile={selectedTile} />
            ))}
            </div>
            {/* <p>selected tile: {selectedTile}</p> */}
        </>
    )   
}

export default GameBoard;