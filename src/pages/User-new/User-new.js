import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {createUser, getSchools, getUser, updateUser} from "../../utils/functions";
import Header from "../../components/Header/Header";

function UserNew(){
    const history = useHistory();

    const [user, setUser] = useState({});
    const [updateStatus, setUpdateStatus] = useState();
    const [schools, setSchools] = useState([]);
    useEffect(() => {
        const getAndSetSchools = async () => {
            let schoolList = await getSchools({
                select: "_id|name"
            });
            setSchools(schoolList.items);
        }

        getAndSetSchools();

    }, []);


    const onChangeValue = (value, key, index = null) => {
        let tempFormParams = Object.assign({}, user);
        if (index !== null) {
            if (!tempFormParams[key]) {
                tempFormParams[key] = [];
            }
            tempFormParams[key][index] = value;
        } else {
            tempFormParams[key] = value;
        }

        if(key === "role" && value === 'admin'){
            delete tempFormParams['school'];
        }


        setUser(tempFormParams);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let response = await createUser(user);

        if (response.status) {
            setUpdateStatus({
                class: 'alert error',
                text: "Error occurred while updating School Goal"
            })
        } else {
            history.push(`/users`);
        }

        setTimeout(() => {
            setUpdateStatus()
        }, 4000)
        console.log(response);
    }

    const roleOptions = [
        {
            key: 'admin',
            name: 'Admin'
        },
        {
            key: 'principal',
            name: 'Principal'
        },
    ]
    return (
        <>
            <Header title={"User Management - " + (user?.username || "New")}/>

            <main className={"edit-container container"}>
                <div className={"edit-form-info"}>
                    <h3><Link to={"/"}>Dashboard</Link></h3>
                    <h3><Link to={"/users"}>Users</Link></h3>
                    <h3>User - {user?.username || "New"}</h3>
                    {updateStatus?.class && (<h4 className={updateStatus.class}>{updateStatus.text}</h4>)}
                </div>
                <form className={"edit-form"} onSubmit={(e) => {
                    onSubmit(e)
                }}>

                    <div className={"flex-2 form-section"}>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>Username:</h4>
                            <input type={"text"} value={user?.username || ""} onChange={(e) => onChangeValue(e.target.value, "username")} required={true}/>
                        </div>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>Email:</h4>
                            <input type={"text"} value={user?.email || ""} onChange={(e) => onChangeValue(e.target.value, "email")} required={true}/>
                        </div>
                    </div>

                    <div className={"flex-2 form-section"}>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>Password:</h4>
                            <input type={"password"} value={user?.password || ""} onChange={(e) => onChangeValue(e.target.value, "password")} required={true}/>
                        </div>
                    </div>


                    <div className={"flex-2 form-section"}>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>First Name</h4>
                            <input type={"text"} value={user?.first_name || ""} onChange={(e) => onChangeValue(e.target.value, "first_name")} required={true}/>
                        </div>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>Last Name:</h4>
                            <input type={"text"} value={user?.last_name || ""} onChange={(e) => onChangeValue(e.target.value, "last_name")} required={true}/>
                        </div>
                    </div>



                    <div className={"flex-2 form-section"}>
                        <div className={"flex-column"}>
                            <h4 className={"label"}>Role:</h4>
                            <select value={user?.role || ""} onChange={(e) => onChangeValue(e.target.value, "role")}>
                                {
                                    roleOptions.map((role, index) => (
                                        <option key={index} value={role.key}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            user?.role === "principal" && (
                                <div className={"flex-column"}>
                                    <h4 className={"label"}>School:</h4>
                                    <select value={user?.school || ""} onChange={(e) => onChangeValue(e.target.value, "school")}>
                                        {
                                            schools.map((school, index) => (
                                                <option key={index} value={school._id}>{school.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </div>

                    <div className={"form-section"}>
                        <button type={"submit"}>Save</button>
                    </div>


                </form>


            </main>
        </>
    )
}

export default UserNew;