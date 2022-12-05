import a from './Components/Styles-modules/styles.module.css'
import {FilteredType, TaskKeyType} from "./App";
import {Input} from "./Components/Input";
import {SuperSpan} from "./Components/SuperSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from "@mui/material/ListItem";



type TodolistPropsType = {
    titleValue: string
    tasks: TaskKeyType[]
    todoID: string
    changeFilter: (todoID: string, filterValue: FilteredType) => void
    removeTasks: (todoID: string, taskID: string) => void
    addTask: (todoID: string, newTitle: string) => void
    changeCheckBox: (todoID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todoID: string) => void
    changeTasks: (todoID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoID: string, newTitle: string) => void
    filter:FilteredType
}

export const Todolist = (props: TodolistPropsType) => {

    const {todoID, changeFilter} = props
    const superSpanHandler = (taskID: string, newTitle: string) => {
        props.changeTasks(todoID, taskID, newTitle)
    }
    const mappingTasks = props.tasks.map(el => {
        return <ListItem
                style={{padding: '0px'}}
                key={el.id}
                className={el.isDone ? a.isDone : ''}>
                <Checkbox
                    checked={el.isDone}
                    size={'small'}
                    onChange={(e) => {
                        props.changeCheckBox(todoID, el.id, e.currentTarget.checked)
                    }}
                />
                <SuperSpan title={el.title} callback={(newText) => {
                    superSpanHandler(el.id, newText)
                }}/>

                <IconButton aria-label="delete" color="primary" style={{color: '#ad3214'}}>
                    <DeleteIcon onClick={() => {
                        props.removeTasks(todoID, el.id)
                    }}/>
                </IconButton>
            </ListItem>
    })

    return <div className={a.todolist}>

        <h3>
            <SuperSpan title={props.titleValue} callback={(newText) => {
                props.changeTodolistTitle(todoID, newText)
            }}/>

            <IconButton aria-label="delete">
                <DeleteIcon
                    style={{color: "#E0B187"}}
                    onClick={() => {
                        props.removeTodolist(todoID)
                    }}/>
            </IconButton>
        </h3>
        <Input callback={(newText: string) => {
            props.addTask(todoID, newText)
        }}/>

        {mappingTasks}

        <Button
            variant={'contained'}
            color = {props.filter ==='all' ? "secondary" :'primary'}
            onClick={() => {
            changeFilter(todoID, 'all')
        }}>All
        </Button>
        <Button
            color = {props.filter ==='active' ? "secondary" :'primary'}
            variant={'contained'}
            onClick={() => {
            changeFilter(todoID, 'active')
        }}>Active
        </Button>
        <Button
            color = {props.filter ==='completed' ? "secondary" :'primary'}
            variant={'contained'}
            onClick={() => {
            changeFilter(todoID, 'completed')
        }}>Completed
        </Button>
    </div>
}