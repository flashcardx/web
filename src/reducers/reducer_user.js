import {USER_INFO} from "../actions/types";


export function getUserInfoReducer(state=null, action){
    switch (action.type) {
        case USER_INFO: return action.payload.msg;
    }
    return state;
}

