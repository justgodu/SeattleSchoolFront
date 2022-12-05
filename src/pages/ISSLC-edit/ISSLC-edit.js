import {useEffect, useState} from "react";

import {getSchool, getSchoolParam, getFormType, updateSchoolParam} from "../../utils/functions";
import Header from "../../components/Header/Header";
import {useHistory, Link} from "react-router-dom";
import "./ISSLC-edit.css"

function ISSLCEdit(props) {

    const history = useHistory();

    const [school, setSchool] = useState();
    const [schoolCell, setSchoolCell] = useState()
    const [formParams, setFormParams] = useState({});
    const [formType, setFormType] = useState({});
    const [updateStatus, setUpdateStatus] = useState();

    const somethingOptions = [
        "S", "P", "T", "PA", "D", "PAR", "B", "C", "SB", "CuSUP", "SUP"  
    ];

    const legendObject = {
        title: "Matrix Key",
        P: "Principal",
        T: "Teachers",
        PA: "Para Educators",
        D: "Distinct Employees",
        PAR: "Parents",
        SUP: "Supervision",
        CuSUP: "Program Supervision",
        SB: "School Board",
        S: "Superintendent",
        C: "Coaches"
    }

    const displayLegend = (legendObject) => {

        let elementsToReturn = [];

        for (let item in legendObject) {

            if (item === "title") {
                continue;
            }
            
            let element = 
                <span className={"legend-item-wrapper"}>
                    <span className={"legend-item-label"}>{`${item} = `}</span>
                    <span className={"legend-item-description"}>{`${legendObject[item]}`}</span>
                </span>
            
            elementsToReturn.push(element);
        }

        return elementsToReturn;
    }

    const statusButtons = [
        {
            "title": "Exceed",
            "bgcolor": "#00B0F0",
            "txtcolor": "#000000",
            "key": "exceed"
        },
        {
            "title": "Meet",
            "bgcolor": "#00B050",
            "txtcolor": "#000000",
            "key": "meet"
        },
        {
            "title": "Partially Meet",
            "bgcolor": "#FFFF00",
            "txtcolor": "#44546A",
            "key": "partially_meet"
        },
        {
            "title": "Underperform",
            "bgcolor": "#FF0000",
            "txtcolor": "#ffffff",
            "key": "underperform"
        },
    ];

    useEffect(() => {
        const getAndSetSchool = async () => {
            let response = await getSchool(props.match.params.schoolId);
            setSchool(response);
        }

        const getAndSetParameters = async () => {
            let response = await getSchoolParam(props.match.params.schoolId, "ISSLC", props.match.params.columnId, props.match.params.rowId);

            if (response) {
                setSchoolCell(response);
                if (response.data) {
                    setFormParams(response?.data);
                }
            }

        }

        const getAndSetFormType = async () => {
            let response = await getFormType("ISSLC");

            if (response.data) {
                console.log(response.data);
                setFormType(response?.data);
            }

        }

        Promise.all([
            getAndSetSchool(),
            getAndSetParameters(),
            getAndSetFormType()
        ])

    }, []);

    const onClickAddActionPlan = () => {
        if (formParams.action_plan && formParams.action_plan.length) {
            formParams.action_plan.push("")
        } else {
            formParams.action_plan = [""];
        }

        setFormParams(Object.assign({}, formParams));
    }

    const onClickAddActionResponse = () => {
        if (formParams.action_response && formParams.action_response.length) {
            formParams.action_response.push("")
        } else {
            formParams.action_response = [];
        }

        setFormParams(Object.assign({}, formParams));
    }

    const onChangeValue = (value, key, index = null) => {
        let tempFormParams = Object.assign({}, formParams);
        if (index !== null) {
            if (!tempFormParams[key]) {
                tempFormParams[key] = [];
            }
            tempFormParams[key][index] = value;
        } else {
            tempFormParams[key] = value;
        }

        setFormParams(tempFormParams);
    }

    const onClickSomething = (event, value) => {


        console.log(formParams.something)
        if (formType.something.readonly) {
            event.preventDefault()
            return false;
        }
        let checked = event.target.checked;

        let tempFormParams = Object.assign({}, formParams);


        if (!formParams["something"]) {
            tempFormParams.something = [];
        }

        if (!checked) {
            let newSomething = [];
            for (let element of tempFormParams.something) {
                if (element !== value) {
                    newSomething.push(element);
                }
            }
            tempFormParams.something = newSomething;
        } else {
            if (-1 === tempFormParams.something.indexOf(value)) {
                tempFormParams.something.push(value);
            }

        }


        console.log(tempFormParams.something)
        setFormParams(tempFormParams);
    }

    const onClickRemoveAction = (index) => {
        let newActions = [];

        let tempFormParams = Object.assign({}, formParams)
        console.log(index)
        for (let i in tempFormParams.action_plan) {
            console.log(i)
            if (index != i) {
                newActions.push(tempFormParams.action_plan[i]);
            }
        }

        tempFormParams.action_plan = newActions

        console.log(formParams.action_plan)
        setFormParams(tempFormParams)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let response = await updateSchoolParam(props.match.params.schoolId,
            formParams, "ISSLC",
            props.match.params.columnId, props.match.params.rowId);

        if (response.status) {
            setUpdateStatus({
                class: 'alert error',
                text: "Error occurred while updating School Goal"
            })
        } else {
            if (response._id) {
                // setUpdateStatus({
                //     class: 'alert success',
                //     text: "Successfully updated"
                // })
                history.push(`/isslc/${props.match.params.schoolId}`);
            }
        }

        setTimeout(() => {
            setUpdateStatus()
        }, 4000)
    }
        return (
        <>
            <Header title={"ISSLC - " + school?.name}/>

            <main className={"edit-container container"}>
                <div className={"edit-form-info"}>
                    <h3><Link to={"/"}>Dashboard</Link></h3>
                    <h3><Link to={"/ISSLC"}>ISSLC</Link></h3>
                    <h3><Link to={"/ISSLC/" + props.match.params.schoolId}> {school?.name} </Link></h3>
                    <h3 className={""}>{schoolCell ?
                        schoolCell?.column_id?.name
                        + " - "
                        + schoolCell.row_id?.name : ""
                    }</h3>

                    {updateStatus?.class && (<h4 className={updateStatus.class}>{updateStatus.text}</h4>)}
                </div>
                <form className={"edit-form"} onSubmit={(e) => {
                    onSubmit(e)
                }}>

                    <div className={"form-section"}>
                        <div className={"flex-2"}>
                            <div className={"flex-column" + (formType?.matrix_description?.readonly ? ' readonly' : '')}>
                                <h4 className={"label"}>{formType?.matrix_description?.fieldIndex} Matrix Description:</h4>
                                <textarea placeholder={"Matrix Description"} value={formParams.matrix_description || ""}
                                          readOnly={formType?.matrix_description?.readonly}
                                          onChange={(e) => onChangeValue(e.target.value, "matrix_description")}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className={"flex-2 form-section"}>
                        <div className={"flex-column " + (formType?.action_plan?.readonly ? 'readonly' : '')}>
                            <h4 className={"label"}>{formType?.action_plan?.fieldIndex} Action plan:</h4>
                            {
                                formParams &&
                                formParams.action_plan && formParams.action_plan
                                && formParams.action_plan.map((plan, index) => (
                                    <div className={"array-container"} key={index}>
                                        {
                                            !formType?.action_plan?.readonly && <span className={"close-button"}
                                                                                      onClick={() => onClickRemoveAction(index)}></span>
                                        }
                                        <textarea readOnly={formType?.action_plan?.readonly} value={plan}
                                                  placeholder={"Action " + (index + 1)}
                                                  onChange={(e) => onChangeValue(e.target.value, 'action_plan', index)}></textarea>
                                    </div>
                                ))
                            }
                            {
                                !formType?.action_plan?.readonly &&
                                <button type={"button"} onClick={onClickAddActionPlan}>Add Action Plan</button>
                            }
                        </div>
                        <div className={"flex-column " + (formType?.action_response?.readonly ? 'readonly' : '')}>
                            <h4 className={"label"}>{formType?.action_response?.fieldIndex} Action response:</h4>
                            {
                                formParams
                                && formParams.action_plan
                                && formParams.action_plan
                                && formParams.action_plan.map((plan, index) => (
                                    formParams.action_response && formParams.action_response[index] ? (
                                        <div className={"array-container"} key={index}>
                                            {
                                                !formType?.action_response?.readonly && <span className={"close-button"}
                                                                                              onClick={() => onClickRemoveAction(index)}></span>
                                            }
                                            <textarea readOnly={formType?.action_response?.readonly}
                                                      value={formParams.action_response[index]}
                                                      onChange={(e) => onChangeValue(e.target.value, 'action_response', index)}
                                                      placeholder={"Response " + (index + 1)}></textarea>
                                        </div>
                                    ) : (
                                        <div className={"array-container"} key={index}>
                                            {
                                                !formType?.action_response?.readonly && <span className={"close-button"}
                                                                                              onClick={() => onClickRemoveAction(index)}></span>
                                            }
                                            <textarea readOnly={formType?.action_response?.readonly}
                                                      value={''}
                                                      onChange={(e) => onChangeValue(e.target.value, 'action_response', index)}
                                                      placeholder={"Response " + (index + 1)}></textarea>
                                        </div>
                                    )
                                ))
                            }
                            {/*{*/}
                            {/*    formType?.action_response?.readonly !== true &&*/}
                            {/*    <button type={"button"} onClick={onClickAddActionResponse}>Add Response</button>*/}
                            {/*}*/}
                        </div>
                    </div>


                    <div className={"form-section"}>
                        <div className={"flex-2"}>
                            <div className={"flex-column " + (formType?.review?.readonly ? 'readonly' : '')}>
                                <h4 className={"label"}>{formType?.review?.fieldIndex} Assessment Review:</h4>
                                <textarea placeholder={"School review"} value={formParams.review || ""}
                                          readOnly={formType?.review?.readonly}
                                          onChange={(e) => onChangeValue(e.target.value, "review")}></textarea>
                            </div>
                            <div className={"flex-column" + (formType?.something?.readonly ? ' readonly' : '')}>
                                <h4 className={"label"}>{formType?.something?.fieldIndex} Impact Area:</h4>
                                <div className={"form-section d-flex select-container"}>

                                    {
                                        somethingOptions.map((val, index) => {
                                                return (
                                                    <div key={index}>
                                                        <label>{val}</label>
                                                        <input type={"checkbox"}
                                                               checked={formParams?.something?.indexOf(val) !== -1
                                                                   && formParams?.something?.indexOf(val) !== undefined}
                                                               onChange={(e) => onClickSomething(e, val)}/>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <section className={"table-legend-section"}>
                                    <span className={"legend-title"}>{legendObject.title}</span>
                                    <span className={"legend-items"}>{displayLegend(legendObject)}</span>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className={"form-section" + (formType?.status?.readonly ? ' readonly' : '')}>
                        <h4 className={"label"}>{formType?.status?.fieldIndex} Assessment Status:</h4>
                        <div className={"buttons-container "}>
                            {
                                statusButtons.map((button, index) => (
                                    <div key={index}
                                         className={"radio-button-container " + (button.key === formParams?.status ? "selected" : "")}>
                                        <div className={"radio-button"} style={{backgroundColor: button.bgcolor}}
                                             onClick={() => {
                                                 if(!formType?.status?.readonly)
                                                     onChangeValue(button.key, "status")
                                             }}>
                                            {button.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={"form-section"}>
                        <button type={"submit"}>Save</button>
                    </div>


                </form>


            </main>
        </>
    )
}

export default ISSLCEdit;
ISSLCEdit.prototype = {
    props: {
        match: {
            params: {
                schoolId: String
            }
        }
    }
}