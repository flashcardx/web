import {NOTIFICATIONS_COUNT, SHOW_NOTIFS, HIDE_NOTIFS, GET_NOTIFICATIONS} from "../actions/types";
import _ from "lodash";

export function countReducer(state=0, action){
    switch (action.type) {
        case NOTIFICATIONS_COUNT: return action.payload.msg;
    }
    return state;
}

export function showNotifsReducer(state=false, action){
    switch (action.type) {
        case SHOW_NOTIFS: return true;
        case HIDE_NOTIFS: return false;
    }    
    return state;
}

export function getNotifsReducer(state=[], action){
    switch (action.type) {
        case GET_NOTIFICATIONS: console.log("got: ", action.payload.msg);
                                return action.payload.msg;
    }
    return state;
}

