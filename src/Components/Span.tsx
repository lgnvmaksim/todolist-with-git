import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type spanType = {
    title: string
    callback:(newSpanTitle:string)=>void
}

export const Span = ({title, callback}: spanType) => {
    const [changeSpan, setChangeSpan] = useState(false)
    const [text, setText] = useState(title)
    const onClickHandler = () => {
        setChangeSpan(!changeSpan)
    }
    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        callback(text)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key ==='Enter'){
            onClickHandler()
        }
    }

    return changeSpan
        ? <input
            onBlur={onClickHandler}
            autoFocus
            value={text}
            onKeyDown={onKeyDownHandler}
        onChange={onChangeNewTitleHandler}/>
        : <span onClick={onClickHandler}>{title}</span>
};