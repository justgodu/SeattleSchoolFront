import "./Header.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUsername, logout} from "../../utils/functions";
import constants from "../../utils/constants";
function Header(props){

    const [username, setUsername] = useState()

    useEffect(()=>{

        const getAndSetUsername = async  () => {

            if(localStorage.getItem(constants.jwtKey)){
                let resp = await getUsername();
                setUsername(resp.username);
            }

        }
        getAndSetUsername();
    },[])

    const onLogout = ()=>{
        logout()
    }
    return(
        <header className={"main-header"}>
            <div className={"container"}>
                <Link className={"logo"} to={"/"}>
                    <img src={"/seattle-logo.png"} />
                </Link>
            <h1 className={"title"}>{props.title || ""}</h1>
            <div className={"logo logout"}>
                {
                    username && (
                        <><h4>{username || ''}</h4>
                        <button onClick={onLogout}>Logout</button>
                        </>
                    )
                }

            </div>
            </div>
            <div className={"banner"} style={{backgroundImage: 'url("/the-great-tamanimas-banner.png")'}}></div>
        </header>
    )
}

export default Header;