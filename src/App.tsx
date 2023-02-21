import React, {useEffect} from 'react';
import './App.css';
import a from './Components/Styles-modules/styles.module.css'
import {addNewTodolistAC, getTodoTC, TodolistMainType,} from "./redusers/todolistReducer";
import {Input} from "./Components/Input";
import {useAppDispatch, useAppSelector} from "./redusers/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export const App = () => {

    useEffect(()=>{
        dispatch(getTodoTC())
    }, [])


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

