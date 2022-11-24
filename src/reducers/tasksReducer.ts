import {TaskType} from "../App";
import {v1} from "uuid";


type superType = removeTaskACType | addTaskACType | checkboxInputChangeACType
export const tasksReducer = (state: TaskType[], action: superType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.id, isDone: false}
            return [newTask, ...state]
        }
        case 'CHANGE-CHECKBOX': {
            return state.map(el => el.id === action.payload.taskId
                ? {...el, isDone: action.payload.isDone}
                : el)
        }
        default:
            return state
    }
}


type removeTaskACType = ReturnType<typeof removeTackAC>
export const removeTackAC = (remoteId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: remoteId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            id: newTitle
        }
    } as const
}

type checkboxInputChangeACType = ReturnType<typeof checkboxInputChangeAC>
export const checkboxInputChangeAC = (taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-CHECKBOX',
        payload: {
            taskId,
            isDone
        }
    } as const
}