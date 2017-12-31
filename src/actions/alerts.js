import {INFO_ALERT, ERROR_ALERT,SUCCESS_ALERT, WARNING_ALERT,
    WARNING_ALERT_GAME, ERROR_ALERT_GAME, SUCCESS_ALERT_GAME,
         SHOW_BIGLOADING, HIDE_BIGLOADING} from "./types";

export function errorAlert(msg, time){
    return {
            type: ERROR_ALERT,
            payload: msg,
            time: time
        }
}

export function errorAlertGame(msg){
    return {
            type: ERROR_ALERT_GAME,
            payload: msg
        }
}

export function warningAlert(msg, time){
    return {
            type: WARNING_ALERT,
            payload: msg,
            time: time
        }
}

export function infoAlert(msg, time){
    return {
            type: INFO_ALERT,
            payload: msg,
            time: time
        }
}

export function warningAlertGame(msg){
    return {
            type: WARNING_ALERT_GAME,
            payload: msg
        }
}

export function successAlert(msg, time){
    return {
            type: SUCCESS_ALERT,
            payload: msg,
            time: time
        }
}

export function successAlertGame(msg){
    return {
            type: SUCCESS_ALERT_GAME,
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