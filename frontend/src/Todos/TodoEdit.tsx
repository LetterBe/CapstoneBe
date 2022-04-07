import {TodoDTO} from "./TodoDTOModel";
import {useEffect, useState} from "react";


interface TodoFormProps {
    onTodoChange: () => void;
    todoToChange: TodoDTO;

}

export default function TodoEdit(props: TodoFormProps) {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Work');
    const [createdBy, setCreatedBy] = useState('Me');
    const [status, setStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setTask(props.todoToChange.task)
        setDescription(props.todoToChange.description)
        setCategory(props.todoToChange.category)
        setCreatedBy(props.todoToChange.createdBy)
    }, [props.todoToChange])


    const AddOrEdit = () => {
        if (props.todoToChange.id != null) {
            editTodo()
        } else {
            addTodo()
        }
    }
    const addTodo = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: task,
                description: description,
                category: category,
                createdBy: createdBy
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
                setCreatedBy('');
                props.onTodoChange();
            })
            .catch(e => setErrorMessage(e.message));
    }
    const editTodo = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoToChange.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: task,
                description: description,
                category: category,
                createdBy: createdBy
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
                    setCreatedBy('');
                    props.onTodoChange();
                }
            )
            .catch(e => setErrorMessage(e.message))
    }

    const deleteTodo = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoToChange.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                }
                throw new Error("Error to delete Task")
            })
            .then(() => props.onTodoChange());
    }

    return (

        <div>
            <input type="text" value={task} onChange={ev => setTask(ev.target.value)}/> <br/>
            <textarea rows={2} value={description} onChange={ev => setDescription(ev.target.value)}/> <br/>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value={"Me"}>me</option>
                <option value={"Work"}>work</option>
                <option value={"Home"}>home</option>
                <option value={"Kids"}>kids</option>
                <option value={"Pet"}>pet</option>
                <option value={"Health"}>health</option>
                <option value={"Others"}>others</option>
            </select> <br/>
            <input type="text" value={createdBy} onChange={ev => setCreatedBy(ev.target.value)}/>
            <button onClick={() => AddOrEdit()}>Save</button>
            <button onClick={deleteTodo}>Delete</button>
        </div>

    )

}
