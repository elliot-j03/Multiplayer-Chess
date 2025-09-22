// API
import { sendPieceMove } from "../api/game";
// React
import { useState } from "react";
// Components
import Header from "../components/Misc/Header";
import PlayerCard from "../components/User/PlayerCard";
import GameBoard from "../components/Game/GameBoard";
import PromotionSelect from "../components/Game/PromotionSelect";
import { startingBoardState } from "../components/Game/BoardData";

function GamePage () {
    const [boardType, setBoardType] = useState("white");
    const [boardState, setBoardState] = useState(startingBoardState);
    const [prevTile, setPrevTile] = useState("");
    const [prevPiece, setPrevPiece] = useState("");
    const [promotionInView, setPromotionInView] = useState(false);
    const [pendingMove, setPendingMove] = useState("");
    // Game state
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckMate, setIsCheckMate] = useState(false);
    const [isStaleMate, setIsStaleMate] = useState(false);
    const [isInsuffMats, setIsInsuffMats] = useState(false);
    const [turnColour, setTurnColour] = useState(true);


    async function handleTileClick (newTile, pieceType) {
        if (prevTile !== "") {
            // Logic on previously selected tile
            let moveStr = prevTile + newTile;
            try {
                if ((prevTile[1] === "7" && newTile[1] === "8" && prevPiece === "pawn") ||
                    (prevTile[1] === "2" && newTile[1] === "1" && prevPiece === "pawn")) {
                    setPromotionInView(true);
                    setPendingMove(moveStr);
                    return;
                }
                
                await sendAndUpdate(moveStr);

            } catch (err) {
                console.log("[ERROR] GameBoard.jsx/handleTileClick: " + err);
                setPrevTile("");
                setPrevPiece("");
            }
        } else {
            // Selecting a tile
            setPrevTile(newTile);
            setPrevPiece(pieceType);
        }
    }

    async function sendAndUpdate(moveStr) {
        const moveResponse = await sendPieceMove(moveStr);

        setIsCheck(moveResponse?.gameState?.isCheck);
        setIsCheckMate(moveResponse?.gameState?.isCheckMate);
        setIsStaleMate(moveResponse?.gameState?.isStaleMate);
        setIsInsuffMats(moveResponse?.gameState?.isInsufficientMaterial);
        setTurnColour(moveResponse?.gameState?.turnColour);

        if (moveResponse?.gameState?.pieceMoved) {
            setBoardState(moveResponse.boardState);
        }

        setPrevTile("");
        setPrevPiece("");
    }


    async function handlePromotion (pieceSelection) {
        if (!pendingMove) return;

        const moveStr = pendingMove + pieceSelection;
        try {
            await sendAndUpdate(moveStr);
        } catch (err) {
            console.log("[ERROR] GamePage.jsx/handlePromotion: " + err);
            setPrevTile("");
            setPrevPiece("");
            setPendingMove("");
        }
        setPromotionInView(false);
    }


    return (
        <>
            <Header />
            <div className="game-page">
                <PlayerCard 
                username={"player 2"}
                friendState={"add"}
                pieceColour={false}
                capturedPieces={"none"}
                turnColour={turnColour}/>
                <div className="board-container">
                    <GameBoard boardType={boardType}
                    boardState={boardState}
                    selectedTile={prevTile} 
                    onPieceMove={handleTileClick}/>
                </div>
                <PlayerCard 
                username={"player 1"}
                friendState={"add"}
                pieceColour={true}
                capturedPieces={"none"}
                turnColour={turnColour}/>
                <h1>{isCheck ? "Check!" : ""}</h1>
                {promotionInView ? <PromotionSelect handleDecision={handlePromotion} pieceColour={true}/> :
                null}
            </div>
        </>
    )
}

export default GamePage;