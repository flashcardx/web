import axios from "axios";
import apiUrls from "../../config/api.json";
import {SIGNIN, SIGNOUT} from "./types";
const env = process.env.NODE_ENV || "development";
const SIGNIN_URL = apiUrls[env].login;


export function signin(values){
    const request = axios.post(SIGNIN_URL, {
        email: values.email,
        password: values.password
    });
    return {
        type: SIGNIN,
        originAPI: true,
        payload: request,
    }
}

export function signout(){
    return {type:SIGNOUT};
}
