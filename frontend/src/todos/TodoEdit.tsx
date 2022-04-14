import {TodoDTO} from "./TodoDTOModel";
import {useEffect, useState} from "react";


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

    /* const deleteTodo = () => {
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
     }*/

    return (
        <div>
            {errorMessage}
            <input type="text" placeholder="write here your task" value={task}
                   onChange={ev => setTask(ev.target.value)}/>
            <button onClick={() => AddOrEdit()}>Save your task!</button>
            <br/>
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
            </select>

        </div>

    )

}
