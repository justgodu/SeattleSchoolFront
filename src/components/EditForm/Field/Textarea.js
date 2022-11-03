import {useEffect, useState} from "react";


function Textarea(props){

    const [fieldValue, setFieldValue] = useState("");

    useEffect(()=>{

    }, [props.field]);

    const onClickFilledWithButton = (value, index)=>{
        let tempValue = props.value;
        tempValue += ` {${index}} `;
        props.onChange(tempValue, props.field.key);
    }

    const getViewDiv = () =>{
        let tempValue = props.value;
        if(props.field.filled_with){
            let filledWithValues = props.formData[props.field.filled_with];
            if(Array.isArray(filledWithValues)){
                for(const index in filledWithValues){
                    tempValue = tempValue.replaceAll(`{${index}}`, filledWithValues[index]);
                }
            }
        }

        return <div className={'input textarea-view'}>{tempValue}</div>;
    }
    const getFilledWithButtons = ()=>{
        let addButtons = [];
        if(props.field.filled_with){
            let filledWithValues = props.formData[props.field.filled_with];
            if(Array.isArray(filledWithValues)){
                for(const index in filledWithValues){
                    addButtons.push(<button type={"button"} onClick={()=>onClickFilledWithButton(filledWithValues[index], index)}>Add Variable {index}</button>)
                }
            }
        }
        return addButtons;
    }
    return (
        <>
            <h5 className={"label"}>{props.field.label}</h5>
            <div className={"textarea-container"}>


                <textarea className={"textarea input"} onChange={props.onChange} name={props.field?.key} readOnly={props.field.readonly} value={props.value}></textarea>
                {
                    props.field.filled_with && getViewDiv()
                }
            </div>
            {
                getFilledWithButtons()
            }
        </>
    )
}

export default Textarea