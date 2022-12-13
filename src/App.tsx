import React, {useReducer, useState} from 'react';
import {Todolist} from "./Todolist";
import a from './Components/Styles-modules/styles.module.css'
import {v1} from "uuid";
import SuperInput from "./Components/SuperInput";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistReducer
} from "./Reducers/TodolistReducer";
import {addTasksAC, changeCheckboxAC, changeTasksAC, removeTasksAC, TasksReducer} from "./Reducers/TasksReducer";

export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

export type TaskType = {
    [key: string]: TasksListType[]
}

export type TasksListType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(TodolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
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
            {id: v1(), title: "GraphQL2", isDone: false}
        ]
    });

    const changeFilter = (todoID: string, value: FilteredType) => {
        todolistsDispatch(changeFilterAC(todoID, value))
    }

    const removeTasks = (todoID: string, taskID: string) => {
        tasksDispatch(removeTasksAC(todoID, taskID))
    }

    const changeCheckbox = (todoID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeCheckboxAC(todoID, taskID, isDone))
    }

    const addTasks = (todoID: string, newTitle: string) => {
        tasksDispatch(addTasksAC(todoID, newTitle))
    }

    const removeTodolist = (todoID: string) => {
        todolistsDispatch(removeTodolistAC(todoID))
        tasksDispatch(removeTodolistAC(todoID)) //хз правильно ли
    }

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        todolistsDispatch(action)
        tasksDispatch(action)
    }

    const changeTasks = (todoID: string, tasksID: string, newTitle: string) => {
        tasksDispatch(changeTasksAC(todoID, tasksID, newTitle))
    }

    const changeTodolistTitle = (todoID: string, newTitle: string) => {
        todolistsDispatch(changeTodolistTitleAC(todoID, newTitle))
    }

    return <div className={a.App}>
        <SuperInput callback={addTodolist}/>
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
                    titleValue={el.title}
                    tasks={filteredTasks}
                    todoID={el.id}
                    changeFilter={changeFilter}
                    removeTasks={removeTasks}
                    changeCheckbox={changeCheckbox}
                    addTasks={addTasks}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                    changeTasks={changeTasks}
                    changeTodolistTitle={changeTodolistTitle}
                />
            )
        })}


    </div>

}


export default App;
