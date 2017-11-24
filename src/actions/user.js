import axios from "axios";
import config from "../api_config";
import {USER_INFO} from "./types";
const USER_INFO_URL = config.apiGetUserInfo;

export function getUserInfo(){
    const request = axios.get(USER_INFO_URL,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {type:USER_INFO,
            originAPI: true,
            payload:request};
}

