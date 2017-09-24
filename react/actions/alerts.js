import {ERROR_ALERT,SUCCESS_ALERT, INFO_ALERT, SHOW_BIGLOADING, HIDE_BIGLOADING} from "./types";

export function errorAlert(msg){
    return {
            type: ERROR_ALERT,
            payload: msg
        }
}

export function infoAlert(msg){
    return {
            type: INFO_ALERT,
            payload: msg
        }
}

export function successAlert(msg){
    return {
            type: SUCCESS_ALERT,
            payload: msg
        }
}

export function showLoading(){
    return {
        type: SHOW_BIGLOADING
    };
}

export function hideLoading(){
    return {
        type: HIDE_BIGLOADING
    };
}