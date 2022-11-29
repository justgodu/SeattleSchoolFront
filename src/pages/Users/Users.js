import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {getUsers} from "../../utils/functions";

function Users(props){

    const [users, setUsers] = useState([]);

    useEffect(()=>{

        const getAndSetUsers = async ()=>{
            let theUsers = await getUsers();
            setUsers(theUsers);
        }

        getAndSetUsers();

    }, [])

    const columns = [
        {
            'key': 'username',
            'name': 'Username'
        },
        {
            'key': 'first_name',
            'name': 'F name'
        },
        {
            'key': 'last_name',
            'name': 'L name'
        },
        {
            'key': 'email',
            'name': 'Email'
        },
        {
            'key': 'role',
            'name': 'Role'
        },
        {
            'key': 'school',
            'name': 'School'
        }
    ]
    return(
        <>
            <Header title={"User Management"}/>
            <main className={"container"}>

                <div className={"edit-form-info"}>
                    <h3><Link to={"/"}>Dashboard</Link></h3>
                    <h3>Users</h3>
                </div>

                <div className={"grid-container users"}>

                    <div className={"filters-container"}>
                        <Link style={{marginLeft: 'auto'}} className={"button-save"} to={"/users-new"}>Create new</Link>
                    </div>
                    <table className={"grid-table center"} cellSpacing={0}>
                        <tbody>
                        <tr>
                            {
                                columns.map((col,index)=>(
                                    <th className={"column-header"} key={index} scope={"col"}>{col.name}</th>
                                ))
                            }
                        </tr>
                        {
                            users.map((user, index)=>{

                                    return (
                                        <tr key={index}>
                                            {
                                                columns.map((col, col_ind) => {
                                                    let Cell;

                                                    if(user[col.key]){
                                                        Cell =
                                                            <td key={col_ind} className={"cell " + "row-header-" + index%2}>
                                                                <Link to={`/users/${user._id}`}>
                                                                    {user[col.key]}
                                                                </Link>
                                                            </td>
                                                    }

                                                    if(col.key == "school"){
                                                        Cell =
                                                            <td key={col_ind} className={"cell " + "row-header-" + index%2}>
                                                                <Link to={`/users/${user._id}`}>
                                                                    {user[col.key]?.name}
                                                                </Link>
                                                            </td>
                                                    }

                                                    if(!Cell){
                                                        Cell = <td key={col_ind} className={"cell" + "row-header-" + index%2}>
                                                            <Link to={`/users/${user._id}`}>
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

export default Users;