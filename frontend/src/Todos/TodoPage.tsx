import {useEffect, useState} from "react";
import {TodoDTO} from "./TodoDTOModel";
import TodoEdit from "./TodoEdit";
import './TodoPage.css';
import TodoItem from "./TodoItem";

export default function TodoPage() {

    const [todos, setTodos] = useState([] as TodoDTO[])
    const [selectedTodo, setSelectedTodo] = useState({} as TodoDTO)

    const fetchAll= () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`)
            .then(response => response.json())
            .then((responseBody: TodoDTO []) => setTodos(responseBody));
    }

    useEffect (() => {
        fetchAll()
    }, []);

    return (
        <div className='app'>
            <form>
                {todos.map((todo) => <TodoItem todoItem={todo}  onTodoSelected={setSelectedTodo} onTodoChange={fetchAll} />)}
            </form>
            <TodoEdit onTodoChange={fetchAll} todoToChange={selectedTodo} />
        </div>

    )
}