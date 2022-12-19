import React from 'react';
import {FilteredType, TodolistType} from "../App";
import {v1} from "uuid";

type SuperActionType = changeFilterACType | removeTodolistACType | changeTodolistTitleACType
| addTodolistACType

const initialState: TodolistType[]= []

export const TodolistReducer = (state: TodolistType[] = initialState, action: SuperActionType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el => el.id === action.payload.todoID
                ? {...el, filter: action.payload.value} : el)
        }
        case "REMOVE-TODOLIST":{
            return state.filter(f=>f.id!==action.payload.todoID)

        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(el=>el.id===action.payload.todoID
            ? {...el, title: action.payload.newTitle} : el)
        }
        case "ADD-TODOLIST":{
            const newTodo: TodolistType = {id: action.payload.newTodolistID, title: action.payload.newTitle, filter: 'all'}
            return [newTodo, ...state]
        }
        default:
            return state
    }
};

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

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoID:string, newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todoID, newTitle}
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    const newTodolistID = v1()
    return {
        type: 'ADD-TODOLIST',
        payload: {newTitle, newTodolistID}
    } as const
}