// React
import { useNavigate } from "react-router-dom";

function Header () {
    const homePath = "/";
    const profilePath = "/profile";
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div style={{ display: "flex", flexDirection: "row", flex: "5" }}>
                    <div style={{ padding: "0.5rem" }}>
                        <button style={{ padding: "7px", display: "flex", flexDirection: "column" }}>
                            <div className="menu-button-div" />
                            <div className="menu-button-div" />
                            <div className="menu-button-div" />
                        </button>
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                        <button onClick={() => navigate(homePath)}>
                            <img src="" alt="Home" />
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", flex: "1", justifyContent: "right"}}>
                    <div className="pfp-container">
                        <button onClick={() => navigate(profilePath)}>
                            <img src="" alt="pfp" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;