// React
import { useNavigate } from "react-router-dom";

function AuthPage () {
    // Variables
    const homePath = "/";
    const navigate = useNavigate();

    return (
        <>
            <h1>Login Page</h1>
            <button onClick={() => navigate(homePath)}>Go Home</button>
        </>
    )
}

export default AuthPage;