import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../css/Input";
import Button from "../css/Button";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const register = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!(password === passwordAgain)) {
            setErrorMessage('Passwords are different');
        }else{
            fetch(`${process.env.REACT_APP_BASE_URL}/api/login/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => {
                    if(response.status === 200) {
                        return response.json()
                    }
                    throw new Error ('This username already exists')
                })
                .then(() => {
                    navigate('/login')
                })
                .catch(e => setErrorMessage((e.message)))
        }
    }

    useEffect (() => {
        const timeoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timeoutId)
    }, [errorMessage]
    )

    return (
        <div>
            <h4>You are new by OY? Then register yourself:</h4>
            <form onSubmit={register}>
            <Input  placeholder='Email' value={email}
                   onChange={setEmail}  type='email' additionalCss="mr-4" />  <br/>
            <Input type='password' placeholder='Password' value={password}
                   onChange={setPassword}/><br/>
            <Input placeholder='Your password again' value={passwordAgain}
                   onChange={setPasswordAgain} /> <br/>
            <Button label='Register' onClick= {() => register} />
            </form>
        </div>
    )


}

export default Register