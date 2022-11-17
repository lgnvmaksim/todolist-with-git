import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'

type FilteredType='all'| 'active'| 'completed'
export type TaskType={
    id:string
    title:string
    isDone:boolean
}

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] =useState<FilteredType>('all')

    let filteredTasks = tasks
    if (filter ==='active') {
        filteredTasks=tasks.filter(f=>!f.isDone)
    }
    if (filter ==='completed') {
        filteredTasks=tasks.filter(f=>f.isDone)
    }


    return <div className={a.App}>
        <Todolist titleValue={'Hello ToDo'}
                  tasks={filteredTasks}
        />
    </div>

}

export default App;
