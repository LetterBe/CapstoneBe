import {useEffect, useState} from "react";
import {Todo} from "../modelTodo"


export default function TodoList () {

    const [todos, setTodos] = useState([] as Todo[])



    useEffect (() => {
        fetch('http://localhost:8080/api/todos')
            .then(response => response.json())
            .then((responseBody: Todo []) => setTodos(responseBody));

    }, []);

    return (
        <ol>
            {todos.map((todo, index) => <li key={`${todo.id} -${index}`}>{todo.task} {todo.description}</li>)}
        </ol>
    )
}