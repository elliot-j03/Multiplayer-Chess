// API
import { searchForGame, cancelSearch } from "../api/game";
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Header from "../components/Misc/Header";

function HomePage () {
    const authPath = "/auth";
    const gamePath = "/game";
    const navigate = useNavigate();

    const [searchState, setSearchState] = useState(false);


    async function matchSearch () {
        const data = await searchForGame("0001");
        setSearchState(true);
        console.log(data);
    }


    async function stopMatchSearch () {
        const data = await cancelSearch("0001");
        if (data.cancelSearch) setSearchState(false);
        console.log(data);
    }

    
    return (
        <>
            <Header />
            <div style={{ display: "flex", flexDirection: "row"}}>
                <button onClick={() => navigate(authPath)}>Login</button>
            </div>
            <h1>Chess game</h1>
            <button onClick={!searchState ? matchSearch : stopMatchSearch}>
                {!searchState ? "Search for match" : "Cancel search"}
            </button>
            <button onClick={() => navigate(gamePath)}>go to game page</button>
        </>
    )
}

export default HomePage;