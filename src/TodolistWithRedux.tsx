import React, {memo, useCallback} from 'react';
import a from "./Components/Styles-modules/styles.module.css";
import {Span} from "./Components/Span";
import {Input} from "./Components/Input";
import {FilteredType, TaskKeyType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redusers/store";
import {changeFilterAC, changeTodolistTileAC, removeTodolistAC} from "./redusers/todolistReducer";
import {addTaskAC} from "./redusers/tasksReducer";
import {Tasks} from "./Components/Tasks";

type TodolistWithReduxPropsType = {
    todoID: string
    title: string
    filter: FilteredType
}

export const TodolistWithRedux = memo(({todoID, filter, title}: TodolistWithReduxPropsType) => {
    let tasks = useSelector<AppRootStateType, TaskKeyType[]>(state => state.tasks[todoID])
    const dispatch = useDispatch()

    const changeTodolistTile = useCallback((todoID: string, newTitle: string) => {
        dispatch(changeTodolistTileAC(todoID, newTitle))
    }, [])

    const removeTodolist = useCallback((todoID: string) => {
        dispatch(removeTodolistAC(todoID))
    }, [])

    const addTask = useCallback((todoID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todoID, newTaskTitle))
    }, [])

    const changeFilter = useCallback((todoID: string, value: FilteredType) => {
        dispatch(changeFilterAC(todoID, value))
    }, [])


    if (filter === 'completed') {
        tasks = tasks.filter(f => f.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(f => !f.isDone)
    }

    return <div className={a.todolist}>
        <h3><Span title={title} callback={(newSpanTitle) => changeTodolistTile(todoID, newSpanTitle)}/>
            <button onClick={() => removeTodolist(todoID)}>x</button>
        </h3>
        <Input callback={(newText) => addTask(todoID, newText)}/>
        <ul>{tasks.map(el => <Tasks todoID={todoID} task={el} key={el.id}/>
        )}</ul>
        <button onClick={() => changeFilter(todoID, 'all')}>All</button>
        <button onClick={() => changeFilter(todoID, 'active')}>Active</button>
        <button onClick={() => changeFilter(todoID, 'completed')}>Completed</button>
    </div>
})

