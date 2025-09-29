// API
import { sendPieceMove } from "../api/game";
// React
import { useEffect, useState } from "react";
// Components
import Header from "../components/Misc/Header";
import PlayerCard from "../components/User/PlayerCard";
import GameBoard from "../components/Game/GameBoard";
import PromotionSelect from "../components/Game/PromotionSelect";
import { startingBoardState } from "../components/Game/BoardData";

function GamePage () {
    const [boardType, setBoardType] = useState("white");
    const [boardState, setBoardState] = useState({});
    const boardStateKey = "BOARD_STATE";
    const [prevTile, setPrevTile] = useState("");
    const [prevPiece, setPrevPiece] = useState("");
    const [promotionInView, setPromotionInView] = useState(false);
    const [pendingMove, setPendingMove] = useState("");
    // Game state
    const [turnColour, setTurnColour] = useState(true);
    const [whitePiecesTaken, setWhitePiecesTaken] = useState([]);
    const [blackPiecesTaken, setBlackPiecesTaken] = useState([]);
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckMate, setIsCheckMate] = useState(false);
    const [isStaleMate, setIsStaleMate] = useState(false);
    const [isInsuffMats, setIsInsuffMats] = useState(false);
    const [gameConslusion, setGameConclusion] = useState("");


    // Loading upon refresh
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(boardStateKey));
        if (data !== null) {
            setBoardState(data);
        } else {
            setBoardState(startingBoardState);
        }
    }, []);


    // Saving game state to local storage
    useEffect(() => {
        localStorage.setItem(boardStateKey, JSON.stringify(boardState));
    }, [boardState]);


    // Logic on game conclusion
    useEffect(() => {
        if (isCheckMate) {
            setGameConclusion("Checkmate");
        } else if (isStaleMate) {
            setGameConclusion("Stalemate");
        } else if (isInsuffMats) {
            setGameConclusion("Insufficient Material");
        }

        localStorage.removeItem(boardStateKey);
    }, [isCheckMate, isStaleMate, isInsuffMats]);


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

        const capPiece = moveResponse?.gameState?.capturedPiece;
        if (capPiece !== null) {
            capPiece[1] === "w" ? setWhitePiecesTaken(prev => [...prev, capPiece]) :
            setBlackPiecesTaken(prev => [...prev, capPiece])
        }

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


    try {
        return (
            <>
                <Header page={"game"} />
                <div className="game-page">
                    <PlayerCard 
                    username={"player 2"}
                    friendState={"add"}
                    pieceColour={false}
                    capturedPieces={whitePiecesTaken}
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
                    capturedPieces={blackPiecesTaken}
                    turnColour={turnColour}/>
                    <h1>{isCheck ? "Check!" : ""}</h1>
                    <h1>{isCheckMate ? "Checkmate!" : ""}</h1>
                    <h1>{isStaleMate ? "StaleMate!" : ""}</h1>
                    <h1>{isInsuffMats ? "Insuffiecient Material!" : ""}</h1>
                    {promotionInView ? <PromotionSelect handleDecision={handlePromotion} pieceColour={true}/> :
                    null}
                </div>
            </>
        )
    } catch (err) {
        return (
            <>
                <Header />
                <div>
                    <h1>An error occurred while loading the game...</h1>
                    <p>[ERROR]: {err}</p>
                </div>
            </>
        )
    }
}

export default GamePage;