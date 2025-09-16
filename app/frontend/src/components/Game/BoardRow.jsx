function BoardTile({ tileType, tileNum, tileLetter, piece, onTileSelect }) {

    return (
        <div className={`board-tile ${tileType === "dark" ? "dark" : ""}`}
            onClick={() => onTileSelect(tileLetter+tileNum)}>
            {piece !== undefined ? piece : null}
        </div>
    );
}


function BoardRow ({ rowType, rowIndex, boardType, boardState, onTileSelect }) {
    // Variables
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
                    onTileSelect={onTileSelect} />
                )
            })}
        </div>
    )
}

export default BoardRow;