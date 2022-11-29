import {useState} from "react";
import {tryAuthorization} from "../utils/functions";
import {useHistory} from "react-router-dom";
import Header from "../components/Header/Header";

export default function Login(){

    const history = useHistory();

    const [authCreds, setAuthCreds] = useState({
        username: "",
        password: ""
    });

    const onSubmitForm = async (event) =>{
        event.preventDefault();
        let response = await tryAuthorization(authCreds.username, authCreds.password);
        if(response){
            history.push("/")
        }
    }

    const onChangeInput = (event) =>{
        let newAuthCreds = authCreds;
        newAuthCreds[event.target.name] = event.target.value;
        setAuthCreds(newAuthCreds);
    }
    return(
        <>
        <Header title={"Login"}/>
        <main className={"container"}>
        <div className={"edit-form"} style={{paddingTop: "20px"}}>
            <form onSubmit={onSubmitForm}>
                <div className={"form-section"} style={{textAlign: "center"}} >
                <input name={"username"} placeholder={"Username or Email"} type={"text"} onChange={onChangeInput}/>
                </div>
                <div className={"form-section"} style={{textAlign: "center"}} >
                <input name={"password"}  placeholder={"Password"} type={"password"} onChange={onChangeInput}/>
                </div>
                <div  className={"form-section"} style={{textAlign: "center"}} >
                <button type={"submit"}>Submit</button>
                </div>
            </form>
        </div>
        </main>
        </>
    )
}
