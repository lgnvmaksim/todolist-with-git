import React, {ChangeEvent, useState} from 'react';


type SpanPropsType = {
    spanTitle: string
    changeTitleInSpan:(newTitle:string)=>void
}

export const SuperSpan = (props: SpanPropsType) => {
    const [text, setText] = useState(props.spanTitle)
    const [edit, setEdit] = useState(false)
    const onClickSpanHandler = () => {
        setEdit(!edit)
        props.changeTitleInSpan(text)
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)

    }

    return edit
        ? <input onBlur={onClickSpanHandler} onChange={onChangeTextHandler} value={text} autoFocus/>
        : <span onClick={onClickSpanHandler}>{props.spanTitle}</span>
}