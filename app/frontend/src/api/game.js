const BASE_URL_WS = import.meta.env.VITE_API_WS;
const BASE_URL_API = import.meta.env.VITE_API_URL;
// Paths
const gameMovePath = `${BASE_URL_WS}/game/client-socket`;
const gameSearchPath = `${BASE_URL_API}/game/match-search`;
const gameCancelPath = `${BASE_URL_API}/game/match-search/cancel`;


var ws = new WebSocket(gameMovePath);

export function sendPieceMove(moveStr) {
    try {
        const data = {
            "move_str": moveStr
        }
        ws.send(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            if (ws.readyState !== WebSocket.OPEN) {
                return reject("WebSocket not open");
            }

            ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                const newBoardState = data.boardState;
                const gameState = data.gameState;
                resolve({ boardState: newBoardState, gameState: gameState});
            }, { once: true });
        });
    } catch (err) {
        console.log("[ERROR] game.js/sendPieceMove: " + err);
    }
}


export async function searchForGame(userID) {
    const response = await fetch(gameSearchPath,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "client_uid": userID,
            })
        }
    );
    const data = await response.json();
    return data;
}


export async function cancelSearch(userID) {
    const response = await fetch(gameCancelPath,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "client_uid": userID,
            })
        }
    );
    const data = await response.json();
    return data;
}