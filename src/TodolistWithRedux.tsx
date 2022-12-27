import React, {memo, useCallback} from 'react';
import a from "./Components/Styles-modules/styles.module.css";
import {Span} from "./Components/Span";
import {Input} from "./Components/Input";
import {FilteredType, TaskKeyType, TaskType} from "./App";
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
    console.log('Todolist')
    let tasks = useSelector<AppRootStateType, TaskKeyType[]>(state => state.tasks[todoID])
    const dispatch = useDispatch()

    const changeTodolistTile = useCallback((todoID: string, newTitle: string) => {
        dispatch(changeTodolistTileAC(todoID, newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todoID: string) => {
        dispatch(removeTodolistAC(todoID))
    }, [dispatch])
    const addTask = useCallback((todoID: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todoID, newTaskTitle))
    }, [])

    const changeFilter = useCallback((todoID: string, value: FilteredType) => {
        dispatch(changeFilterAC(todoID, value))
    }, [dispatch])


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
            //     <li key={el.id}
            //         className={el.isDone ? a.isDone : ''}>
            //         <input type="checkbox" checked={el.isDone}
            //                onChange={(e) => changeChecked(todoID, el.id, e.currentTarget.checked)}/>
            //         <Span title={el.title} callback={(newSpanTitle) => changeTaskTitle(todoID, el.id, newSpanTitle)}/>
            //         <button onClick={() => removeTask(todoID, el.id)}>x</button>
            //     </li>
            // )
        )}</ul>
        <button onClick={() => changeFilter(todoID, 'all')}>All</button>
        <button onClick={() => changeFilter(todoID, 'active')}>Active</button>
        <button onClick={() => changeFilter(todoID, 'completed')}>Completed</button>
    </div>
})

