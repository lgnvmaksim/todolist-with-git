import {TaskKeyType} from "../App";
import {v1} from "uuid";
import {createTodolistACType} from "./TodolistReduce";


type SuperType = checkboxInputChangeACType | addTaskACType
    | removeTaskACType | changeTitleInSpanACType | createTodolistACType
export const TasksReducer = (state: TaskKeyType, action: SuperType) => {

    switch (action.type) {
        case 'CHECKBOX-INPUT-CHANGE': {
            return {
                ...state, [action.payload.todoID]:
                    state[action.payload.todoID].map(el => el.id === action.payload.taskId
                        ? {...el, isDone: action.payload.isDone}
                        : el)
            }
        }
        case "ADD-TASK": {
            return {
                ...state, [action.payload.todoID]: [
                    {id: v1(), title: action.payload.newTitle, isDone: false},
                    ...state[action.payload.todoID]]
            }
        }
        case "REMOVE-TASK": {
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].filter(f =>
                    f.id !== action.payload.remoteId)
            }
        }
        case "CHANGE-TITLE-IN-SPAN":{
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el=>
                el.id===action.payload.taskId
                    ? {...el, title:action.payload.newTitle} :el)}
        }
        case "CREATE-TODOLIST":{
            return {...state, [action.payload.newTodolistID]: [
                            {id: v1(), title: "JS", isDone: true},
                            {id: v1(), title: "ReactJS", isDone: false},
                ]}
        }
        default:
            return state
    }
}

type checkboxInputChangeACType = ReturnType<typeof checkboxInputChangeAC>
export const checkboxInputChangeAC = (todoID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHECKBOX-INPUT-CHANGE',
        payload: {todoID, taskId, isDone}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoID, newTitle}
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoID: string, remoteId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoID, remoteId}
    } as const
}

type changeTitleInSpanACType = ReturnType<typeof changeTitleInSpanAC>
export const changeTitleInSpanAC = (todoID: string, taskId: string, newTitle: string) => {
    return {
       type: 'CHANGE-TITLE-IN-SPAN',
       payload:{todoID,taskId,newTitle}
    }as const
}
