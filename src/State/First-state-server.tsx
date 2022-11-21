import React from 'react';
import {v1} from "uuid";


export type TaskType ={
    id:string,
    title:string,
    isDone:boolean

}
export const tasks: TaskType[] =[
    {id: v1(), title: "HTML&CSS", isDone: true, },
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false, },
    {id: v1(), title: "Rest API", isDone: false,},
    {id: v1(), title: "GraphQL", isDone: false, },
];