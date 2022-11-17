import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './Components/Styles-modules/styles.module.css'


function App() {


    return <div className={s.App}>
        <Todolist titleValue={'Hello ToDo'}/>
    </div>


}

export default App;
