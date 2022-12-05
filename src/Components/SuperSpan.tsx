import {useState} from "react";
import TextField from '@mui/material/TextField';



type SpanType = {
    title: string
    callback: (newText: string) => void
}

export const SuperSpan = (props: SpanType) => {
    const [text, setText] = useState<string>(props.title)
    const [spanCreator, setSpanCreator] = useState(false)
    return spanCreator

        ? <TextField
            size={'small'}
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

