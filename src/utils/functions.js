import environment from "./environment";
import endpoints from "./endpoints";
import SeattleApi from "./api";
import constants from "./constants";


export async function getSchool(id){
    const api = new SeattleApi();
    return api.get(endpoints.school + "/" + id);
}

export async function getSchools(queryData = null){
    const api = new SeattleApi();
    return api.get(endpoints.school, queryData);
}

export async function getSchoolGoals(){
    const api = new SeattleApi();
    return api.get(endpoints.school_goal);
}

export async function getGoal(id){
    const api = new SeattleApi();
    return api.get(endpoints.school_goal + "/" + id);
}
export async function tryAuthorization(username, password){
    const api = new SeattleApi();
    let response = await api.post(endpoints.auth + "/login", {username, password});

    console.log(response, "login")
    if(response.access_token){
        localStorage.setItem(constants.jwtKey, response.access_token);
        window.location = "/dashboard"
    }
}

export async function getSchoolParam(schoolId, formType, columnId, rowId = ''){
    let api = new SeattleApi();
    return api.get(endpoints.school + `/edit/${schoolId}/${formType}/${columnId}/${rowId}`);
}

export async function validateJwt(){
    let api = new SeattleApi();
    return api.get(endpoints.auth + `/validate`);
}

export async function updateSchoolParam(schoolId, data, formType, columnId, rowId = '' ){
    let api = new SeattleApi();
    return api.post(endpoints.school + `/edit/${schoolId}/${formType}/${columnId}/${rowId}`, data);
}

export async function getGoals(type, formType, query = null, schoolId = ''){
    let api = new SeattleApi();
    return api.get(endpoints.school_goal + `/items/${type}/${formType}/${schoolId}`, query);
}

export async function getSchoolWithColumns(formType, schoolId = '', query = null){
    let api = new SeattleApi();
    return api.get(endpoints.school + `/with-columns/${formType}/${schoolId}`, query);
}

export async function getFormType(formType){
    let api = new SeattleApi();
    return api.get(endpoints.form_type + `/${formType}`);
}

export async function getUsers(){
    let api = new SeattleApi();
    return api.get(endpoints.user + `/`);
}

export async function getUser(userId){
    let api = new SeattleApi();
    return api.get(endpoints.user + `/${userId}`);
}

export async function updateUser(userId, userData){
    let api = new SeattleApi();
    return api.put(endpoints.user + `/${userId}`, userData);
}

export async function createUser(userData){
    let api = new SeattleApi();
    return api.post(endpoints.user, userData);
}