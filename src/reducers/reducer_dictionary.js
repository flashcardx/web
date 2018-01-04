import {DICTIONARY_DEFINE} from "../actions/types";


export function dictionaryDefineReducer(state=null, action){
    if(action.type === DICTIONARY_DEFINE){
        return {text:action.payload.msg};
    }
    return state;
}