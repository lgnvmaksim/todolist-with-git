import a from './Components/Styles-modules/styles.module.css'

type TodolistPropsType={
    titleValue:string
}

export const Todolist = (props:TodolistPropsType) => {
    return <div className={a.todolist}>
        <h3>{props.titleValue}</h3>
        <input/>
        <button>+</button>
        <ul>
            <li>
                <span>Hello</span>
            </li>
        </ul>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
}