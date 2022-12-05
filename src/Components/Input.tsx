import {ChangeEvent, KeyboardEvent, useState} from "react";
import a from "./Styles-modules/styles.module.css";
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';


type InputType = {
    callback: (newText: string) => void
}

export const Input = (props: InputType) => {
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string | null>(null)


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTaskButtonHandler()
        }
    }

    const onClickAddTaskButtonHandler = () => {
        if (text.trim() !== '') {
            props.callback(text.trim())
            setText('')
        } else {
            setError(' ')
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            size={'small'}
            value={text}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               className={error ? a.error : undefined}
        label={'add new text...'}
        helperText={error && 'Mistake'}/>


        <IconButton onClick={onClickAddTaskButtonHandler}
                    >
            <AddBoxTwoToneIcon />
        </IconButton>
        {error && <div className={a.errorMessage}>{error}</div>}
    </div>

}