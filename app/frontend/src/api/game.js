const BASE_URL = import.meta.env.VITE_API_WS;
// Paths
const gameMovePath = `${BASE_URL}/game/client-socket`


var ws = new WebSocket(gameMovePath);

export function sendPieceMove(previousTile, requestedTile) {
    try {
        const data = {
            "prev_tile": previousTile,
            "req_tile": requestedTile
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