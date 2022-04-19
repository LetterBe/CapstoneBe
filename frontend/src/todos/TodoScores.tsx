import {TodoDTO} from "./TodoDTOModel";
import {useEffect, useState} from "react";


interface TodoScoresProps {
    todoScores : TodoDTO
}
export default function TodoScores(props: TodoScoresProps) {

    let [score, setScores] = useState(localStorage.getItem('score') ?? {} as number )


    const addScore = () => {
        const token = localStorage.getItem('token')
        const add = (score) => Math.round((score + 1))
        if(props.todoScores.score !== 0){
            add(score);

        }
    }

    useEffect(() => {
        addScore()
    }, [setScores]);


}
