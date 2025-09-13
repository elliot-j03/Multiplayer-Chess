const BASE_URL = import.meta.env.VITE_API_URL;
// Paths
const userCreatePath = `${BASE_URL}/auth/create`;
const userLoginPath = `${BASE_URL}/auth/login`;

export async function userLogin (email, password) {

    const response = await fetch(userLoginPath,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
    );
    const data = await response.json();
    return data;
}

export async function userCreate (username, email, password) {
    
    const response = await fetch(userCreatePath,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        }
    );
    const data = await response.json();
    return data;
}