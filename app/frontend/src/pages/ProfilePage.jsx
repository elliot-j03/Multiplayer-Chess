//React
import { useNavigate } from "react-router-dom"

function ProfilePage () {
    // Variables
    const homePath = "/";
    const navigate = useNavigate();

    return (
        <>
            <h1>Profile</h1>
            <button onClick={() => navigate(homePath)}>Home</button>
        </>
    )
}

export default ProfilePage;