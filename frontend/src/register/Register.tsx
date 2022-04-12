import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
            <input type='tex' placeholder='Email' value={email}
                   onChange={ev => setEmail(ev.target.value)}/> <br/>
            <input type='password' placeholder='Password' value={password}
                   onChange={ev => setPassword(ev.target.value)}/><br/>
            <input type='password' placeholder='Your password again' value={passwordAgain}
                   onChange={ev => setPasswordAgain(ev.target.value)} /> <br/>
            <button type='submit'>Register</button>
            </form>
        </div>
    )


}

export default Register