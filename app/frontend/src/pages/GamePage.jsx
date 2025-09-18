// API
import { sendPieceMove } from "../api/game";
// React
import { useNavigate } from "react-router-dom";
// Components
import GameBoard from "../components/Game/GameBoard";

function GamePage () {
    // Variables
    const homePath = "/";
    const navigate = useNavigate();


    return (
        <>
            <h1>Game Board</h1>
            <button onClick={() => navigate(homePath)}>Home</button>
            <GameBoard boardType={"white"} onPieceMove={sendPieceMove}/>
        </>
    )
}

export default GamePage;