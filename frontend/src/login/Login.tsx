import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../css/Button";
import ErrorMessage from "../css/ErrorMessage";
import Input from "../css/Input"
import Text from "../css/Text";

const Login = () => {

    const [emailLogin, setEmailLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const login = (event: FormEvent<HTMLFormElement>) => {
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
        navigate('/register')
    }

    return (
        <div>
            <div className='loginPage1'>
                <form onSubmit={login}>
                    <Text message='Your Email:'/>
                    <Input placeholder='Email' value={emailLogin} onChange={setEmailLogin}
                           type='email' additionalCss="mr-4"/>
                    <br/>
                    <Text message='Password:'/>
                    <Input placeholder='Password' value={password}
                           onChange={setPassword} type='password' additionalCss="mr-4"/> <br/>
                    <div className='loginPageButtons'>
                        <Button label='See your tasks' onClick={() => login}/>
                        {errorMessage && <span><ErrorMessage message={errorMessage}/> </span>}
                    </div>
                </form>
            </div>
            <br/>
            <div className='loginPage2'>
                <Text message="Still don't have an account?"/>
                <Text message="Then register yourself first:"/>
                <div className='loginPageButtons'>
                    <Button label='Register' onClick={() => routeToRegister()}/>
                </div>
            </div>
        </div>
    )
}


export default Login