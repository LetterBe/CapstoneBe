import {TodoDTO} from "./TodoDTOModel";
import {useState} from "react";
import Button from "../css/Button";

interface TodoItemProps {
    todoItem: TodoDTO
    onTodoSelected: (todoItem: TodoDTO) => void
    onTodoChange: () => void
}

export default function TodoItem(props: TodoItemProps) {

    const [errorMessage, setErrorMessage] = useState('')


    const deleteTodo = () => {
        if (props.todoItem.status) {

            const token = localStorage.getItem('token')
            fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoItem.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer' + token
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error("Error to delete Task")
                })
                .then(() => props.onTodoChange())
                .catch(e => setErrorMessage(e.message))
        }
    }


    const toggleItem = () => {
        const changedTodoItem = props.todoItem;
        changedTodoItem.status = !changedTodoItem.status;
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                changedTodoItem
            )
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error("Ops..try it again")
            })
            .then(() => {
                    props.onTodoChange();
                }
            )
            .catch((e: Error) => {
                    setErrorMessage(e.message)
                }
            )
    }


    return (
        <div key={`${props.todoItem.id}`} className='postIt'>
            <div>
                <h5><span onClick={() => props.onTodoSelected(props.todoItem)}>
                 {props.todoItem.task}
                </span>
                    <input type='checkbox' checked={props.todoItem.status} onChange={() => toggleItem()}/>
                </h5>
                <h5> {props.todoItem.description}</h5>
                <h5> {props.todoItem.category}</h5>
            </div>
            <Button label='Delete🗑️' onClick={() => deleteTodo()}/>
            <div>{errorMessage}</div>
        </div>

    )

}
