import TextInput from "./TextInput";
import {useEffect, useState} from "react";

function ArrayInput(props){

    const [arrayFormData, setArrayFormData] = useState([]);

    const onChangeArrayItem = (e)=>{
        let index = e.target.name.split(props.field.key + "_")[1];

        let tempArrayFormData = Object.assign([], arrayFormData);
        tempArrayFormData[index] = e.target.value;


        setArrayFormData(tempArrayFormData);


        props.onChange(tempArrayFormData, props.field.key);
    }

    const getInput = (type, key, value, index,label)=>{

        const field = {
            type,
            key,
            value,
            label
        };

        let input;
        switch (type){
            case "text": input = <TextInput field={field} value={arrayFormData[index]} onChange={onChangeArrayItem}/>
                break;
        }

        return input;
    }

    useEffect(()=>{


        let tempArrayFormData = [];

        for(let i = 0; i < props.field.array_length; i++){
            tempArrayFormData[i] = props.field.value[i] || '';
        }

        setArrayFormData(tempArrayFormData);


    },[props.field])


    const getFields = ()=>{
        let tempFields = []

        for(let i = 0; i < props.field.array_length; i++){
            tempFields.push(
                getInput(
                    props.field.array_type,
                    props.field.key + "_" + i,
                    props.field.value[i] || '',
                    i,
                    "Variable " + i
                )
            )

        }

        return tempFields;
    }




    return (
        <>
            <h5 className={"label"}>{props.field.label}</h5>
            <div className={"input-container"}>
            {
                getFields()
            }
            </div>
        </>
    )
}

export default ArrayInput