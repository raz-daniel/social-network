import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/user/Login'
import auth from '../../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import SignupModel from '../../../models/user/Signup'


export default function Login(): JSX.Element {

    const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm<LoginModel>()
    const { register: registerSignup, handleSubmit: handleSubmitSignup } = useForm<SignupModel>()

    const { newLogin, newSignup } = useContext(AuthContext)!

    async function submitLogin(login: LoginModel) {
        const jwt = await auth.login(login)
        newLogin(jwt)
    }

    async function submitSignup(signup: SignupModel) {
        const jwt = await auth.signup(signup)
        newSignup(jwt)
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmitLogin(submitLogin)}>
                <fieldset>
                    <legend>Login Here:</legend>
                    <input placeholder='Enter Username'{...registerLogin('username')} />
                    <input placeholder='Enter Password' type='password' {...registerLogin('password')} />
                    <button>Login</button>
                </fieldset>
            </form>
            <hr />
            <form onSubmit={handleSubmitSignup(submitSignup)}>
                <fieldset>
                    <legend>First Time? Sign Up Here:</legend>
                    <input placeholder='Enter name'{...registerSignup('name')} />
                    <input placeholder='Enter Username'{...registerSignup('username')} />
                    <input placeholder='Enter Password' type='password' {...registerSignup('password')} />
                    <button>Sign Me In</button>
                </fieldset>
            </form>
            
        </div>
    )
}