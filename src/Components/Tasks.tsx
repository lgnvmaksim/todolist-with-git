import React, {memo, useCallback} from 'react';
import a from "./Styles-modules/styles.module.css";
import {Span} from "./Span";
import {changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC} from "../redusers/tasksReducer";
import {ItemsType, TaskStatuses} from "../api/todolistApi";
import {useAppDispatch} from "../redusers/store";


type TaskType ={
    todoID:string
    task: ItemsType
}

export const Tasks = memo(({todoID, task}:TaskType) => {
  const dispatch = useAppDispatch()

    const changeChecked = useCallback((todoID: string, taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todoID, taskID, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(todoID, taskID, newTitle))
    }, [dispatch])
    const removeTask = useCallback((todoID: string, taskID: string) => {
        dispatch(deleteTaskTC(todoID, taskID))
    }, [dispatch])



    return (
        <li key={task.id}
            className={task.status===TaskStatuses.Completed ? a.isDone : ''}>
            <input type="checkbox" checked={task.status===TaskStatuses.Completed}
                   onChange={(e) => changeChecked(todoID, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}/>
            <Span title={task.title} callback={(newSpanTitle) => changeTaskTitle(todoID, task.id, newSpanTitle)}/>
            <button onClick={() => removeTask(todoID, task.id)}>x</button>
        </li>
    )
})
