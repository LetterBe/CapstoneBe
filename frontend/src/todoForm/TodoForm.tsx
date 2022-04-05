import {useState} from "react";

export default function TodoForm () {

    const [task, setTask] = useState ('');
    const [description, setDescription] = useState ('');
    const [category, setCategory] = useState ('Work');
    const [createdBy, setCreatedBy] = useState ('Me');

    const savedTodoItem = () => {
        fetch('http://localhost:8080/api/todos', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                task: task,
                description: description,
                category : category,
                createdBy : createdBy
            } ),
        })
    }


    return (
        <div>
            <input  type="text" placeholder="Your task" value={task}
                    onChange={ev => setTask(ev.target.value)} /> <br/>
            <input  type="text" placeholder="Describe it" value={description}
                    onChange={ev => setDescription(ev.target.value)} /> <br/>
            <select  value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value={"Me"}>me</option>
                <option value={"Work"}>work</option>
                <option value={"Home"}>home</option>
                <option value={"Kids"}>kids</option>
                <option value={"Pet"}>pet</option>
                <option value={"Health"}>health</option>
                <option value={"Others"}>others</option>
            </select> <br/>
            <input  type="text" placeholder="who has to do it?" value={createdBy}
                     onChange={ev => setCreatedBy(ev.target.value)}/> <br/>
            <button onClick={() => savedTodoItem()}>Send it!</button>
        </div>
    )
}