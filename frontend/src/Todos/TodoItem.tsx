
import {TodoDTO} from "./TodoDTOModel";

interface TodoItemProps {
    todoItem : TodoDTO;
    onTodoSelected : (todoItem : TodoDTO) => void;
    onTodoChange: () => void;
}
export default function TodoItem (props: TodoItemProps) {

    const toggleItem = () => {
        const changedTodoItem = props.todoItem;
        changedTodoItem.status = !changedTodoItem.status;
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${props.todoItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
    }



    return (
        <li onClick={() => props.onTodoSelected(props.todoItem)} key={`${props.todoItem.id}`}>{props.todoItem.task} {props.todoItem.description}
            <input type='checkbox' checked={props.todoItem.status} onChange={() => toggleItem() } />
        </li>

    )

}
