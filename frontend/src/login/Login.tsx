import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {

    const [emailLogin, setEmailLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const login = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "emailLogin": emailLogin,
                "password": password
            })
        })
            .then(response => {
                if (!response.ok) {
                    setErrorMessage("Email or password not valid")
                    throw new Error()
                }
                return response.text()
            })
            .then(responseBody => {
                localStorage.setItem("token", responseBody)
                localStorage.setItem("username", emailLogin)
                setEmailLogin("")
                setPassword("")
                navigate("/tasks")
            })
    }

    const routeToRegister = () => {
        navigate('/register')
    }

    return (
        <div>
            <h4>Login</h4>
            <form onSubmit={login}>
            <input type='text' placeholder='Email' value={emailLogin}
                   onChange={ev => setEmailLogin(ev.target.value)}/>
            <br/>
            <input type='password' placeholder='password' value={password}
                   onChange={ev => setPassword(ev.target.value)}/> <br/>
            <button type='submit'>Login</button> <span>{errorMessage}</span>
            </form>
            <br/>
            <br/>
            <h5>Still don't have an account? <br/>
                Then register yourself first <button onClick={routeToRegister}>Register</button></h5>

        </div>
    )
}

export default Login