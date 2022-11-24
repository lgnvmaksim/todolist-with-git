import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'
import {addTaskAC, checkboxInputChangeAC, removeTackAC, tasksReducer} from "./reducers/tasksReducer";
import {changeFilterAC, FilterReducer} from "./reducers/filterReducer";

export type FilteredType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let [tasks, tasksDispatch] = useReducer(tasksReducer, [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},])


    const [filter, filterDispatch] = useReducer(FilterReducer, 'all')

    const checkboxInputChange = (taskId: string, isDone: boolean) => {
        tasksDispatch(checkboxInputChangeAC(taskId, isDone))
    }

    const removeTask = (removeId: string) => {
        tasksDispatch(removeTackAC(removeId))
    }

    const addTask = (newTitle: string) => {
        tasksDispatch(addTaskAC(newTitle))
    }


    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(f => f.isDone)
    }

    const changeFilter = (filteredValue: FilteredType) => {
        filterDispatch(changeFilterAC(filteredValue))
    }

    return <div className={a.App}>
        <Todolist titleValue={'Hello ToDo'}
                  tasks={filteredTasks}
                  changeFilter={changeFilter}
                  checkboxInputChange={checkboxInputChange}
                  addTask={addTask}
                  removeTask={removeTask}
                  filter={filter}
        />
    </div>

}

export default App;
