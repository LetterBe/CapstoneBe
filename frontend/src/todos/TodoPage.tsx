import React, {useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import '../css/TodoPage.css';
import TodoItem from "./TodoItem";
import Text from "../css/Text";


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
        <>
            <div className='app2'>
                <Text size='2xl'
                      message={`${localStorage.getItem('username') === null ? '' : 'Hi,  ' + localStorage.getItem('username') + ', nice to have you here!'}`}/>
                <Text message='Here you create new Tasks, edit them and
                 you you are done ckeck it,before deleting,so you
                get your score higher'/>
                <TodoEdit onTodoChange={fetchAll} todoToChange={selectedTodo}/>
            </div>
            <div className='postItContainer'>
                {todos.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todoItem={todo}
                                                                   onTodoSelected={setSelectedTodo}
                                                                   onTodoChange={fetchAll}/>)}
            </div>
        </>
    )
}
