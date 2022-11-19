import environment from "./environment";
import constants from "./constants"

export default class SeattleApi{

    jwt;
    url;
    constructor() {
        this.url = environment.apiUrl;

        this.jwt = localStorage.getItem(constants.jwtKey);
    }

    async get(endpoint, queryData = null, headers = {}){

        let fetchUrl = this.url + endpoint;

        if(queryData){
            fetchUrl += this.objectToQuery(queryData);
        }

        if(!headers["Authorization"]){
            headers["Authorization"] = this.getAuthHeader();
        }

        if(!headers["Content-Type"]){
            headers["Content-Type"] = "application/json";
        }

        let response = await fetch(fetchUrl, {
            headers: headers
        });

        if(response.status === 401){
            this.unAuthorized();
        }

        return response.json();

    }

    async post(endpoint,  data = null, queryData = null, headers = {}){

        let fetchUrl = this.url + endpoint;

        if(queryData){
            fetchUrl += this.objectToQuery(queryData);
        }

        if(!headers["Authorization"]){
            headers["Authorization"] = this.getAuthHeader();
        }

        if(!headers["Content-Type"]){
            headers["Content-Type"] = "application/json";
        }

        let response = await fetch(fetchUrl, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        });


        if(response.status === 401){
            this.unAuthorized();
        }

        return response.json();

    }

    async put(endpoint,  data = null, queryData = null, headers = {}){

        let fetchUrl = this.url + endpoint;

        if(queryData){
            fetchUrl += this.objectToQuery(queryData);
        }

        if(!headers["Authorization"]){
            headers["Authorization"] = this.getAuthHeader();
        }

        if(!headers["Content-Type"]){
            headers["Content-Type"] = "application/json";
        }

        let response = await fetch(fetchUrl, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(data)
        });


        if(response.status === 401){
            this.unAuthorized();
        }

        return response.json();

    }

    getAuthHeader(){
        if(this.jwt){
            return "Bearer " + this.jwt;
        }
        return "";
    }


    objectToQuery(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return "?" + str.join("&");
    }

    unAuthorized(){
        window.location = "/login";
    }
}
