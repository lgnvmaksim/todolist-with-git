import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'
import {UniversalInput} from "./Components/UniversalInput";

export type FilteredType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

type TaskKeyType = {
    [key: string]: TaskType[]
}

function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskKeyType>({
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
    });


    const changeFilter = (todoID: string, filteredValue: FilteredType) => {
        setTodolists(todolists.map(el => el.id === todoID ? {...el, filter: filteredValue} : el))
    }

    const checkboxInputChange = (todoID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const addTask = (todoID: string, newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }

    const removeTask = (todoID: string, remoteId: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter(f => f.id !== remoteId)})
    }

    const removeTodolist = (todoID: string) => {
        setTodolists(todolists.filter(f => f.id !== todoID))
        delete tasks[todoID]
    }

    const createTodolist = (newTitleTodo: string) => {
        const newTodolistID = v1()
        const newTodolist:TodolistType = {id: newTodolistID, title: newTitleTodo, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistID]: [
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ]})
    }

    const changeTitleInSpan = (todoID:string, taskId:string, newTitle:string) => {
    setTasks({...tasks, [todoID]: tasks[todoID].map(el=>el.id===taskId ? {...el, title:newTitle} :el)})
    }

    const changeTodolistTitle = (todoID:string, newTitle:string) => {
        setTodolists(todolists.map(el=>el.id===todoID ? {...el, title:newTitle} : el))
    }

    return <div className={a.App}>
        <UniversalInput callback={createTodolist}/>
        {todolists.map(el => {
            let filteredTasks = tasks[el.id]
            if (el.filter === 'active') {
                filteredTasks.filter(f => !f.isDone)
            }
            if (el.filter === 'completed') {
                filteredTasks.filter(f => f.isDone)
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
