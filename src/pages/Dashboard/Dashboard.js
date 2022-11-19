import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {validateJwt} from "../../utils/functions";
import "./Dashboard.css"
function Dashboard(){

    useEffect(()=>{
        validateJwt();
    },[])
    const dashboardItems = [
        {
            "title": "CSIP Overview",
            "img": "/CSIP.png",
            "path": "/csip"
        },
        {
            "title": "ISSLC Standards Dashboard",
            "img": "/CSIP.png",
            "path": "/isslc"
        },
        {
            "title": "Users",
            "img": "/CSIP.png",
            "path": "/users"
        }
    ]
    return (
        <>
            <Header title={"Dashboard"} />
            <main className={"dashboard-container container"}>
                {
                    dashboardItems.map((item,index)=>(
                        <div key={index} className={"dashboard-item"}>
                            <Link to={item.path}>
                            <img src={item.img}/>

                                <h3>
                                    {item.title}
                                </h3>
                            </Link>
                        </div>
                    ))
                }
            </main>

        </>
    )
}

export default Dashboard;