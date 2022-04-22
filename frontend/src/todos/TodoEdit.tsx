import {TodoDTO} from "./TodoDTOModel";
import {useEffect, useState} from "react";
import Button from "../css/Button";


interface TodoFormProps {
    onTodoChange: () => void;
    todoToChange: TodoDTO;

}

export default function TodoEdit(props: TodoFormProps) {
    const [task, setTask] = useState(localStorage.getItem('title') ?? '')
    const [description, setDescription] = useState(localStorage.getItem('description') ?? '')
    const [category, setCategory] = useState(localStorage.getItem('category') ?? '')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setTimeout(() => setErrorMessage(''), 10000)
        setTask(props.todoToChange.task)
        setDescription(props.todoToChange.description)
        setCategory(props.todoToChange.category)

    }, [props.todoToChange])


    const AddOrEdit = () => {
        if (props.todoToChange.id != null) {
            editTodo()
        } else {
            addTodo()
        }
    }

    const addTodo = () => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token

            },
            body: JSON.stringify({
                task: task,
                description: description,
                category: category,
            })
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                }

                throw new Error("We couldn't save your task")
            })
            .then(() => {
                setTask('');
                setDescription('');
                setCategory('');
                props.onTodoChange();
            })
            .catch(e => setErrorMessage(e.message));
    }
    const editTodo = () => {
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoToChange.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token
            },
            body: JSON.stringify({
                task: task,
                description: description,
                category: category,

            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error("Ops..try it again")
            })
            .then(() => {
                    setTask('');
                    setDescription('');
                    setCategory('');
                    props.onTodoChange();
                }
            )
            .catch(e => setErrorMessage(e.message))
    }

    return (
        <div>
            {errorMessage}
            <input type="text" placeholder="write here the task" value={task}
                   onChange={ev => setTask(ev.target.value)}/>
            <br/>
            <br/>
            <textarea rows={3} placeholder="write here the description" value={description}
                      onChange={ev => setDescription(ev.target.value)}/> <br/>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value={"Me"}>me</option>
                <option value={"Work"}>work</option>
                <option value={"Home"}>home</option>
                <option value={"Kids"}>kids</option>
                <option value={"Pet"}>pet</option>
                <option value={"Health"}>health</option>
                <option value={"Others"}>others</option>
            </select>
            <Button label='Save your task' onClick={() => AddOrEdit()} />
        </div>

    )

}
