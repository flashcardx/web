import axios from "axios";
const env = process.env.NODE_ENV || "development";
import apiUrls from "../../config/api.json";
const GET_COUNT_URL = apiUrls[env].getActivityCount;
import {NOTIFICATIONS_COUNT} from "./types";



export function fetchCount(){
    const request = axios.get(GET_COUNT_URL,
                {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: NOTIFICATIONS_COUNT,
        originAPI: true,
        payload: request
    }
}