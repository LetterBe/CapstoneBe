import React from 'react';
import {Outlet} from "react-router-dom";
import './css/App.css'
import Header from "./Header";
import NavBar from "./NavBar";

function App() {


    return (

        <div>
            <Header />
            <NavBar />
            <Outlet/>
        </div>
    );
}


export default App;
