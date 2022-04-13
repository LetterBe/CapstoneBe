import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import NameOY from './images/NameOY.png'


function App() {
    const navigate = useNavigate()

    const routeToLoginAndRegiter = () => {
        navigate('/login')
    }

    const routeToLogin= () => {
        navigate('/login')
    }



    return (
        <div>
            <h2> <img src={NameOY} alt='logo' height={30} /> Easy task manager </h2>
            < button onClick={routeToLoginAndRegiter}>Login</button>
            < button onClick={routeToLogin}>Logout</button>
            <Outlet/>
        </div>
    );
}


export default App;
