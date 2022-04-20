import React, {useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import '../css/TodoPage.css';
import TodoItem from "./TodoItem";
import Text from "../css/Text";


export default function TodoPage() {

    const [todos, setTodos] = useState([] as TodoDTO[])
    const [selectedTodo, setSelectedTodo] = useState({} as TodoDTO)
    const [score, setScore] = useState(0)

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
                scoreAdd()
                setSelectedTodo({} as TodoDTO)
            })
    }

    const scoreAdd = () => {
        setScore(0)
        todos.forEach((todo: TodoDTO) => (setScore(score + todo.score)))
    }

    useEffect(() => {
        fetchAll()
    }, [fetchAll]);

    return (
        <>
            <div className='app2'>
                <div>
                    {score}
                </div>
                <Text size='2xl'
                      message={`${localStorage.getItem('username') === null ? '' : 'Hi,  ' + localStorage.getItem('username') + ', nice to have you here!'}`}/>
                <Text message='Here you create new Tasks, edit them and
                 when you are done, check it before deleting, so you
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
