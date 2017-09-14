import axios from "axios";
const env = process.env.NODE_ENV || "development";
import apiUrls from "../../config/api.json";
const GET_COUNT_URL = apiUrls[env].getActivityCount;
import {NOTIFICATIONS_COUNT} from "./types";



export function fetchCount(){
    
    return {
        type: NOTIFICATIONS_COUNT,
        originAPI: true,
        payload: 1
    }
}