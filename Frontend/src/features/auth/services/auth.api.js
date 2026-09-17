import axios from "axios"


// to this:
const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    const response = await api.post('/api/auth/register', {
        username, email, password
    })

    return response.data

}

export async function login({ email, password }) {

    const response = await api.post("/api/auth/login", {
        email, password
    })

    return response.data

}

export async function logout() {
    const response = await api.get("/api/auth/logout")

    return response.data
}

export async function getMe() {
    // NOTE: the backend route is GET /api/auth/getAll (see router/router.js),
    // not /get-me — this was the actual bug preventing session restore on reload.
    const response = await api.get("/api/auth/getAll")

    return response.data
}