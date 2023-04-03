import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import a from "./Styles-modules/styles.module.css";

type InputType = {
    callback: (newText:string)=>void
}

export const Input = memo(({callback}: InputType) => {
    const [text, setText] = useState('')
    const [error, setError] = useState<null | string>(null)


    const onChangeNewTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        if (error !==null) {setError(null)}

    }
    const onClickAddTaskHandler = () => {
        if (text.trim() !== '') {
            callback(text.trim())
        } else {
            setError('Лосони тунца!')
        }
        setText('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    return (
        <div>
            <input
                className={error ? a.error : undefined}
                value={text}
                onChange={onChangeNewTaskHandler}
                onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={a.errorMessage}>{error}</div>}
        </div>
    );
})
