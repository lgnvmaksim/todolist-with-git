import a from './Components/Styles-modules/styles.module.css'
import {tasks} from "./State/First-state-server";
import {UniversalButton} from "./Components/UniversalButton";

type TodolistPropsType={
    titleValue:string
}

export const Todolist = (props:TodolistPropsType) => {

    return <div className={a.todolist}>
        <h3>{props.titleValue}</h3>
        <input/>
        <button>+</button>

        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}