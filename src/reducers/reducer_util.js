import {REDIRECT} from "../actions/types";

export function redirectReducer(state=null, action){
    switch (action.type) {
        case REDIRECT:  return {path: action.payload};
        default: return state;
    }
}