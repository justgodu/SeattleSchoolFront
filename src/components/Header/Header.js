import "./Header.css";
import {Link} from "react-router-dom";
function Header(props){

    return(
        <header className={"main-header"}>
            <div className={"container"}>
                <Link className={"logo"} to={"/"}>
                    <img src={"/seattle-logo.png"} />
                </Link>
            <h1 className={"title"}>{props.title}</h1>
            <div className={"logo"}></div>
            </div>
        </header>
    )
}

export default Header;