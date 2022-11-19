import { useState, useEffect} from "react";
import {getSchoolGoals, getSchools} from "../../utils/functions";
import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import "./CSIP.css";
function CSIP(){

    const [schools, setSchools] = useState([]);

    const [columns, setColumns] = useState([]);

    useEffect(()=>{

        fetchAndSetSchools();

        fetchAndSetColumns();

    },[])

    const fetchAndSetSchools = async () => {
        let response = await getSchools();

        setSchools(response.items);
    }

    const fetchAndSetColumns = async () => {
        let response = await getSchoolGoals();
        console.log(response, "Goals")
        setColumns(response.items);
    }


    const statusFilters = [
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

    return(
        <>
            <Header title={"Dashboard CSIP Overview"}/>
            <main className={"container"}>
            <div className={"filters-container"}>
            <h4>Sort by</h4>
            {
                statusFilters.map((item, index)=>(
                    <div key={index} className={"sort-item"} >
                        <div className={"sort-item-container"} style={{backgroundColor: item.bgcolor}}>
                            <h4 style={{color: item.txtcolor}}>
                                {item.title}
                            </h4>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className={"grid-container"}>
                <table className={"grid-table"}>
                    <tbody>
                    <tr>
                        <td className={"table-header"}>Schools</td>
                        {
                            columns.map((col,index)=>(
                                <th className={"column-header"} key={index} scope={"col"}>{col.name}</th>
                            ))
                        }
                    </tr>
                    {
                        schools.map((school, index)=>{

                            return (
                                <tr key={index}>
                                    <th className={"row-header-" + index%2} scope={"row"}>{school.name}</th>
                                    {
                                        columns.map((col, col_ind) => {
                                            let Cell;
                                            school.parameters.map((param) => {

                                                if (param.goal_id && param.goal_id === col._id) {
                                                    Cell =
                                                        <td key={col_ind} className={"cell " + param.status}>
                                                            <Link to={`/csip/${school._id}/${col._id}`}>
                                                                {param.assessment_values.join(" & ")}
                                                            </Link>
                                                        </td>

                                                }

                                            });

                                            if(!Cell){
                                                Cell = <td key={col_ind} className={"cell empty"}>
                                                    <Link to={`/csip/${school._id}/${col._id}`}>
                                                        {"-"}
                                                    </Link>
                                                </td>
                                            }
                                            return Cell;
                                        })
                                    }

                                </tr>
                            )
                            }
                        )

                    }
                    </tbody>
                </table>
            </div>
            </main>
        </>
    )
}

export default CSIP;