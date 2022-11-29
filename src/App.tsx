import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'
import {Input} from "./Components/Input";

export type FilteredType = 'all' | 'active' | 'completed'


export type TodolistType={
    id:string
    title:string
    filter:FilteredType
}

export type TaskType ={
    [key:string]:TaskKeyType[]
}

export type TaskKeyType={
    id:string
    title:string
    isDone:boolean
}

function App() {

let todolistID1 = v1();
let todolistID2 = v1();

let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
])

let [tasks, setTasks] = useState<TaskType>({
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
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
    const changeFilter = (todoID:string, filterValue: FilteredType) => {
        setTodolists(todolists.map(el=>el.id===todoID ? {...el, filter:filterValue} :el))}

    const removeTasks = (todoID:string, taskID:string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].filter(f=>f.id!==taskID)})
    }

    const addTask = (todoID:string, newTitle:string) => {
    let newTask={id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }

    const changeCheckBox = (todoID:string, taskID:string, isDone:boolean) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(el=>
            el.id===taskID ? {...el, isDone} :el)})
    }

    const removeTodolist = (todoID:string) => {
       setTodolists(todolists.filter(f=>f.id!==todoID))
        delete tasks[todoID]

    }

    const addTodolist = ( newTitleTodo:string) => {
        const newID=v1()
        const newTodolist:TodolistType = {id: newID, title: newTitleTodo, filter: 'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks, [newID]: [
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "JS", isDone: false}
            ]})
    }

    const changeTasks = (todoID:string, taskID:string, newTitle:string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(el=>
            el.id===taskID ? {...el, title: newTitle} :el)})
    }

    const changeTodolistTitle = (todoID:string, newTitle:string) => {
        setTodolists(todolists.map(el=>el.id===todoID
            ? {...el, title:newTitle} :el))
    }


    return <div className={a.App}>
        <Input callback={addTodolist}/>
        {todolists.map(el=>{
            let filteredTasks = tasks[el.id]
            if (el.filter==='active'){
                filteredTasks = tasks[el.id].filter(f=>!f.isDone)
            }
            if (el.filter==='completed'){
                filteredTasks = tasks[el.id].filter(f=>f.isDone)
            }
            return(
                <Todolist
                    key={el.id}
                    todoID={el.id}
                    tasks={filteredTasks}
                    titleValue={el.title}
                    changeFilter={changeFilter}
                    removeTasks={removeTasks}
                    addTask={addTask}
                    changeCheckBox={changeCheckBox}
                    removeTodolist={removeTodolist}
                    changeTasks={changeTasks}
                    changeTodolistTitle={changeTodolistTitle}/>
            )
        })}

    </div>

}


export default App;
