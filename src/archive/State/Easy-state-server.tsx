import React from 'react'
import {v1} from "uuid";

// export type FilteredType = 'all' | 'active' | 'completed'
//
//
// export type TodolistType={
//     id:string
//     title:string
//     filter:FilteredType
// }
//
// export type TaskType ={
//     [key:string]:TaskKeyType[]
// }
//
// type TaskKeyType={
//     id:string
//     title:string
//     isDone:boolean
// }
//
// let todolistID1 = v1();
// let todolistID2 = v1();
//
// export const todolists: TodolistType[] = [
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ]
//
// export const tasks: TaskType = {
//     [todolistID1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: "HTML&CSS2", isDone: true},
//         {id: v1(), title: "JS2", isDone: true},
//         {id: v1(), title: "ReactJS2", isDone: false},
//         {id: v1(), title: "Rest API2", isDone: false},
//         {id: v1(), title: "GraphQL2", isDone: false},
//     ]
// };