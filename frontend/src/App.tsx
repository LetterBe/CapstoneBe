import React from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import LogoOY from './images/LogoOY.png'

function App() {
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
        <div>
            <h2><img src={LogoOY} alt='logo' height={50}/> Organize Yourself : task manager <span>
                <button onClick={routeToLoginAndRegiter}>Login</button>
                <button onClick={() => {logout(); routeToLogin()}}>Logout</button></span>
            </h2>
            <Outlet/>
        </div>
    );
}


export default App;
