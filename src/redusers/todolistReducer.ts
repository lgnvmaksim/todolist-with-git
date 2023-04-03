import {todolistApi, TodolistApiType} from "../api/todolistApi";
import {Dispatch} from "redux";

type actionType = changeFilterACType | removeTodolistACType |
    changeTodolistTileACType | addNewTodolistACType | ReturnType<typeof setTodolistAC>

export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistMainType = TodolistApiType & {
    filter: FilteredType
}


const initialState: TodolistMainType[] = []

export const todolistReducer = (state: TodolistMainType[] = initialState, action: actionType) => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todo.map(el => ({...el, filter: 'all'}))
        }
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoID ? {...el, filter: action.payload.value} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.todoID)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todoID ? {...el, title: action.payload.newTitle} : el)
        }
        case "ADD-NEW-TODOLIST": {
            const newTodolist: TodolistMainType = {...action.payload.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        default:
            return state
    }
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoID: string, value: FilteredType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {todoID, value}
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoID}
    } as const
}

type changeTodolistTileACType = ReturnType<typeof changeTodolistTileAC>
export const changeTodolistTileAC = (todoID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todoID, newTitle}
    } as const
}

export type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (todolist: TodolistMainType) => {
    return {
        type: 'ADD-NEW-TODOLIST',
        payload: {todolist}

    } as const
}

export const setTodolistAC = (todo: TodolistApiType[]) => ({type: 'SET-TODOLIST', todo} as const)

export const getTodoTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodolistState()
        .then((res) => dispatch(setTodolistAC(res.data)))
}

export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodolist(todoId)
        .then(() => dispatch(removeTodolistAC(todoId)))
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodolist(title)
        .then(res => dispatch(addNewTodolistAC(res.data.data.item)))
}

export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTitleTodolist(title, todoId)
        .then(() => dispatch(changeTodolistTileAC(todoId, title)))
}