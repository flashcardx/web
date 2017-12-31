import {INFO_ALERT, ERROR_ALERT, SUCCESS_ALERT, WARNING_ALERT,
        ERROR_ALERT_GAME, SUCCESS_ALERT_GAME, WARNING_ALERT_GAME, SHOW_BIGLOADING, HIDE_BIGLOADING} from "../actions/types";

export function alertsReducer(state=null, action){
    const {payload} = action;
    switch (action.type) {
        case ERROR_ALERT:  return {msg:payload, type:"error", time: action.time};
        case SUCCESS_ALERT: return {msg:payload, type:"success", time: action.time};
        case WARNING_ALERT: return {msg:payload, type:"warning", time: action.time};
        case ERROR_ALERT_GAME:  return {msg:payload, time:4000, theme:"red", type:"error-game"};
        case SUCCESS_ALERT_GAME: return {msg:payload, time:3000, theme:"green", type:"success-game"};
        case WARNING_ALERT_GAME: return {msg:payload, time:3000, theme:"yellow", type:"warning-game"};
        case INFO_ALERT: return {msg:payload, theme:"dark", type:"info", time: action.time};
        default: return state;   
    }
}

export function loadingReducer(state=false, action){
    switch (action.type) {
        case SHOW_BIGLOADING: return true;
        case HIDE_BIGLOADING: return false;
        default: return state;   
    }
}