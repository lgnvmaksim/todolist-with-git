import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TaskType} from "./App";
import {UniversalButton} from "./Components/UniversalButton";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type TodolistPropsType = {
    titleValue: string
    tasks: TaskType[]
    changeFilter: (filteredValue: FilteredType) => void
    checkboxInputChange: (taskId: string, isDone: boolean) => void
    addTask: (newTitle: string) => void
    removeTask: (remoteId: string) => void
    filter: FilteredType
}

export const Todolist = (props: TodolistPropsType) => {
    const {changeFilter, filter} = props
    const [text, setText] = useState('')
    const [error, setError]=useState<string|null>(null)

    const checkboxInputChange = (taskId: string, e: boolean) => {
        props.checkboxInputChange(taskId, e)
    }
    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError(null)
    }

    const addTaskButtonHandler = () => {
        if (text.trim()) {
        props.addTask(text.trim())
        setText('')
    } else {
            setError('Mistake')

        }}
    const removeTaskButtonHandler = (id: string) => {
        props.removeTask(id)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }

    return <div className={a.todolist}>
        <h3>{props.titleValue}</h3>
        <input
            value={text}
            onChange={onChangeTextHandler}
            onKeyDown={onKeyDownHandler}
            className={error ? a.error : undefined}
        />
        <UniversalButton callback={addTaskButtonHandler} name={'+'}/>
        {error && <div className={a.errorMessage}>{error}</div>}
        <ul>
            {props.tasks.map(el => {
                return (
                    <li key={el.id}
                    className={el.isDone ? a.isDone :''}>
                        <input type="checkbox"
                               checked={el.isDone}
                               onChange={(e) => {
                                   checkboxInputChange(el.id, e.currentTarget.checked)
                               }}
                        />
                        <span>{el.title}</span>
                        <UniversalButton callback={() => {
                            removeTaskButtonHandler(el.id)
                        }} name={'x'}/>
                    </li>
                )
            })}
        </ul>
        <UniversalButton
            styles={ filter==='all' ? a.activeFilter : ''}
            callback={() => {
            changeFilter('all')
        }} name={'All'}/>
        <UniversalButton
            styles={ filter==='active' ? a.activeFilter : ''}
            callback={() => {
            changeFilter('active')
        }} name={'Active'}/>
        <UniversalButton
            styles={ filter==='completed' ? a.activeFilter : ''}
            callback={() => {
            changeFilter('completed')
        }} name={'Completed'}/>
    </div>
}