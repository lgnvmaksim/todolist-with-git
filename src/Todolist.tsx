import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TaskKeyType} from "./App";
import {Input} from "./Components/Input";
import {SuperSpan} from "./Components/SuperSpan";


type TodolistPropsType = {
    titleValue: string
    tasks: TaskKeyType[]
    todoID: string
    changeFilter: (todoID: string, filterValue: FilteredType) => void
    removeTasks: (todoID: string, taskID: string) => void
    addTask: (todoID: string, newTitle: string) => void
    changeCheckBox: (todoID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todoID: string) => void
    changeTasks: (todoID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const {todoID, changeFilter} = props
    const superSpanHandler = (taskID: string, newTitle: string) => {
        props.changeTasks(todoID, taskID, newTitle)
    }
    const mappingTasks = props.tasks.map(el => {
        return (
            <ul>
                <li key={el.id}
                    className={el.isDone ? a.isDone : ''}>
                    <input type="checkbox" checked={el.isDone}
                           onChange={(e) => {
                               props.changeCheckBox(todoID, el.id, e.currentTarget.checked)
                           }}/>
                    <SuperSpan title={el.title} callback={(newText) => {
                        superSpanHandler(el.id, newText)
                    }}/>
                    <button onClick={() => {
                        props.removeTasks(todoID, el.id)
                    }}>x
                    </button>
                </li>
            </ul>
        )
    })

    return <div className={a.todolist}>
        <h3>
            <SuperSpan title={props.titleValue} callback={(newText) => {
                props.changeTodolistTitle(todoID, newText)
            }}/>
            <button onClick={() => {
                props.removeTodolist(todoID)
            }}>x
            </button>
        </h3>
        <Input callback={(newText: string) => {
            props.addTask(todoID, newText)
        }}/>

        {mappingTasks}

        <button onClick={() => {
            changeFilter(todoID, 'all')
        }}>All
        </button>
        <button onClick={() => {
            changeFilter(todoID, 'active')
        }}>Active
        </button>
        <button onClick={() => {
            changeFilter(todoID, 'completed')
        }}>Completed
        </button>
    </div>
}