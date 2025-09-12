// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// API
import { userLogin, userCreate } from "../api/auth";


function AuthPage () {
    // Variables
    const homePath = "/";
    const navigate = useNavigate();

    const [username, setUsername] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function requestLogin () {
        try {
            const response = await userLogin(email, password);
            console.log(response);

            setUsername("");
            setEmail("");
            setPassword("");

        } catch (err) {
            console.log("[ERROR] AuthPage.jsx/requestLogin: " + err);
        }
    }


    async function requestCreateUser () {
        try {
            const response = await userCreate(username, email, password);
            console.log(response);

            setUsername("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log("[ERROR] AuthPage.jsx/requestCreateUser: " + err);
        }
    }


    return (
        <>
            <h1>Login Page</h1>
            <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
                <input onChange={(e) => setUsername(e.target.value)} placeholder="username" value={username}/>
                <input onChange={(e) => setEmail(e.target.value)} placeholder="email" value={email}/>
                <input onChange={(e) => setPassword(e.target.value)} placeholder="password" value={password}/>
                <button onClick={requestLogin}>Login</button>
                <button onClick={requestCreateUser}>Create Account</button>
            </div>
            <button onClick={() => navigate(homePath)}>Go Home</button>
        </>
    )
}

export default AuthPage;