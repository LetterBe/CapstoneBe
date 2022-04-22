import React, {useCallback, useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import '../css/TodoPage.css';
import TodoItem from "./TodoItem";
import Text from "../css/Text";


export default function TodoPage() {

    const [todos, setTodos] = useState([] as TodoDTO[])
    const [selectedTodo, setSelectedTodo] = useState({} as TodoDTO)
    const [score, setScore] = useState(0)

    const scoreAdd = useCallback(() => {
        const scoreResult = todos.map((todo: TodoDTO) => todo.score).reduce((a, b) => (a + b), 0)
        setScore(scoreResult)
    }, [todos])

    useEffect(() => {
        scoreAdd()
    }, [scoreAdd],)

    const fetchAll = useCallback(() => {
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
    }, [])


    useEffect(() => {
        fetchAll()
    }, [fetchAll]);

    return (
        <>
            <div className='postIdAndScore'>
            <span className='app2AndExample'>
                <div className='app2'>
                <Text size='4xl'
                      message={`${localStorage.getItem('username') === null ? '' : 'Hi,  ' + localStorage.getItem('username')}  ,`}/>
                <Text message='here you can create new Tasks, edit them and,
                 when you are done, check it before deleting, so you
                get your score higher! Ah... to edit a task just click on it!'/>
                </div>
            <div className='bigPostIt'>
                    <TodoEdit onTodoChange={fetchAll} todoToChange={selectedTodo}/>
            </div>
            </span>
                <div className='score'>
                    <Text message={`Score: ${score}`}/>
                </div>
            </div>
            <div className='postItContainer'>
                {todos.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todoItem={todo}
                                                                   onTodoSelected={setSelectedTodo}
                                                                   onTodoChange={fetchAll}/>)}
            </div>
        </>
    )
}
