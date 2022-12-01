import Header from "../../components/Header/Header";
import {useEffect,useState} from "react";
import {getGoals, getSchoolWithColumns} from "../../utils/functions";
import {Link} from "react-router-dom";

function ISSLCSchool(props){

    const [school, setSchool] = useState();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [sortBy, setSortBy] = useState();

    const statusButtons = [
        {
            "title": "Exceed",
            "bgcolor": "#006AA3",
            "txtcolor": "#FFFFFF",
            "key": "exceed"
        },
        {
            "title": "Meet",
            "bgcolor": "#00B050",
            "txtcolor": "#FFFFFF",
            "key": "meet"
        },
        {
            "title": "Partially Meet",
            "bgcolor": "#DFD60D",
            "txtcolor": "#FFFFFF",
            "key": "partially_meet"
        },
        {
            "title": "Underperform",
            "bgcolor": "#DB4D36",
            "txtcolor": "#ffffff",
            "key": "underperform"
        },
    ];

    const legendObject = {
        title: "Matrix Key",
        P: "Principal",
        T: "Teachers",
        PA: "Para Educators",
        D: "Distinct Employees",
        PAR: "Parents",
        SUP: "Supervision",
        CuSUP: "Program Supervision",
        SB: "School Board",
        S: "Superintendent",
        C: "Coaches"
    }

    useEffect(()=>{

        const getAndSetSchool = async ()=>{
            let theSchool = await getSchoolWithColumns("ISSLC",props.match.params.schoolId);
            setSchool(theSchool[0]);
        }

        const getAndSetRows = async ()=>{
            let theRows = await getGoals('row', 'ISSLC',null, props.match.params.schoolId);
            console.log(theRows, "theRows")
            setRows(theRows);
        }

        const getAndSetColumns = async ()=>{
            let theColumns = await getGoals('column', 'ISSLC', null, props.match.params.schoolId);
            console.log(theColumns, "theCol")
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

    const displayCellText = (param) => {

        let maxLength = 30;

        if (param.data?.review) {
            if (param.data?.review.length < maxLength) {
                return param.data?.review;
            }
            return param.data?.review.substring(0, maxLength) + "...";
        }

        return "";
    }

    const displayLegend = (legendObject) => {

        let elementsToReturn = [];

        for (let item in legendObject) {

            if (item === "title") {
                continue;
            }
            
            let element = 
                <span className={"legend-item-wrapper"}>
                    <span className={"legend-item-label"}>{`${item} = `}</span>
                    <span className={"legend-item-description"}>{`${legendObject[item]}`}</span>
                </span>
            
            elementsToReturn.push(element);
        }

        console.log(elementsToReturn);
        return elementsToReturn;
    }

    return(
        <>
            <Header title={"ISSLC - " + school?.name}/>
            <main className={""}>
                <div className={"edit-form-info container"}>
                    <h3><Link to={"/"}>Dashboard</Link></h3>
                    <h3><Link to={"/ISSLC"}>ISSLC</Link></h3>
                    <h3>{school?.name}</h3>
                </div>

                <div className={"filters-container container"}>
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
                <div className={"grid-container single-school-table"}>

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
                                                    school.parameters.forEach((param) => {
                                                        if (param.column_id && param.row_id
                                                            && param.column_id === col._id 
                                                            && param.row_id === row._id) {
                                                            Cell =
                                                                <td key={col_ind} className={"cell " + param.data?.status}>
                                                                    <Link to={`/isslc-edit/${school._id}/${col._id}/${row._id}`}>
                                                                        <span>
                                                                            { displayCellText(param) }
                                                                        </span>
                                                                        <span style={{marginTop:"auto"}}>{param.data?.something.join(", ")}</span>
                                                                    </Link>
                                                                </td>
                                                        }
                                                    });

                                                    if(!Cell){
                                                        Cell = <td key={col_ind} className={"cell row-header-" + index%2}>
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
                    <section className={"table-legend-section"}>
                        <span className={"legend-title"}>{`${legendObject.title}: `}</span>
                        <span className={"legend-items"}>{displayLegend(legendObject)}</span>
                    </section>
                </div>

            </main>
        </>
    )
}

export default ISSLCSchool;
