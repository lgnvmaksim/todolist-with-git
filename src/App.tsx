import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'



function App() {


    return <div className={a.App}>
        <Todolist titleValue={'Hello ToDo'}/>
    </div>

}


export default App;
