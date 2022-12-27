import {FilteredType, TodolistType} from "../App";
import {v1} from "uuid";

type actionType = changeFilterACType | removeTodolistACType |
    changeTodolistTileACType | addNewTodolistACType

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistType[]=initialState, action: actionType) => {
    switch (action.type) {
        case 'CHANGE-FILTER':{
            return state.map(el=>el.id===action.payload.todoID ? {...el, filter: action.payload.value} : el)
        }
        case "REMOVE-TODOLIST":{
            return state.filter(f=>f.id!==action.payload.todoID)
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(el=>el.id===action.payload.todoID ? {...el, title: action.payload.newTitle} : el)
        }
        case "ADD-NEW-TODOLIST":{
            let newTodo:TodolistType = {id: action.payload.todoID, title: action.payload.newTitle, filter: 'all'}
            return [newTodo, ...state]
        }
        default: return state
    }
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoID:string, value: FilteredType)=>{
    return {
        type: 'CHANGE-FILTER',
        payload: {todoID, value}
    }as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoID:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoID}
    } as const
}

type changeTodolistTileACType = ReturnType<typeof changeTodolistTileAC>
export const changeTodolistTileAC = (todoID:string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todoID, newTitle}
    } as const
}

export type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (newTitle:string) => {
    let todoID = v1();
    return {
        type:'ADD-NEW-TODOLIST',
        payload: {todoID, newTitle}

    }as const
}