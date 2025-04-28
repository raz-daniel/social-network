import axios from "axios";
import Login from "../models/user/Login";
import Signup from "../models/user/Signup";

class Auth {
    async login(login: Login): Promise<string> {
            const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login)
            return response.data.jwt
    }
    async signup(signup: Signup): Promise<string> {
        const response = await axios.post<{jwt: string}>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/signup`, signup)
        return response.data.jwt
    }
}

const auth = new Auth()
export default auth;