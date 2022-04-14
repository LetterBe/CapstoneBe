import React, {useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import './TodoPage.css';
import TodoItem from "./TodoItem";

export default function TodoPage() {

    const [todos, setTodos] = useState([] as TodoDTO[])
    const [selectedTodo, setSelectedTodo] = useState({} as TodoDTO)

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
            <ol>
                {todos.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todoItem={todo}
                                                                   onTodoSelected={setSelectedTodo}
                                                                   onTodoChange={fetchAll}/>)}
            </ol>
            <TodoEdit onTodoChange={fetchAll} todoToChange={selectedTodo}/>
            <h6>Here you create new Tasks, edit them and,<br/> you you are done ckeck it,before deleting, <br/>so you get your score higher</h6>
            <span> {localStorage.getItem('username') === null ? '' : 'Hi,  ' + localStorage.getItem('username') + ', nice to have you here!'} </span>
        </div>
    )
}
