type ButtonType = {
    callback: () => void
    styles?: string
    name:string
}


export const UniversalButton = (props: ButtonType) => {
    const onClickHandler = () => props.callback()
    const stylesButton = props.styles
    return <button className={stylesButton}
                   onClick={onClickHandler}>{props.name}</button>
}