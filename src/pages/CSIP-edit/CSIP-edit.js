import Header from "../../components/Header/Header";
import EditForm from "../../components/EditForm/EditForm";
import {useEffect, useState} from "react";
import {
    getCSIPEditFields,
    getGoal,
    getSchool,
    getSchoolParam,
    updateCSIP,
    updateSchoolParam
} from "../../utils/functions";

function CSIPEdit(props){

    const [formData, setFormData] = useState([]);

    const [school, setSchool] = useState();

    const [goal, setGoal] = useState();

    const [updateStatus, setUpdateStatus] = useState();

    useEffect(()=>{
        const getAndSetSchool = async () => {
            let response = await getSchool(props.match.params.schoolId);
            console.log(response, "getAndSetSchool")
            setSchool(response);
        }

        const getAndSetFormData = async () =>{
            let response = await getSchoolParam(props.match.params.schoolId, props.match.params.goalId, '', '');

            console.log(response, "getAndSetFormData")
            if(Array.isArray(response)){
                setFormData(response);
            }
        }

        const getAndSetGoal = async () =>{
            let response = await getGoal(props.match.params.goalId);

            console.log(response, "getAndSetGoal")
            setGoal(response);
        }

        Promise.all([
            getAndSetSchool(),
            getAndSetFormData(),
            getAndSetGoal()
        ])

    },[]);


    const onFormSubmit = async (formData)=>{
        let response = await updateSchoolParam(props.match.params.schoolId, props.match.params.goalId, formData);

        if(response.status){
            setUpdateStatus({
                class: 'alert error',
                text: "Error occurred while updating School Goal"
            })
        }else{
            if(response.modifiedCount){
                setUpdateStatus({
                    class: 'alert success',
                    text: "Successfully updated"
                })
            }
        }

        setTimeout(()=>{
            setUpdateStatus()
        }, 4000)
    }

    return (

        <>
            <Header title={"Goals - " + school?.name}/>
            <main className={"edit-container container"}>
                <div className={"input-container"}>
                    <h2 className={"label"}>Goal</h2>
                    <h3 className={"input"}>{goal?.name}</h3>
                </div>

                <EditForm formData={formData} onSubmit={onFormSubmit}/>
                {updateStatus && (<h4 className={updateStatus.class}>{updateStatus.text}</h4>)}
            </main>
        </>

    )
}

CSIPEdit.prototype = {
    schoolName: String.prototype
}

export default CSIPEdit;