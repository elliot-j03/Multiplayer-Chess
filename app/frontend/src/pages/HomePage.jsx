// React
import { useNavigate } from "react-router-dom";
// Components
import Header from "../components/Misc/Header";

function HomePage () {
    const authPath = "/auth";
    const gamePath = "/game";
    const navigate = useNavigate();

    function searchForGame () {
        console.log("searching...");
    }

    return (
        <>
            <Header />
            <div style={{ display: "flex", flexDirection: "row"}}>
                <button onClick={() => navigate(authPath)}>Login</button>
            </div>
            <h1>Chess game</h1>
            <button onClick={searchForGame}>Search for game</button>
            <button onClick={() => navigate(gamePath)}>go to game page</button>
        </>
    )
}

export default HomePage;