import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TaskType} from "./App";
import {UniversalButton} from "./Components/UniversalButton";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AirplanemodeInactive} from "@mui/icons-material";


type TodolistPropsType = {
    todoID:string
    titleValue: string
    tasks: TaskType[]
    changeFilter: (todoID:string,filteredValue: FilteredType) => void
    checkboxInputChange: (todoID:string, taskId: string, isDone: boolean) => void
    addTask: (todoID:string, newTitle: string) => void
    removeTask: (todoID:string, remoteId: string) => void
    filter: FilteredType
    removeTodolist:(todoID:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    const {changeFilter, filter, todoID} = props
    const [text, setText] = useState('')
    const [error, setError]=useState<string|null>(null)

    const checkboxInputChange = (todoID:string, taskId: string, e: boolean) => {
        props.checkboxInputChange(todoID,taskId, e)
    }
    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError(null)
    }

    const addTaskButtonHandler = () => {
        if (text.trim()) {
        props.addTask(todoID,text.trim())
        setText('')
    } else {
            setError('Лососни тунца')

        }}
    const removeTaskButtonHandler = (id: string) => {
        props.removeTask(todoID ,id)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    const mappingTasks = props.tasks.map(el => {
        return (
            <li key={el.id}
                className={el.isDone ? a.isDone :''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={(e) => {
                           checkboxInputChange(todoID, el.id, e.currentTarget.checked)
                       }}
                />
                <span>{el.title}</span>
                <UniversalButton callback={() => {
                    removeTaskButtonHandler(el.id)
                }} name={'x'}/>
            </li>
        )
    })
    const removeTodolistButtonHandler = () => {
        props.removeTodolist(todoID)
    }

    return <div className={a.todolist}>
        <h3>
            {props.titleValue}
        <UniversalButton callback={removeTodolistButtonHandler} name={'x'}/>
        </h3>
        <input
            value={text}
            onChange={onChangeTextHandler}
            onKeyDown={onKeyDownHandler}
            className={error ? a.error : undefined}
        />
        <UniversalButton callback={addTaskButtonHandler} name={'+'}/>
        {error && <div className={a.errorMessage}>{error}</div>}
        <ul>
            {mappingTasks}
        </ul>
        <UniversalButton
            styles={ filter==='all' ? a.activeFilter : ''}
            callback={() => {
            changeFilter(todoID,'all')
        }} name={'All'}/>
        <UniversalButton
            styles={ filter==='active' ? a.activeFilter : ''}
            callback={() => {
            changeFilter(todoID,'active')
        }} name={'Active'}/>
        <UniversalButton
            styles={ filter==='completed' ? a.activeFilter : ''}
            callback={() => {
            changeFilter(todoID,'completed')
        }} name={'Completed'}/>
    </div>
}