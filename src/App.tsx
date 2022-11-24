import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'
import {UniversalInput} from "./Components/UniversalInput";
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    removeTodolistAC,
    TodolistReduce
} from "./reducers/TodolistReduce";
import {
    addTaskAC,
    changeTitleInSpanAC,
    checkboxInputChangeAC,
    removeTaskAC,
    TasksReducer
} from "./reducers/tasksReducer";

export type FilteredType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

export type TaskKeyType = {
    [key: string]: TaskType[]
}

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();
    // let [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    // let [tasks, setTasks] = useState<TaskKeyType>({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    let[tasks, tasksDispatch] = useReducer(TasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    } )
    let [todolists, todolistsDispatch] = useReducer(TodolistReduce, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const changeTodolistTitle = (todoID: string, newTitle: string) => {
        todolistsDispatch(changeTodolistTitleAC(todoID, newTitle))
    }

    const removeTodolist = (todoID: string) => {
        todolistsDispatch(removeTodolistAC(todoID))
        delete tasks[todoID]
    }

    const changeFilter = (todoID: string, filteredValue: FilteredType) => {
        todolistsDispatch(changeFilterAC(todoID, filteredValue))
    }

    const checkboxInputChange = (todoID: string, taskId: string, isDone: boolean) => {
        tasksDispatch(checkboxInputChangeAC(todoID,taskId,isDone ))
    }

    const addTask = (todoID: string, newTitle: string) => {
        tasksDispatch(addTaskAC(todoID,newTitle))
    }

    const removeTask = (todoID: string, remoteId: string) => {
        tasksDispatch(removeTaskAC(todoID,remoteId))
    }

    const changeTitleInSpan = (todoID: string, taskId: string, newTitle: string) => {
      tasksDispatch(changeTitleInSpanAC(todoID,taskId,newTitle))
    }

    const createTodolist = (newTitleTodo: string) => {
        const action = createTodolistAC(newTitleTodo)
      todolistsDispatch(action)
        tasksDispatch(action)
    }




    return <div className={a.App}>
        <UniversalInput callback={createTodolist}/>
        {todolists.map(el => {
            let filteredTasks = tasks[el.id]
            if (el.filter === 'active') {
                filteredTasks = tasks[el.id].filter(f => !f.isDone)
            }
            if (el.filter === 'completed') {
                filteredTasks = tasks[el.id].filter(f => f.isDone)
            }
            return (
                <Todolist
                    key={el.id}
                    todoID={el.id}
                    titleValue={el.title}
                    tasks={filteredTasks}
                    changeFilter={changeFilter}
                    checkboxInputChange={checkboxInputChange}
                    addTask={addTask}
                    removeTask={removeTask}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                    changeTitleInSpan={changeTitleInSpan}
                    changeTodolistTitle={changeTodolistTitle}
                />
            )
        })}


    </div>

}

export default App;
