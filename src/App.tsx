import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import a from './Components/Styles-modules/styles.module.css'

export type FilteredType='all'| 'active'| 'completed'
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

    const changeFilter = (filteredValue: FilteredType) => {
        setFilter(filteredValue)
    }

    const checkboxInputChange = (taskId:string, isDone:boolean) => {
        setTasks(tasks.map(el=>el.id===taskId ? {...el, isDone} : el))
    }

    const addTask = (newTitle:string) => {
    setTasks([ {id: v1(), title: newTitle, isDone: false}, ...tasks])
    }

    const removeTask = (remoteId:string) => {
    setTasks([...tasks.filter(f=>f.id!==remoteId)])
    }




    return <div className={a.App}>
        <Todolist titleValue={'Hello ToDo'}
                  tasks={filteredTasks}
                  changeFilter={changeFilter}
                  checkboxInputChange={checkboxInputChange}
                  addTask={addTask}
                  removeTask={removeTask}
                  filter={filter}

        />
    </div>

}

export default App;
