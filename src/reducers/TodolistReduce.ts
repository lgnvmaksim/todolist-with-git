import {FilteredType, TodolistType} from "../App";
import {v1} from "uuid";

type SuperActionType = changeTodolistTitleACType | removeTodolistACType | changeFilterACType
| createTodolistACType

export const TodolistReduce = (state: TodolistType[], action: SuperActionType) => {
    switch (action.type) {
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el=>el.id===action.payload.todoID
                ? {...el, title:action.payload.newTitle}
                :el)
        }
        case 'REMOVE-TODOLIST':{
            return state.filter(f=>f.id!==action.payload.todoID)
        }
        case "CHANGE-FILTER":{
            return state.map(el=>el.id ===action.payload.todoID
                ? {...el, filter:action.payload.filteredValue}
                :el)
        }
        case "CREATE-TODOLIST":{
            const newTodolist: TodolistType = {id: action.payload.newTodolistID, title: action.payload.newTitleTodo, filter: 'all'}
            return [...state, newTodolist]
        }
        default:
            return state
    }
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            todoID,
            newTitle
        }
    }as const
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            todoID
        }
    }as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todoID: string, filteredValue: FilteredType) => {
    return {
        type:'CHANGE-FILTER',
        payload:{todoID, filteredValue}
    }as const
}

export type createTodolistACType=ReturnType<typeof createTodolistAC>
export const createTodolistAC = (newTitleTodo: string) => {
    const newTodolistID = v1()

    return {
        type: 'CREATE-TODOLIST',
        payload:{newTitleTodo, newTodolistID}
    }as const
}

