import {useEffect, useState} from "react";
import Textarea from "./Field/Textarea";
import ArrayInput from "./Field/ArrayInput";
import "./EditForm.css";
import ButtonArray from "./Field/ButtonArray";

function EditForm(props){

    const [formData, setFormData] = useState({});


    const onChangeField = (e, key="")=>{
        console.log(formData, "before update")
        let tempData = Object.assign({}, formData);

        if(key.length){
            tempData[key] = e;
        } else{
            tempData[e.target.name] = e.target.value;
        }

        console.log(tempData, 'updated Data');
        setFormData(tempData);
    }

    useEffect(()=>{
        let tempFormData = {};
        for(const field of props.formData){
            if(field.type === "array"){
                tempFormData[field.key] = []
                for(let i = 0; i < field.array_length; i++){

                    tempFormData[field.key][i] = field.value[i] || ''

                }
            }else{
                tempFormData[field.key] = field.value || '';
            }
        }

        setFormData(tempFormData);
    },[props.formData])

    return (
        <form onSubmit={(e)=>{e.preventDefault(); props.onSubmit(formData)}}>
            {
                props.formData && props.formData.length && props.formData.map((field, index)=>{
                    let fieldElement;
                    switch (field.type){
                        case "textarea": fieldElement = <div className={"input-container"} key={index}><Textarea field={field} value={formData[field.key]} formData={formData} onChange={onChangeField} updateForm={setFormData}/></div>
                            break;
                        case "array": fieldElement = <div className={"input-container"} key={index}><ArrayInput field={field} onChange={onChangeField}/></div>
                            break;
                        case "radio_buttons": fieldElement = <div className={"input-container"} key={index}><ButtonArray field={field} onChange={onChangeField}/></div>
                            break;
                    }
                    return fieldElement;
                })
            }

            <div className={"input-container"}>
                <button type={"submit"} name={"form-submit"}>Save</button>
            </div>
        </form>
    )
}

export default EditForm;