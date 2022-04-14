import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../css/Button";
import ErrorMessage from "../css/ErrorMessage";
import Input from "../css/Input"

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
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error("Did not work")
            })
            .then(responseBody => {
                localStorage.setItem("token", responseBody)
                localStorage.setItem("username", emailLogin)
                setEmailLogin("")
                setPassword("")
                navigate("/tasks")
            })
            .catch(e => setErrorMessage(e.message))
    }

    const routeToRegister = () => {
        navigate ('/register')
    }

    return (
        <div>
            <form onSubmit={login}>
            <Input placeholder='Email' value={emailLogin} onChange={setEmailLogin}
                   type='email' additionalCss="mr-4"/>
            <br/>
            <Input placeholder='Password' value={password}
                   onChange={setPassword}  type='password' additionalCss="mr-4"/> <br/>
            <Button label='Login' onClick={() => login}  />
                {errorMessage && <span><ErrorMessage message={errorMessage}/> </span>}
            </form>
            <br/>
            <br/>
            <h5>Still don't have an account? <br/>
                Then register yourself first <Button label='Register' onClick={() => routeToRegister()}  /></h5>
        </div>
    )
}


export default Login