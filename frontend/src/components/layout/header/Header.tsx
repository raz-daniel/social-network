import { NavLink } from 'react-router-dom'
import './Header.css'
import useUsername from '../../../hooks/useUsername'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'

export default function Header(): JSX.Element {

    const name = useUsername()

    const {logout} = useContext(AuthContext)!
    function logMeOut() {
        logout()
    }

    return (
        <div className='Header'>
            <div>
                <img alt='Logo' />
            </div>
            <div>
                <nav>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/feed">Feed</NavLink>
                    <NavLink to="/search">Search</NavLink>
                </nav>
            </div>
            <div className='loginArea'>
                hello { name } | <button onClick={logMeOut}> Logout</button>
            </div>

        </div>
    )
}