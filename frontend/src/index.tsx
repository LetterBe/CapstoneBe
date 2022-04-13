import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Register from "./register/Register";
import Login from "./login/Login";
import Logout from "./login/Logout";
import TodoPage from "./todos/TodoPage";



ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="Loading...">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='tasks' element={<TodoPage/>} />
                        <Route path='register' element={<Register/>} />
                        <Route path='login' element={<Login />}/>
                        <Route path='logout' element={<Logout />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
