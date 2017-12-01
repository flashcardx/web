import {ERROR_ALERT,SUCCESS_ALERT, INFO_ALERT,
     INFO_ALERT_GAME, ERROR_ALERT_GAME, SUCCESS_ALERT_GAME,
         SHOW_BIGLOADING, HIDE_BIGLOADING} from "./types";

export function errorAlert(msg){
    return {
            type: ERROR_ALERT,
            payload: msg
        }
}

export function errorAlertGame(msg){
    return {
            type: ERROR_ALERT_GAME,
            payload: msg
        }
}

export function infoAlert(msg){
    return {
            type: INFO_ALERT,
            payload: msg
        }
}

export function infoAlertGame(msg){
    return {
            type: INFO_ALERT_GAME,
            payload: msg
        }
}

export function successAlert(msg){
    return {
            type: SUCCESS_ALERT,
            payload: msg
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