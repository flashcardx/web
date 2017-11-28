import {ERROR_ALERT, SUCCESS_ALERT, INFO_ALERT, SHOW_BIGLOADING, HIDE_BIGLOADING} from "../actions/types";

export function alertsReducer(state=null, action){
    const {payload} = action;
    switch (action.type) {
        case ERROR_ALERT:  return {msg:payload, type:"error"};
        case SUCCESS_ALERT: return {msg:payload, type:"success"};
        case INFO_ALERT: return {msg:payload, type:"info"};
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