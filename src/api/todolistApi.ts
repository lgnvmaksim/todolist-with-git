import axios, {AxiosResponse} from "axios";
import {TodolistMainType} from "../redusers/todolistReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b4d8e782-12a1-4cd0-86dd-a8ec637b9008'
    }
})

export type TodolistApiType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D= {}> = {
    resultCode: number
    messages: string[],
    fieldsError: string[]
    data: D
}

export type TaskType={
    totalCount: number,
    error: string | null,
    items: ItemsType[]
}

export type ItemsType= ModelType & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ModelType ={
    description: string
    title: string
    completed?: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export const todolistApi = {
    getTodolistState() {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistMainType }>>>('todo-lists', {title})
    },
    deleteTodolist(todoId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTitleTodolist(title:string, todoId:string){
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${todoId}`, {title})
    }
}

export const taskApi={
    getTask(todoId:string){
        return instance.get<TaskType>(`todo-lists/${todoId}/tasks`)
    },
    createTasks(todoId:string, title: string){
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: ItemsType }>>>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTasks(todoId:string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId:string, taskId: string, model:ModelType){
        return instance.put<ModelType, AxiosResponse<ResponseType<{item: ItemsType}>>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}