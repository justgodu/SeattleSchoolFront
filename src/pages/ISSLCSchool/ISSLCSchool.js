import Header from "../../components/Header/Header";
import {useEffect,useState} from "react";
import {getGoals, getSchool, getSchoolWithColumns} from "../../utils/functions";
import {Link} from "react-router-dom";

function ISSLCSchool(props){

    const [school, setSchool] = useState();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [sortBy, setSortBy] = useState();

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

    useEffect(()=>{

        const getAndSetSchool = async ()=>{
            let theSchool = await getSchoolWithColumns("ISSLC",props.match.params.schoolId);
            setSchool(theSchool[0]);
        }

        const getAndSetRows = async ()=>{
            let theRows = await getGoals('row', 'ISSLC');
            setRows(theRows);
        }

        const getAndSetColumns = async ()=>{
            let theColumns = await getGoals('column', 'ISSLC');
            setColumns(theColumns);
        }

        getAndSetSchool()
        getAndSetRows()
        getAndSetColumns()

    }, [])

    const onClickSort = async (sortKey)=>{

        if(sortBy === sortKey){
            setSortBy();
            return;
        }

        let sortObject = {
            status: sortKey
        }
        let rows = await getGoals('row', "ISSLC", sortObject, props.match.params.schoolId);
        setRows(rows);
        setSortBy(sortKey);
    }
    return(
        <>
            <Header title={"ISSLC - " + school?.name}/>
            <main className={"container"}>

                <div className={"filters-container"}>
                    <h4>Sort by</h4>
                    {
                        statusButtons.map((item, index)=>(
                            <div key={index} className={"sort-item" + (sortBy === item.key ? " selected" : "")} onClick={()=>onClickSort(item.key)} >
                                <div className={"sort-item-container"} style={{backgroundColor: item.bgcolor}}>
                                    <h4 style={{color: item.txtcolor}}>
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={"grid-container container"}>

                    <table className={"grid-table center"} cellSpacing={0}>
                        <tbody>
                        <tr>
                            <td className={"table-header"}>{school?.name}</td>
                            {
                                    columns.map((col,index)=>(
                                    <th className={"column-header"} key={index} scope={"col"}>{col.name}</th>
                                ))
                            }
                        </tr>
                        {
                            school && rows && columns && rows.map((row, index)=>{

                                    return (
                                        <tr key={index}>
                                            <th className={"row-header-" + index%2} scope={"row"}>{row.name}</th>
                                            {
                                                columns.map((col, col_ind) => {
                                                    let Cell;
                                                    school.parameters.map((param) => {

                                                        if (param.column_id && param.row_id
                                                            && param.column_id === col._id && param.row_id === row._id) {
                                                            Cell =
                                                                <td key={col_ind} className={"cell " + param.data?.status}>
                                                                    <Link to={`/isslc-edit/${school._id}/${col._id}/${row._id}`}>
                                                                        <span>{param.data?.review ? param.data?.review.substring(0, 20) + "..." : ''}</span>

                                                                        <span>{param.data.something.join(", ")}</span>
                                                                    </Link>
                                                                </td>

                                                        }

                                                    });

                                                    if(!Cell){
                                                        Cell = <td key={col_ind} className={"cell" + " row-header-" + index%2}>
                                                            <Link to={`/isslc-edit/${school._id}/${col._id}/${row._id}`}>
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

export default ISSLCSchool;
