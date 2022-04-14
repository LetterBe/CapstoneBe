import {useNavigate} from "react-router-dom";
import Button from "./css/Button";
import React from "react";

export default function NavBar() {
    const navigate = useNavigate()

    const routeToLoginAndRegiter = () => {
        navigate('/login')
    }

    const routeToLogin = () => {
        navigate('/login')
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    return (
        <div className='loginUndLogoutContainer'>
            <Button label='Login' onClick={routeToLoginAndRegiter}/>
            <Button label='Logout ' onClick={() => {
                logout();
                routeToLogin()
            }}/>
        </div>
    )
}

