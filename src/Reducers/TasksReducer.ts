import {TaskType} from "../App";
import {v1} from "uuid";
import {removeTodolistACType} from "./TodolistReducer";

type SuperType = removeTasksACType | changeCheckboxACType |
    addTasksACType | changeTasksACType | addTodolistTasksACType | removeTodolistACType

const initialState: TaskType ={}

export const TasksReducer = (state: TaskType = initialState, action: SuperType) => {

    switch (action.type) {
        case 'REMOVE-TASKS' : {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].filter(f =>
                    f.id !== action.payload.taskID)
            }
        }
        case "CHANGE-CHECKBOX": {
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map(el =>
                    el.id === action.payload.taskID ? {...el, isDone: action.payload.isDone} : el)
            }
        }
        case "ADD-TASKS": {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todoID]: [newTask, ...state[action.payload.todoID]]}
        }
        case "CHANGE-TASKS": {
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map(el =>
                    el.id === action.payload.tasksID ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.newTodolistID]: []
            }
        } case 'REMOVE-TODOLIST':{
            let copyState ={...state}
            delete  copyState[action.payload.todoID]
            return copyState
        }
        default:
            return state
    }
}

type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {todoID, taskID}
    } as const
}

type changeCheckboxACType = ReturnType<typeof changeCheckboxAC>
export const changeCheckboxAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-CHECKBOX',
        payload: {todoID, taskID, isDone}
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todoID: string, newTitle: string) => {
    return {
        type: 'ADD-TASKS',
        payload: {todoID, newTitle}
    } as const
}

type changeTasksACType = ReturnType<typeof changeTasksAC>
export const changeTasksAC = (todoID: string, tasksID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASKS',
        payload: {todoID, tasksID, newTitle}
    } as const
}

type addTodolistTasksACType = ReturnType<typeof addTodolistTasksAC>
export const addTodolistTasksAC = () => {
    const newTodolistID = v1()
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistID}
    } as const
}