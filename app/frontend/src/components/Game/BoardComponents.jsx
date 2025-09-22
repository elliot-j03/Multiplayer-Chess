// Components
import Piece from "./Piece";

function BoardTile({ tileType, tileNum, tileLetter, piece, onTileSelect, selectedTile }) {
    const tileID = tileLetter + tileNum

    return (
        <div className={`board-tile ${tileType === "dark" ? "dark" : ""}`}
            onClick={() => {
                if (piece === null) {
                    onTileSelect(tileID, "_");
                } else {
                    onTileSelect(tileID, piece[0]);
                }
            }}
            style={{ backgroundColor: (selectedTile === tileID ? "#c75656ff" : null) }}>
            {piece !== undefined && piece !== null ? <Piece pieceType={piece[0]} pieceColour={piece[1]}/> : null}
        </div>
    );
}


function BoardRow ({ rowType, rowIndex, boardType, boardState, onTileSelect, selectedTile }) {
    const tileLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    return (
        <div className="board-row">
            {tileLetters.map((letter, i) => {
                const tileLetter = boardType === "white" ? letter : tileLetters[7 - i]
                const tileNum = boardType === "white" ? rowIndex : 9 - rowIndex
                const tileID = tileLetter + tileNum
                return (
                    <BoardTile key={i}
                    tileType={rowType === 1 ? (i % 2 === 0 ? "dark" : "") : (i % 2 === 0 ? "" : "dark")} 
                    tileNum={tileNum}
                    tileLetter={tileLetter}
                    piece={boardState[tileID]}
                    onTileSelect={onTileSelect}
                    selectedTile={selectedTile} />
                )
            })}
            {/* <p>{rowIndex}</p> */}
        </div>
    )
}

export default BoardRow;