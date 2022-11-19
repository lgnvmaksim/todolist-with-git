import React from 'react';
import {v1} from "uuid";

export type FilteredType = 'all' | 'active' | 'completed'

export type TaskType ={
    id:string,
    title:string,
    isDone:boolean
    activity:FilteredType
}
export const tasks: TaskType[] =[
    {id: v1(), title: "HTML&CSS", isDone: true, activity:'all'},
    {id: v1(), title: "JS", isDone: true, activity:'all'},
    {id: v1(), title: "ReactJS", isDone: false, activity:'all'},
    {id: v1(), title: "Rest API", isDone: false, activity:'all'},
    {id: v1(), title: "GraphQL", isDone: false, activity:'all'},
];