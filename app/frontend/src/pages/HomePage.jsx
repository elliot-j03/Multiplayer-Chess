// React
import { useNavigate } from "react-router-dom";

function HomePage () {
    // Variables
    const authPath = "/auth";
    const profilePath = "/profile";
    const gamePath = "/game";
    const navigate = useNavigate();

    function searchForGame () {
        console.log("searching...");
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row"}}>
                <button onClick={() => navigate(authPath)}>Login</button>
                <button onClick={() => navigate(profilePath)}>Profile</button>
            </div>
            <h1>Chess game</h1>
            <button onClick={searchForGame}>Search for game</button>
            <button onClick={() => navigate(gamePath)}>go to game page</button>
        </>
    )
}

export default HomePage;