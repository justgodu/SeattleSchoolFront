import {useEffect, useState} from "react";

function ButtonArray(props){

    const [selectedButton, setSelectedButton] = useState();

    const onClickButton = (key)=>{
        setSelectedButton(key);
        props.onChange(key, props.field.key);
    }

    useEffect(()=>{
        setSelectedButton(props.field.value);
    }, [props.field])

    const getButtonClass = (key)=>{
        let buttonClass = "radio-button-container ";
        if(key === selectedButton){
            buttonClass += "selected ";
        }

        return buttonClass;
    }
    return(
        <div className={"buttons-container"}>
            {
                props.field.buttons.map((button)=>(
                    <div className={getButtonClass(button.key)}>
                        <div className={"radio-button"} style={{backgroundColor: button.bgcolor}} onClick={()=>{onClickButton(button.key)}}>
                            { button.title }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default ButtonArray;