import React, {memo, useCallback} from 'react';
import a from "./Styles-modules/styles.module.css";
import {Span} from "./Span";
import {changeCheckedAC, changeTaskTitleAC, removeTaskAC} from "../redusers/tasksReducer";
import {useDispatch} from "react-redux";

import {TaskKeyType} from "../App";

type TaskType ={
    todoID:string
    task: TaskKeyType
}

export const Tasks = memo(({todoID, task}:TaskType) => {
  const dispatch = useDispatch()

    const changeChecked = useCallback((todoID: string, taskID: string, isDoneValue: boolean) => {
        dispatch(changeCheckedAC(todoID, taskID, isDoneValue))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoID, taskID, newTitle))
    }, [dispatch])
    const removeTask = useCallback((todoID: string, taskID: string) => {
        dispatch(removeTaskAC(todoID, taskID))
    }, [dispatch])
    return (
        <li key={task.id}
            className={task.isDone ? a.isDone : ''}>
            <input type="checkbox" checked={task.isDone}
                   onChange={(e) => changeChecked(todoID, task.id, e.currentTarget.checked)}/>
            <Span title={task.title} callback={(newSpanTitle) => changeTaskTitle(todoID, task.id, newSpanTitle)}/>
            <button onClick={() => removeTask(todoID, task.id)}>x</button>
        </li>
    )
})
