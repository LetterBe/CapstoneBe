import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()

    debugger
    const register = () => {
        if (!(password === passwordAgain)) {
            setErrorMessage('Passwords are different');
        }else{
            fetch(`${process.env.REACT_APP_BASE_URL}/api/login/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
                .then(response => {
                    if(response.status === 201) {
                        return response.text()
                    }
                    throw new Error ('This username already exists')
                })
                .then(() => {
                    nav('/login')
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
            <h3>You are new by OY? Then register yourself:</h3>
            <input type='tex' placeholder='Email' value={email}
                   onChange={ev => setEmail(ev.target.value)}/> <br/>
            <input type='password' placeholder='Password' value={password}
                   onChange={ev => setPassword(ev.target.value)}/>
            <input type='password' placeholder='Again your password' value={passwordAgain}
                   onChange={ev => setPasswordAgain(ev.target.value)} /> <br/>
            <button onClick={register}>Register</button>
        </div>
    )


}

export default Register