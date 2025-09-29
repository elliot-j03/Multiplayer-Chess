// API
import { searchForGame, cancelSearch } from "../api/game";
// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Header from "../components/Misc/Header";
import SearchTimer from "../components/Misc/SearchTimer";

function HomePage () {
    const gamePath = "/game";
    const navigate = useNavigate();

    const [searchState, setSearchState] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(false);


    async function matchSearch () {
        try {
            const data = await searchForGame("0001");
            setSearchState(true);
            setSearchTimeout(false);
        } catch (err) {
            console.log("[ERROR]: HomePage.jsx/matchSearch: " + err);
        }
    }


    async function stopMatchSearch () {
        try {
            const data = await cancelSearch("0001");
            if (data.cancelSearch) setSearchState(false);
        } catch (err) {
            console.log("[ERROR] HomePage.jsx/stopMatchSearch: " + err);
        }
    }


    useEffect(() => {
        if (searchTimeout) {
            setSearchState(false);
            stopMatchSearch();
        }
    },[searchTimeout]);

    
    return (
        <>
            <Header page={"home"}/>
            <button onClick={() => navigate(gamePath)}>go to game page (dev)</button>
            <div className="home-page">
                <h1 style={{ fontSize: "var(--title-size)" }}>Online Chess</h1>
                <button onClick={!searchState ? matchSearch : stopMatchSearch}>
                    {!searchState ? "Search for match" : "Cancel search"}
                </button>
                {searchState ? <SearchTimer searchState={searchState} handleTimeout={setSearchTimeout}/>
                : null}
                <p>{searchTimeout ? "Could not find a match" : null}</p>
            </div>
        </>
    )
}

export default HomePage;