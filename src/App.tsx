import React from 'react';

import a from './Components/Styles-modules/styles.module.css'

import SuperInput from "./Components/SuperInput";
import {
    addTodolistAC,

} from "./Reducers/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilteredType
}

export type TaskType = {
    [key: string]: TasksListType[]
}

export type TasksListType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    return <div className={a.App}>
        <SuperInput callback={addTodolist}/>
        {todolists.map(el => {
            return (
                <TodolistWithRedux
                    key={el.id}
                    titleValue={el.title}
                    todoID={el.id}
                    filter={el.filter}
                />
            )
        })}


    </div>

}


export default App;
