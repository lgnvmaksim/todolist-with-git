import React, {ChangeEvent, useState} from 'react';

type SpanPropsType = {
    title: string
    callback: (text: string) => void
}

export const SuperSpan = (props: SpanPropsType) => {
    const [text, setText] = useState(props.title)
    const [edit, setEdit] = useState<boolean>(true)
    const onClickHandler = () => {
        setEdit(!edit)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        props.callback(text)

    }

    return edit
        ? <span onClick={onClickHandler}>{props.title}</span>
        : <input value={text}
                 onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                         onClickHandler()
                     }
                 }
                 }
                 onChange={onChangeHandler}
                 onBlur={onClickHandler} autoFocus/>
};
