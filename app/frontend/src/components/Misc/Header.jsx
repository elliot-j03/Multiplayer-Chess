// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header ({ page }) {
    const homePath = "/";
    const profilePath = "/profile";
    const authPath = "/auth";
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState(false);

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
                    {page === "auth" ? null :
                        <div className="pfp-container">
                            {loginState ? 
                                <button onClick={() => navigate(profilePath)}>
                                    <img src="" alt="pfp" />
                                </button>
                                :
                                <button onClick={() => navigate(authPath)}>Login</button>
                            }
                        </div>
                    }
                </div>
            </header>
        </>
    )
}

export default Header;