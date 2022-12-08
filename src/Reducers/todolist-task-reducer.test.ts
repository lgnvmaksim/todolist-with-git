import {TaskType, TodolistType} from "../App";
import {addTodolistAC, TodolistReducer} from "./TodolistReducer";
import {TasksReducer} from "./TasksReducer";

test('ids should be equals', () => {
    const startTasksState: TaskType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistID)
    expect(idFromTodolists).toBe(action.payload.newTodolistID)
})