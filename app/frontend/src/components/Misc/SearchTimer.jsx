// React
import { useState, useEffect } from "react";
// Image
import blackPawn from "../../assets/pieces/black_pawn.png";
import whitePawn from "../../assets/pieces/white_pawn.png";

function SearchTimer ({ searchState, handleTimeout }) {
    const [timer, setTimer] = useState({seconds: 55, minutes: 4});
    const [colourScheme, setColourScheme] = useState();


    // Browser mode listener
    useEffect(() => {
        function colourModeHandler (event) {
            setColourScheme(event.matches);
        }
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        mediaQuery.addEventListener("change", colourModeHandler);

        setColourScheme(mediaQuery.matches);

        return (() => {
            mediaQuery.removeEventListener("change", colourModeHandler);
        });
    }, []);


    // Timer logic
    useEffect(() => {
        if (!searchState) {
            return;
        }

        if (timer.minutes === 5) {
            handleTimeout(true);
            return;
        }

        const searchTimer = setInterval(() => {
            setTimer(prev => {
                if (prev.seconds === 59) {
                    return {seconds: 0, minutes: prev.minutes + 1};
                } else {
                    return {...prev, seconds: prev.seconds + 1}
                }
            });
        }, 1000);

        return () => clearInterval(searchTimer);
    }, [searchState, timer.minutes]);


    return (
        <>  
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                paddingTop: "1rem"
            }}>
                <img className="spinning-pawn" src={colourScheme ? whitePawn : blackPawn} 
                alt="pawn" style={{ height: "var(--pawn-spinner-dim)" }}/>
                <h3>Searching for a match...</h3>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
                <h3>{timer.minutes} : {timer.seconds}</h3>
            </div>
        </>
    )
}

export default SearchTimer;