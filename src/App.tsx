import React from 'react';
import './App.css';
import a from './Components/Styles-modules/styles.module.css'
import {addNewTodolistAC, TodolistMainType,} from "./redusers/todolistReducer";
import {Input} from "./Components/Input";
import {useAppDispatch, useAppSelector} from "./redusers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {ItemsType} from "./api/todolistApi";

// export type FilteredType = 'all' | 'active' | 'completed'

// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilteredType
// }

export type TaskType = {
    [key: string]: ItemsType[]
}

// export type TaskKeyType = {
//     id: string
//     title: string
//     isDone: boolean
// }


export const App = () => {
    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolist)
    const dispatch = useAppDispatch()

    const addNewTodolist = (newTitle: string) => {
        const action = addNewTodolistAC(newTitle)
        dispatch(action)
    }

    return <div className={a.App}>
        <Input callback={addNewTodolist}/>
        {todolists.map(el => {
            return (
                <TodolistWithRedux
                    todoID={el.id}
                    key={el.id}
                    filter={el.filter}
                    title={el.title}
                />
            )
        })}


    </div>

}

