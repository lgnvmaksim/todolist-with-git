import React, {ChangeEvent, useState} from 'react';
import a from "./Styles-modules/styles.module.css";

type InputPropsType={
    callback:(newText:string)=>void
}

export const SuperInput = (props:InputPropsType) => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskButtonHandler = () => {
        if (text.trim() !== '') {
            props.callback(text.trim())
            setText('')
        } else {
            setError('Чё-т пошло не так, бро...')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError('')
    }

    return (
        <div>
            <input
                onChange={onChangeInputHandler}
                value={text}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTaskButtonHandler()
                    }
                }}/>
            <button onClick={addTaskButtonHandler}>+</button>
            {error && <div className={a.errorMessage}>{error}</div>}
        </div>
    );
};

export default SuperInput;