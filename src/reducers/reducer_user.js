import {USER_INFO} from "../actions/types";
import {getLevel} from "../adapters/practiceAdapter";


export function getUserInfoReducer(state={points:"Cargando", level:"Cargando"}, action){
    switch (action.type) {
        case USER_INFO: return {...action.payload.msg, level:getLevel(action.payload.msg.points)};
        default: return state;
    }
}


