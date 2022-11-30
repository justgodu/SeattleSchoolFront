import Header from "../../components/Header/Header";
import {Link, useHistory} from "react-router-dom";
import {useState,useEffect} from "react";

import {getSchools, getUser, updateUser, deleteUser} from "../../utils/functions";

function UsersEdit(props){

    const history = useHistory();

    const [user, setUser] = useState();
    const [updateStatus, setUpdateStatus] = useState();
    const [schools, setSchools] = useState([]);
    useEffect(() => {

        const getAndSetUser = async () => {
            let response = await getUser(props.match.params.userId);

            if (response) {
                setUser(response);
            }

        }
        const getAndSetSchools = async () => {
            let schoolList = await getSchools({
                select: "_id|name"
            });
            setSchools(schoolList.items);
        }

        getAndSetSchools();

        getAndSetUser();

    }, []);


    const userDelete = async() => {
        let deleteUserResult = await deleteUser('/delete', props.match.params.userId);

        if (!deleteUserResult) {
            console.log("Can't delete user");
        }

        history.goBack();
    }


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
        let response = await updateUser(props.match.params.userId, user);

        if (response.status) {
            setUpdateStatus({
                class: 'alert error',
                text: "Error occurred while updating School Goal"
            })
        } else {
            if (response._id) {
                // setUpdateStatus({
                //     class: 'alert success',
                //     text: "Successfully updated"
                // })
                history.push(`/isslc/${props.match.params.schoolId}`);
            }
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
                            <h4 className={"label"}>First Name</h4>
                            <input type={"text"} value={user?.first_name || "first_name"} onChange={(e) => onChangeValue(e.target.value, "first_name")} required={true}/>
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
                        <button onClick={() => userDelete()} className={"delete-user-btn"}>Delete User</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default UsersEdit;