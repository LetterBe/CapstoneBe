import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import TodoPage from "./todos/TodoPage";


function App() {

    
    return (
        <div>
            <Outlet />
        </div>
    );
}


export default App;
