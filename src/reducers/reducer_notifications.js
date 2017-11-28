import {NOTIFICATIONS_COUNT, SHOW_NOTIFS, HIDE_NOTIFS, GET_NOTIFICATIONS, APPEND_NOTIFICATIONS} from "../actions/types";

export function countReducer(state=0, action){
    switch (action.type) {
        case NOTIFICATIONS_COUNT: return action.payload.msg;
        default: return state;
    }
}

export function showNotifsReducer(state=false, action){
    switch (action.type) {
        case SHOW_NOTIFS: return true;
        case HIDE_NOTIFS: return false;
        default: return state;
    }    
}

export function getNotifsReducer(state=null, action){
    switch (action.type) {
        case GET_NOTIFICATIONS: return action.payload.msg;
        case APPEND_NOTIFICATIONS: return [...state, ...action.payload.msg];
        default: return state;
    }
}

