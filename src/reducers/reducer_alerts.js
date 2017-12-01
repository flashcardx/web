import {ERROR_ALERT, SUCCESS_ALERT, INFO_ALERT,
        ERROR_ALERT_GAME, SUCCESS_ALERT_GAME, INFO_ALERT_GAME, SHOW_BIGLOADING, HIDE_BIGLOADING} from "../actions/types";

export function alertsReducer(state=null, action){
    const {payload} = action;
    switch (action.type) {
        case ERROR_ALERT:  return {msg:payload, type:"error"};
        case SUCCESS_ALERT: return {msg:payload, type:"success"};
        case INFO_ALERT: return {msg:payload, type:"info"};
        case ERROR_ALERT_GAME:  return {msg:payload, time:4000, theme:"red", type:"error-game"};
        case SUCCESS_ALERT_GAME: return {msg:payload, time:3000, theme:"green", type:"success-game"};
        case INFO_ALERT_GAME: return {msg:payload, time:3000, theme:"yellow", type:"info-game"};
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