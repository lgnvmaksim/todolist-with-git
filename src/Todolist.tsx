import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TasksListType} from "./App";
import SuperInput from "./Components/SuperInput";
import {SuperSpan} from "./Components/SuperSpan";
import {Tasks} from "./Components/Tasks";


type TodolistPropsType = {
    titleValue: string
    tasks: TasksListType[]
    todoID: string
    changeFilter: (todoID: string, value: FilteredType) => void
    removeTasks: (todoID: string, taskID: string) => void
    changeCheckbox: (todoID: string, taskID: string, isDone: boolean) => void
    addTasks: (todoID: string, newTitle: string) => void
    filter: FilteredType
    removeTodolist: (todoID: string) => void
    changeTasks: (todoID: string, tasksID: string, newTitle: string) => void
    changeTodolistTitle: (todoID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const {
        changeFilter, todoID, tasks, changeTasks, changeCheckbox, removeTasks,
        addTasks, filter, removeTodolist, changeTodolistTitle
    } = props

    return <div className={a.todolist}>
        <h3><SuperSpan title={props.titleValue}
                       callback={(newTitle) => changeTodolistTitle(todoID, newTitle)}/>
            <button onClick={() => removeTodolist(todoID)}>x</button>
        </h3>
        <SuperInput callback={(newText) => addTasks(todoID, newText)}/>
        <Tasks tasks={tasks}
               changeTasks={changeTasks}
               todoID={todoID}
               changeCheckbox={changeCheckbox}
               removeTasks={removeTasks}/>
        <button className={filter === 'all' ? a.activeFilter : ''} onClick={() => changeFilter(todoID, 'all')}>All
        </button>
        <button className={filter === 'active' ? a.activeFilter : ''}
                onClick={() => changeFilter(todoID, 'active')}>Active
        </button>
        <button className={filter === 'completed' ? a.activeFilter : ''}
                onClick={() => changeFilter(todoID, 'completed')}>Completed
        </button>
    </div>
}