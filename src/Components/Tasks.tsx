import React from 'react';
import {TasksListType} from "../App";
import a from "./Styles-modules/styles.module.css";
import {CheckBox} from "./CheckBox";
import {SuperSpan} from "./SuperSpan";

type TasksType={
    tasks: TasksListType[]
    changeTasks: (todoID: string, tasksID: string, newTitle: string) => void
    todoID: string
    changeCheckbox: (todoID: string, taskID: string, isDone: boolean) => void
    removeTasks: (todoID: string, taskID: string) => void
}

export const Tasks = (props:TasksType) => {
    const changeTasksTitleHandler = (taskID: string, newTitle: string) => {
        props.changeTasks(props.todoID, taskID, newTitle)
    }
    return <div>
        {props.tasks.map(el => {
            return (
                <ul>
                    <li className={el.isDone ? a.isDone : ''} key={el.id}>
                        <CheckBox value={el.isDone}
                                  callback={(event) => props.changeCheckbox(props.todoID, el.id, event)}/>
                        <SuperSpan title={el.title} callback={(newTitle) => changeTasksTitleHandler(el.id, newTitle)}/>
                        <button onClick={() => props.removeTasks(props.todoID, el.id)}>x</button>
                    </li>
                </ul>
            )
        })}
        </div>
};

