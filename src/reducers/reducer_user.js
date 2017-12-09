import {USER_INFO} from "../actions/types";
import {getLevel, getUpperLimit} from "../adapters/practiceAdapter";


export function getUserInfoReducer(state={}, action){
    switch (action.type) {
        case USER_INFO: return {...action.payload.msg, upperLimit: getUpperLimit(action.payload.msg.points), level:getLevel(action.payload.msg.points)};
        default: return state;
    }
}


