import environment from "./environment";
import endpoints from "./endpoints";
import SeattleApi from "./api";
import constants from "./constants";


export async function getSchool(id){
    const api = new SeattleApi();
    return api.get(endpoints.school + "/" + id);
}

export async function getSchools(){
    const api = new SeattleApi();
    return api.get(endpoints.school);
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

export async function getCSIPEditFields(schoolId, goalId){
    let api = new SeattleApi();
    return api.get(endpoints.school + `/csip-edit/${schoolId}/${goalId}`);
}

export async function validateJwt(){
    let api = new SeattleApi();
    return api.get(endpoints.auth + `/validate`);
}

export async function updateCSIP(schoolId, goalId, data){
    let api = new SeattleApi();
    return api.post(endpoints.school + `/csip-edit/${schoolId}/${goalId}`, data);
}