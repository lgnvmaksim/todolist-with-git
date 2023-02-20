import React, {memo, useCallback} from 'react';
import a from "./Components/Styles-modules/styles.module.css";
import {Span} from "./Components/Span";
import {Input} from "./Components/Input";
import {useAppDispatch, useAppSelector} from "./redusers/store";
import {changeFilterAC, changeTodolistTileAC, FilteredType, removeTodolistAC} from "./redusers/todolistReducer";
import {addTaskAC} from "./redusers/tasksReducer";
import {Tasks} from "./Components/Tasks";
import {ItemsType, TaskStatuses} from "./api/todolistApi";

type TodolistWithReduxPropsType = {
    todoID: string
    title: string
    filter: FilteredType
}



export const TodolistWithRedux = memo(({todoID, filter, title}: TodolistWithReduxPropsType) => {
    let tasks = useAppSelector<ItemsType[]>(state => state.tasks[todoID])
    const dispatch = useAppDispatch()

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
        tasks = tasks.filter(f => f.status===TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasks = tasks.filter(f => f.status===TaskStatuses.New)
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

