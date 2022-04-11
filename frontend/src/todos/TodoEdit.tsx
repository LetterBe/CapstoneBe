import {TodoDTO} from "./TodoDTOModel";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


interface TodoFormProps {
    onTodoChange: () => void;
    todoToChange: TodoDTO;

}

export default function TodoEdit(props: TodoFormProps) {
    const [task, setTask] = useState(localStorage.getItem('title') ?? '')
    const [description, setDescription] = useState(localStorage.getItem('description') ?? '')
    const [category, setCategory] = useState(localStorage.getItem('category') ?? '')
    const [createdBy, setCreatedBy] = useState(localStorage.getItem('createdBy') ?? '')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setErrorMessage(''), 10000)
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
        const token = localStorage.getItem('token')
        setTask('')
        setDescription('')
        setCategory('')
        setCreatedBy('')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token

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
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoToChange.id}`, {
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

    return (
        <div>
            {errorMessage}
            <input type="text" placeholder="write here your task" value={task}
                   onChange={ev => setTask(ev.target.value)}/> <br/>
            <textarea rows={3} placeholder="write here your description" value={description}
                      onChange={ev => setDescription(ev.target.value)}/> <br/>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value={"Me"}>me</option>
                <option value={"Work"}>work</option>
                <option value={"Home"}>home</option>
                <option value={"Kids"}>kids</option>
                <option value={"Pet"}>pet</option>
                <option value={"Health"}>health</option>
                <option value={"Others"}>others</option>
            </select> <br/>
            <input type="text" placeholder="write here by whom" value={createdBy}
                   onChange={ev => setCreatedBy(ev.target.value)}/>
            <button onClick={() => AddOrEdit()}>Save</button>
            <button onClick={deleteTodo}>Delete</button>
        </div>

    )

}
