import {useState} from "react";

type SpanType = {
    title: string
    callback: (newText: string) => void
}

export const SuperSpan = (props: SpanType) => {
    const [text, setText] = useState<string>(props.title)
    const [spanCreator, setSpanCreator] = useState(false)
    return spanCreator
        ? <input
            onBlur={() => {
                setSpanCreator(!spanCreator)
            }}
            value={text}
            onChange={(e) => {
                setText(e.currentTarget.value)
                props.callback(text)
            }}/>
        : <span onClick={() => {
            setSpanCreator(!spanCreator)
        }}
        >{props.title}</span>

}

