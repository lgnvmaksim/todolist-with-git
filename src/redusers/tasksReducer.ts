import {addNewTodolistACType, removeTodolistACType, setTodolistAC} from "./todolistReducer";
import {ItemsType, ModelType, taskApi, TaskStatuses} from "../api/todolistApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type TaskType = {
    [key: string]: ItemsType[]
}

type actionType = removeTaskACType | addTaskACType | changeCheckedACType |
    removeTodolistACType | changeTaskTitleACType | addNewTodolistACType | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof downloadingTaskAC>

const initialState: TaskType = {}

export const tasksReducer = (state: TaskType = initialState, action: actionType) => {
    switch (action.type) {
        case "DOWNLOADING-TASK": {
            return {
                ...state, [action.todoId]: action.tasks
            }
        }
        case "SET-TODOLIST": {
            let copyState = {
                ...state
            }
            action.todo.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            return {
                ...state, [action.payload.todoID]:
                    state[action.payload.todoID].filter(f => f.id !== action.payload.taskID)
            }
        }
        case "ADD-TASKS": {
            return {
                ...state, [action.payload.todoID]: [action.payload.tasks, ...state[action.payload.todoID]]
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
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.payload.todoID]:
                    state[action.payload.todoID].map(el =>
                        el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case "ADD-NEW-TODOLIST": {
            return {
                ...state, [action.payload.todolist.id]: []
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
export const addTaskAC = (todoID: string, tasks: ItemsType) => {
    return {
        type: 'ADD-TASKS',
        payload: {todoID, tasks}
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

const downloadingTaskAC = (todoId: string, tasks: ItemsType[]) => ({
    type: 'DOWNLOADING-TASK',
    todoId,
    tasks
} as const)

export const downloadingTaskTC = (todoId: string) => (dispatch: Dispatch) => {
    taskApi.getTask(todoId)
        .then(res => dispatch(downloadingTaskAC(todoId, res.data.items)))
}

export const deleteTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    taskApi.deleteTasks(todoID, taskID)
        .then(res => dispatch(removeTaskAC(todoID, taskID)))
}

export const addTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    taskApi.createTasks(todoID, title)
        .then(res => dispatch(addTaskAC(todoID, res.data.data.item)))
}

export const changeTaskStatusTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task =  getState().tasks[todoId].find((f) => f.id===taskId)
        if (task){
            let model: ModelType ={
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status
            }
            taskApi.updateTask(todoId, taskId, model)
                .then(()=>dispatch(changeCheckedAC(todoId, taskId, status)))
        }
}

export const changeTaskTitleTC = (todoId: string, taskId: string, newTitle: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task =  getState().tasks[todoId].find((f) => f.id===taskId)
        if (task){
            let model: ModelType ={
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status
            }
            taskApi.updateTask(todoId, taskId, model)
                .then(()=>dispatch(changeTaskTitleAC(todoId, taskId, newTitle)))
        }
    }
