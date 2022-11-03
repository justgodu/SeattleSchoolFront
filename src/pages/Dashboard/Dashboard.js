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
        }
    ]
    return (
        <>
            <Header title={"Dashboard"} />
            {
                dashboardItems.map((item,index)=>(
                    <div key={index} className={"dashboard-item container"}>
                        <Link to={item.path}>
                        <img src={item.img}/>

                            <h3>
                                {item.title}
                            </h3>
                        </Link>
                    </div>
                ))
            }

        </>
    )
}

export default Dashboard;