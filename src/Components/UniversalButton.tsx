type ButtonType = {
    callback: () => void
    styles?: string
    name:string
}


export const UniversalButton = (props: ButtonType) => {
    return <button className={props.styles}
                   onClick={props.callback}>{props.name}</button>
}