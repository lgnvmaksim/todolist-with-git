import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import a from './Components/Styles-modules/styles.module.css'
import {v1} from "uuid";
import {
    addNewTodolistAC,
    changeFilterAC,
    changeTodolistTileAC,
    removeTodolistAC,
    todolistReducer
} from "./redusers/todolistReducer";
import {addTaskAC, changeCheckedAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./redusers/tasksReducer";
import {Input} from "./Components/Input";

export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

export type TaskType = {
    [key: string]: TaskKeyType[]
}

export type TaskKeyType = {
    id: string
    title: string
    isDone: boolean
}


export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer,{
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

    const changeFilter = (todoID:string, value: FilteredType) => {
        todolistsDispatch(changeFilterAC(todoID, value))
    }

    const removeTask = (todoID: string, taskID: string)=>{
        tasksDispatch(removeTaskAC(todoID, taskID))
    }

    const addTask = (todoID:string, newTaskTitle:string) => {
        tasksDispatch(addTaskAC(todoID, newTaskTitle))
    }

    const changeChecked = (todoID:string, taskID:string, isDoneValue:boolean) => {
        tasksDispatch(changeCheckedAC(todoID, taskID, isDoneValue))
    }

    const removeTodolist = (todoID:string) => {
        todolistsDispatch(removeTodolistAC(todoID))
        tasksDispatch(removeTodolistAC(todoID))
    }

    const changeTaskTitle = (todoID: string, taskID: string, newTitle: string) => {
        tasksDispatch(changeTaskTitleAC(todoID, taskID, newTitle))
    }
    const changeTodolistTile = (todoID:string, newTitle:string) => {
        todolistsDispatch(changeTodolistTileAC(todoID, newTitle))
    }

    const addNewTodolist = ( newTitle:string) => {
        const action = addNewTodolistAC(newTitle)
        todolistsDispatch(action)
        tasksDispatch(action)
    }

    return <div className={a.App}>
        <Input callback={addNewTodolist}/>
        {todolists.map(el => {
            let filteredTasks = tasks[el.id]
            if (el.filter === 'active') {
                filteredTasks = tasks[el.id].filter(f => !f.isDone)
            }
            if (el.filter === 'completed') {
                filteredTasks = tasks[el.id].filter(f => f.isDone)
            }
            return (
                <Todolist titleValue={el.title}
                          tasks={filteredTasks}
                          todoID={el.id}
                          key={el.id}
                          filter={el.filter}
                          changeFilter={changeFilter}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeChecked={changeChecked}
                          removeTodolist={removeTodolist}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTile={changeTodolistTile}

                />
            )
        })}


    </div>

}

