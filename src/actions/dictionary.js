import {DICTIONARY_DEFINE,
        SPELL_SUGGESTIONS,
        CLEAR_SPELL_SUGGESTIONS} from "./types"
import axios from "axios"
import config from "../api_config";
const DICTIONARY_DEFINE_URL = config.apiDictionaryDefine
const SPELL_SUGGESTIONS_URL = config.apiSpellSuggestions;

export function define(lang, word){
    const url = DICTIONARY_DEFINE_URL + lang + "/" + word;
    const request = axios.get(url, {
            headers: {'x-access-token': localStorage.getItem("jwt")}
        });
    return {type: DICTIONARY_DEFINE,
            payload: request,
            originAPI: true, 
            bigLoading: true};
}

export function fetchSpellSuggestions(lang, word){
    const url = SPELL_SUGGESTIONS_URL+lang+"/"+word
    const request = axios.get(url, {
        headers: {'x-access-token': localStorage.getItem("jwt")}
        });
    return {
        type: SPELL_SUGGESTIONS,
        originAPI: true,
        payload: request
    }
}

export function clearSpellSuggestions(){
    return {
        type: CLEAR_SPELL_SUGGESTIONS
    }
}