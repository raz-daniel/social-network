import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'
import Login from '../../auth/login/Login'
import Followers from '../followers/Followers'
import Following from '../following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routing from '../routing/Routing'
import './Layout.css'

export default function Layout() {
    
    const { jwt } = useContext(AuthContext)!
    const isLoggedIn: boolean = !!jwt

    return (
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                <Header />
            </header>
            <aside>
                <Following />
            </aside>
            <aside>
                <Followers />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
            </>}
            
            {!isLoggedIn && <>
                <Login />
            </>}
        </div>
    )
}