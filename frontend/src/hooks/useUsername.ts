import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import User from "../models/user/User"

export default function useUsername() {
    const { jwt } = useContext(AuthContext)!
        
    const name = useMemo(() => {
        const decoded = jwtDecode<User>(jwt)
        return decoded.name
    }, [ jwt ])
    
    return name
}

