import {ChangeEvent, KeyboardEvent, useState} from "react";
import a from "./Styles-modules/styles.module.css";


type InputType={
    callback:(newText:string)=>void
}

export const Input = (props:InputType) => {
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key==="Enter") {
            onClickAddTaskButtonHandler()
        }
    }

    const onClickAddTaskButtonHandler = () => {
        if (text.trim()!=='') {
            props.callback(text.trim())
            setText('')
        } else { setError('Mistake')}}

    return <div>
        <input value={text}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               className={error ? a.error : undefined}/>
        <button onClick={onClickAddTaskButtonHandler}>+</button>
        {error && <div className={a.errorMessage}>{error}</div> }
    </div>

}