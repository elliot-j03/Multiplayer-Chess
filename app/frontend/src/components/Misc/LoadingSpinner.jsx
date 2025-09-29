// React
import { useEffect, useState } from "react";
// Images
import lsLight from "../../assets/misc/loading_spinner_light.png";
import lsDark from "../../assets/misc/loading_spinner_dark.png";

function LoadingSpinner () {
    const [colourScheme, setColourScheme] = useState();
    

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

    return (
        <div style={{ padding: "1rem" }}>
            <img className="spinner" src={colourScheme ? lsDark : lsLight} alt="loading spinner" />
        </div>
    )
}

export default LoadingSpinner;