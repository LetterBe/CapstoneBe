import React, {useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import './TodoPage.css';
import TodoItem from "./TodoItem";
import {useNavigate} from "react-router-dom";
import LogoOY from "../images/LogoOY.png";

export default function TodoPage() {

    const [todos, setTodos] = useState([] as TodoDTO[])
    const [selectedTodo, setSelectedTodo] = useState({} as TodoDTO)
    const navigate = useNavigate()

    const fetchAll = () => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then((responseBody: TodoDTO []) => {
                setTodos(responseBody)
                setSelectedTodo({} as TodoDTO)
            })
    }

    useEffect(() => {
        fetchAll()
    }, []);

    return (
        <div className='app'>
            <ul>
                {todos.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todoItem={todo}
                                                                   onTodoSelected={setSelectedTodo}
                                                                   onTodoChange={fetchAll} />)}
            </ul>
            <TodoEdit onTodoChange={fetchAll} todoToChange={selectedTodo}/>
            <span>
                <img  src={LogoOY} alt="logo start" height={50} />
            </span>
        </div>
    )
}
