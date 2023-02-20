import {TaskType} from "../App";
import {v1} from "uuid";
import {addNewTodolistACType, removeTodolistACType} from "./todolistReducer";
import {TaskStatuses} from "../api/todolistApi";


type actionType = removeTaskACType | addTaskACType | changeCheckedACType |
    removeTodolistACType | changeTaskTitleACType | addNewTodolistACType

const initialState: TaskType = {}

export const tasksReducer = (state: TaskType= initialState, action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.payload.todoID]:
                    state[action.payload.todoID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case "ADD-TASKS": {
            const newTask = {id: v1(), title: action.payload.newTaskTitle, status: TaskStatuses.New}
            return {
                ...state, [action.payload.todoID]:
                    [newTask, ...state[action.payload.todoID]]
            }
        }
        case "CHANGE-CHECKED": {
            return {
                ...state, [action.payload.todoID]:
                    state[action.payload.todoID].map(el =>
                        el.id === action.payload.taskID ? {...el, status: action.payload.isDoneValue} : el)
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.todoID]
            return copyState
        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state, [action.payload.todoID]:
                state[action.payload.todoID].map(el=>
                el.id===action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "ADD-NEW-TODOLIST":{
          return {
              ...state, [action.payload.todoID]: [
                  {id: v1(), title: "ReactJS", isDone: false},
                  {id: v1(), title: "Rest API", isDone: false},
              ]
            }
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoID, taskID}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoID: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASKS',
        payload: {todoID, newTaskTitle}
    } as const
}

type changeCheckedACType = ReturnType<typeof changeCheckedAC>
export const changeCheckedAC = (todoID: string, taskID: string, isDoneValue: TaskStatuses) => {
    return {
        type: 'CHANGE-CHECKED',
        payload: {todoID, taskID, isDoneValue}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todoID, taskID, newTitle}
    } as const
}