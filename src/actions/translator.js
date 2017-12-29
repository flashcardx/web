import axios from "axios";
import config from "../api_config";
import {TRANSLATE,
    TRANSLATE_PREFERENCES,
    UPDATE_TRANSLATE_PREFERENCES_TO,
    UPDATE_TRANSLATE_PREFERENCES_FROM} from "./types";
const TRANSLATE_URL = config.apiTranslate,
      TRANSLATE_PREFERENCES_URL = config.apiLastTranslationLangs;


export function translate(text, from, to){
    var url = TRANSLATE_URL +"?text="+text+"&from="+from;
    if(to)
        url += "&to="+to;
    const request = axios.get(url, {headers: {'x-access-token': localStorage.getItem("jwt")}})
    return {
        type: TRANSLATE,
        payload: request,
        originAPI: true,
        bigLoading: true
    }
}

export function getTranslatorPreferences(){
    const request = axios.get(TRANSLATE_PREFERENCES_URL, {headers: {'x-access-token': localStorage.getItem("jwt")}})
    return {
        type: TRANSLATE_PREFERENCES,
        payload: request,
        originAPI: true
    }
}

export function updateTranslatorPreferencesTo(to){
    return {
        type: UPDATE_TRANSLATE_PREFERENCES_TO,
        payload: to
    }
}

export function updateTranslatorPreferencesFrom(from){
    return {
        type: UPDATE_TRANSLATE_PREFERENCES_FROM,
        payload: from
    }
}