import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TaskType} from "./App";
import {UniversalButton} from "./Components/UniversalButton";
import {AirplanemodeInactive} from "@mui/icons-material";
import {UniversalInput} from "./Components/UniversalInput";
import {SuperSpan} from "./Components/Span";


type TodolistPropsType = {
    todoID: string
    titleValue: string
    tasks: TaskType[]
    changeFilter: (todoID: string, filteredValue: FilteredType) => void
    checkboxInputChange: (todoID: string, taskId: string, isDone: boolean) => void
    addTask: (todoID: string, newTitle: string) => void
    removeTask: (todoID: string, remoteId: string) => void
    filter: FilteredType
    removeTodolist: (todoID: string) => void
    changeTitleInSpan:(todoID:string, taskId:string, newTitle:string)=>void
    changeTodolistTitle:(todoID:string, newTitle:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const {changeFilter, filter, todoID} = props

    const checkboxInputChange = (todoID: string, taskId: string, e: boolean) => {
        props.checkboxInputChange(todoID, taskId, e)
    }
    const removeTaskButtonHandler = (id: string) => {
        props.removeTask(todoID, id)
    }

    const changeTitleInSpanHandler = (id:string, newTitle:string) => {
        props.changeTitleInSpan(todoID, id, newTitle)
    }

    const mappingTasks = props.tasks.map(el => {

        return (
            <li key={el.id}
                className={el.isDone ? a.isDone : ''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={(e) => {
                           checkboxInputChange(todoID, el.id, e.currentTarget.checked)
                       }}
                />
               <SuperSpan spanTitle={el.title} changeTitleInSpan={(newTitle:string)=>{changeTitleInSpanHandler(el.id, newTitle)}} />
                <UniversalButton callback={() => {
                    removeTaskButtonHandler(el.id)
                }} name={'x'}/>
            </li>
        )
    })

    const removeTodolistButtonHandler = () => {
        props.removeTodolist(todoID)
    }
    const addTaskInputHandler = (text: string) => {
        props.addTask(todoID, text)
    }

    const changeTitleTodolistHandler = (newTitle:string) => {
        props.changeTodolistTitle(todoID, newTitle)
    }

    return <div className={a.todolist}>
        <h3>
            <SuperSpan spanTitle={props.titleValue} changeTitleInSpan={changeTitleTodolistHandler}/>
            <UniversalButton callback={removeTodolistButtonHandler} name={'x'}/>
        </h3>
        <UniversalInput callback={addTaskInputHandler}/>
        <ul>
            {mappingTasks}
        </ul>
        <UniversalButton
            styles={filter === 'all' ? a.activeFilter : ''}
            callback={() => {
                changeFilter(todoID, 'all')
            }} name={'All'}/>
        <UniversalButton
            styles={filter === 'active' ? a.activeFilter : ''}
            callback={() => {
                changeFilter(todoID, 'active')
            }} name={'Active'}/>
        <UniversalButton
            styles={filter === 'completed' ? a.activeFilter : ''}
            callback={() => {
                changeFilter(todoID, 'completed')
            }} name={'Completed'}/>
    </div>
}