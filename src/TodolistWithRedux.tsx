import React from 'react';
import a from "./Components/Styles-modules/styles.module.css";
import {SuperSpan} from "./Components/SuperSpan";
import SuperInput from "./Components/SuperInput";
import {CheckBox} from "./Components/CheckBox";
import {FilteredType, TasksListType, TaskType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/store";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Reducers/TodolistReducer";
import {addTasksAC, changeCheckboxAC, changeTasksAC, removeTasksAC} from "./Reducers/TasksReducer";

export type TodolistWithReduxType = {
    todoID: string
    titleValue: string
    filter: FilteredType
}

export const TodolistWithRedux = ({
                                      todoID
                                      , filter, titleValue
                                  }: TodolistWithReduxType) => {

    let tasks = useSelector<AppRootStateType, TasksListType[]>(state => state.tasks[todoID])
    const dispatch = useDispatch()

    if (filter === 'active') {
        tasks = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(f => f.isDone)
    }
    return <div className={a.todolist}>
        <h3><SuperSpan title={titleValue}
                       callback={(newTitle) => dispatch(changeTodolistTitleAC(todoID, newTitle))}/>
            <button onClick={() => dispatch(removeTodolistAC(todoID))}>x</button>
        </h3>
        <SuperInput callback={(newTitle) => dispatch(addTasksAC(todoID, newTitle))}/>
        {tasks.map(el => {
            return (
                <ul>
                    <li className={el.isDone ? a.isDone : ''} key={el.id}>
                        <CheckBox value={el.isDone}
                                  callback={(event) => dispatch(changeCheckboxAC(todoID, el.id, event))}/>
                        <SuperSpan title={el.title}
                                   callback={(newTitle) => dispatch(changeTasksAC(todoID, el.id, newTitle))}/>
                        <button onClick={() => dispatch(removeTasksAC(todoID, el.id))}>x</button>
                    </li>
                </ul>
            )
        })}
        <button className={filter === 'all' ? a.activeFilter : ''}
                onClick={() => dispatch(changeFilterAC(todoID, 'all'))}>All
        </button>
        <button className={filter === 'active' ? a.activeFilter : ''}
                onClick={() => dispatch(changeFilterAC(todoID, 'active'))}>Active
        </button>
        <button className={filter === 'completed' ? a.activeFilter : ''}
                onClick={() => dispatch(changeFilterAC(todoID, 'completed'))}>Completed
        </button>
    </div>
};
