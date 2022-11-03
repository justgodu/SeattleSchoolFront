function TextInput(props){

    return (
        <div>
            <h5 className={"label"}>{props.field.label}</h5>
            <input className={"input"} name={props.field.key} value={props.value} onChange={props.onChange} readOnly={props.field.readonly}/>
        </div>
    )
}

export default TextInput;