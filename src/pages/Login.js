import {useState} from "react";
import {tryAuthorization} from "../utils/functions";
import {useHistory} from "react-router-dom";

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
        <div>
            <form onSubmit={onSubmitForm}>
                <input name={"username"} type={"text"} onChange={onChangeInput}/>
                <input name={"password"} type={"password"} onChange={onChangeInput}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}
