import "./ISSLC.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getSchools} from "../../utils/functions";
import Header from "../../components/Header/Header";

function ISSLC(props){

    const [schools, setSchools] = useState([]);
    useEffect(()=>{

        const getAndSetSchools = async () => {
            let schoolList = await getSchools({
                select: "_id|name"
            });
            setSchools(schoolList.items);
        }

        getAndSetSchools();

    }, [])
    return(
        <>
            <Header title={"ISSLC Standards Dashboard"} />
            <main className={"container"}>
                <div className={"section-container center"}>
                    <h3>
                        Select School:
                    </h3>
                </div>
                <div className={"grid-container section-container "}>
                    <table border={0} cellSpacing={0} className={"grid-table center"}>
                        <tbody>
                        <tr>
                            <td className={"table-header"}>Schools</td>
                        </tr>
                        {
                            schools.length && schools.map((school, index)=> (
                                        <tr key={index}>
                                            <th className={"row-header-" + index%2} scope={"row"}>
                                                <Link to={"/isslc/" + school._id}>
                                                    {school.name}
                                                </Link>
                                            </th>


                                        </tr>
                                )

                            )

                        }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default ISSLC;