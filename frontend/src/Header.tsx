import LogoOY from "./images/LogoOY.png"
import React from "react";;
export default function Header(){


    return(
        <div className='logoContainer'>
            <img className='logo' src={LogoOY} alt=''/>
            <h2 className= 'logoText'>Organize Yourself : task manager</h2>
        </div>
    )
}