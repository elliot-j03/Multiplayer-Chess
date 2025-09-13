// Components
import BoardRow from "./BoardRow";

function GameBoard () {
    return (
        <>
            <div className="board">
               {[...Array(8)].map((_, i) => (
                <BoardRow key={i} rowType={i % 2} rowIndex={8 - i} />
               ))}
            </div>
        </>
    )
}

export default GameBoard;