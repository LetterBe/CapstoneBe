import {useNavigate} from "react-router-dom";

export default function Logout() {

    const nav = useNavigate()
    localStorage.setItem('task', '')
    localStorage.setItem('description', '')
    localStorage.setItem('category', '')
    localStorage.setItem('createdBy', '')
    nav('/login')

    return(
        <div>
            "See you next time!"
        </div>
    )
}
