import a from './Components/Styles-modules/styles.module.css'
import {TaskType} from "./App";


type TodolistPropsType={
    titleValue:string
    tasks:TaskType[]
}

export const Todolist = (props:TodolistPropsType) => {
    return <div className={a.todolist}>
        <h3>{props.titleValue}</h3>
        <input/>
        <button>+</button>
        <ul>
            {props.tasks.map(el=>{
                return(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}