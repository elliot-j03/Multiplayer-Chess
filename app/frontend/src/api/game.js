const BASE_URL = import.meta.env.VITE_API_WS;
// Paths
const gameMovePath = `${BASE_URL}/game-socket`


var ws = new WebSocket(gameMovePath);

export function sendPieceMove(boardState, previousTile, requestedTile) {
    const data = {
        "board_state": boardState,
        "prev_tile": previousTile,
        "req_tile": requestedTile
    }
    ws.send(JSON.stringify(data));

    return new Promise((resolve) => {
        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            const newBoardState = data.boardState;
            const change = data.change;
            resolve({ state: newBoardState, change: change });
        }, { once: true });
    });
}