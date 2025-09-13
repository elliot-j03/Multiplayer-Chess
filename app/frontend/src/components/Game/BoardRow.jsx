function BoardTile({ tileType, tileNum, tileLetter }) {
  return (
    <div className={`board-tile ${tileType === "dark" ? "dark" : ""}`}>
        <p>{tileNum + tileLetter}</p>
    </div>
  );
}


function BoardRow ({ rowType, rowIndex }) {
    // Variables
    const tileLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    if (rowType === 1) {
        return (
            <div className="board-row">
                {tileLetters.map((letter, i) => (
                    <BoardTile key={i} tileType={i % 2 === 0 ? "dark" : ""} tileNum={rowIndex} tileLetter={letter} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="board-row">
                {tileLetters.map((letter, i) => (
                    <BoardTile key={i} tileType={i % 2 === 0 ? "" : "dark"} tileNum={rowIndex} tileLetter={letter} />
                ))}
            </div>
        )
    }
}

export default BoardRow;