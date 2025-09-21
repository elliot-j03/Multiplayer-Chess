function PlayerCard ({ username, profilePicture, pieceColour, capturedPieces, friendState }) {

    return (
        <>
            <div className="player-card">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="pfp-container">
                        <img src={profilePicture} alt="pfp" />
                    </div>
                    <p>{username}</p>
                    <button>{friendState}</button>
                </div>
                <p>{pieceColour}</p>
                <p>{capturedPieces}</p>
            </div>
        </>
    )
}

export default PlayerCard;