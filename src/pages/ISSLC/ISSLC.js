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
                select: "_id|name|school_type"
            });
            setSchools(schoolList.items);
        }

        getAndSetSchools();

    }, [])

    const SortButtons = [
        {
            "title": "School Name",
            "bgcolor": "#006AA3",
            "txtcolor": "#FFFFFF",
            "key": "school_name"
        },
        {
            "title": "School Type",
            "bgcolor": "#006AA3",
            "txtcolor": "#FFFFFF",
            "key": "school_type"
        },
    ];

    // Sort schools
    const onClickSort = async (sortKey)=>{

        let sortedList;

        // Sort schools alphabetically by name
        if (sortKey === "school_name") {
            sortedList = schools.sort((a,b) => a.name.localeCompare(b.name));
        }
        // Sort schools alphabetically by type
        else if (sortKey === "school_type") {
            sortedList = schools.sort((a,b) => a.school_type.localeCompare(b.school_type));
        } else {
            return;
        }

        setSchools([...sortedList]);
        
    }


    return(
        <>
            <Header title={"ISSLC Standards Dashboard"} />
            <main className={"container page-content-wrapper"}>
                <div className={"edit-form-info container"}>
                    <h3><Link to={"/"}>Dashboard</Link></h3>
                    <h3>ISSLC</h3>
                </div>
                <div className={"filters-container container schools-filter-container"}>
                    <h4>Sort by</h4>
                    {
                        SortButtons.map((item, index)=>(
                            <button key={index} className={"sort-item school-sort-item"} onClick={()=>onClickSort(item.key)} >
                                <div className={"sort-item-container"} style={{backgroundColor: item.bgcolor}}>
                                    <h4 style={{color: item.txtcolor}}>
                                        {item.title}
                                    </h4>
                                </div>
                            </button>
                        ))
                    }
                </div>
                <div className={"selcet-school"}>
                    <h3>
                        Select School:
                    </h3>
                </div>
                <div className={"school-list-container"}>
                    <table border={0} cellSpacing={0} className={"school-table"}>
                        <tbody>
                        <tr>
                            <td className={"table-header school-table-header"}>Schools</td>
                            <td className={"table-header school-table-header"}>School Type</td>
                        </tr>
                        {
                            schools.length && schools.map((school, index)=> (
                                    <tr key={index}>
                                        <td className={"row-header-" + index%2 + " schools-table-row"} scope={"row"}>
                                            <Link to={"/isslc/" + school._id} className={"school-link"}>
                                                {school.name}
                                            </Link>
                                        </td>
                                        <td className={"row-header-" + index%2 + " schools-table-row"} scope={"row"}>
                                            {school.school_type}
                                        </td>
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