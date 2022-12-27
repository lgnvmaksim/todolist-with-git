import a from '../Components/Styles-modules/styles.module.css'
import {FilteredType, TaskKeyType} from "../App";
import {Input} from "../Components/Input";
import {Span} from "../Components/Span";

type TodolistPropsType = {
    titleValue: string
    tasks: TaskKeyType[]
    todoID: string
    filter: FilteredType
    changeFilter: (todoID: string, value: FilteredType) => void
    removeTask: (todoID: string, taskID: string) => void
    addTask: (todoID: string, newTaskTitle: string) => void
    changeChecked: (todoID: string, taskID: string, isDoneValue: boolean) => void
    removeTodolist: (todoID: string) => void
    changeTaskTitle: (todoID: string, taskID: string, newTitle: string) => void
    changeTodolistTile: (todoID:string, newTitle:string)=>void
}

export const Todolist = ({
                             titleValue,
                             todoID,
                             filter,
                             tasks,
                             changeFilter,
                             removeTask,
                             addTask,
                             changeChecked,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTile
                         }: TodolistPropsType) => {

    const removeTaskHandler = (taskId: string) => {
        removeTask(todoID, taskId)
    }
    const changeCheckedHandler = (taskID: string, isDoneValue: boolean) => {
        changeChecked(todoID, taskID, isDoneValue)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todoID)
    }
    const addTaskInputHandler = (newText: string) => {
        addTask(todoID, newText)
    }

    const mappingTasks = tasks.map(el => {
        return (
            <li key={el.id}
                className={el.isDone ? a.isDone : ''}>
                <input type="checkbox" checked={el.isDone}
                       onChange={(e) => changeCheckedHandler(el.id, e.currentTarget.checked)}/>
                <Span title={el.title} callback={(newSpanTitle) =>changeTaskTitle(todoID, el.id, newSpanTitle)}/>
                <button onClick={() => removeTaskHandler(el.id)}>x</button>
            </li>
        )
    })

    return <div className={a.todolist}>
        <h3> <Span title={titleValue} callback={(newSpanTitle)=>changeTodolistTile(todoID, newSpanTitle)}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <Input callback={(newText) => addTaskInputHandler(newText)}/>

        <ul>{mappingTasks}</ul>
        <button onClick={() => changeFilter(todoID, 'all')}>All</button>
        <button onClick={() => changeFilter(todoID, 'active')}>Active</button>
        <button onClick={() => changeFilter(todoID, 'completed')}>Completed</button>
    </div>
}