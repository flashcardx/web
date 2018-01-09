import {DICTIONARY_DEFINE,
        SPELL_SUGGESTIONS,
        CLEAR_SPELL_SUGGESTIONS} from "../actions/types";


export function dictionaryDefineReducer(state=null, action){
    if(action.type === DICTIONARY_DEFINE){
        return {text:action.payload.msg};
    }
    return state;
}

export function spellSuggestionsReducer(state=[], action){
    if(action.type === SPELL_SUGGESTIONS){
        return action.payload.msg;
    }
    if(action.type === CLEAR_SPELL_SUGGESTIONS)
        return []
    return state;
}