import axios from "axios";
import config from "../api_config";
import {NOTIFICATIONS_COUNT, SHOW_NOTIFS, HIDE_NOTIFS, GET_NOTIFICATIONS, APPEND_NOTIFICATIONS} from "./types";
const GET_COUNT_URL = config.apiGetActivityCount;
const GET_NOTIFICATIONS_URL = config.apiGetActivity;



export function fetchCount(){
    const request = axios.get(GET_COUNT_URL,
                {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: NOTIFICATIONS_COUNT,
        originAPI: true,
        payload: request
    }
}

export function showNotifs(){
    return function(dispatch){
        dispatch({
            type: SHOW_NOTIFS
        });
        dispatch(getNotifications());
    }
}

export function hideNotifs(){
    return {
        type: HIDE_NOTIFS
    };
}

export function getNotifications(page=0){
    var url = GET_NOTIFICATIONS_URL + "?page="+page;
    const request = axios.get(url,
                {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: GET_NOTIFICATIONS,
        originAPI: true,
        payload: request
    }
}

export function appendNotifications(page=0){
    var url = GET_NOTIFICATIONS_URL + "?page="+page;
    const request = axios.get(url,
                {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: APPEND_NOTIFICATIONS,
        originAPI: true,
        payload: request
    }
}