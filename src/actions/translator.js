import axios from "axios";
import config from "../api_config";
import {TRANSLATE,
    TRANSLATE_PREFERENCES,
    UPDATE_TRANSLATE_PREFERENCES_TO,
    UPDATE_TRANSLATE_PREFERENCES_FROM} from "./types";
const TRANSLATE_URL = config.apiTranslate,
      TRANSLATE_PREFERENCES_URL = config.apiLastTranslationLangs;


export function translate(deckId, text, from, to){
    var url = TRANSLATE_URL + deckId + "?text="+text+"&from="+from;
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

export function getTranslatorPreferences(deckId){
    const url = TRANSLATE_PREFERENCES_URL+deckId;
    const request = axios.get(url, {headers: {'x-access-token': localStorage.getItem("jwt")}})
    return {
        type: TRANSLATE_PREFERENCES,
        payload: request,
        deckId: deckId,
        originAPI: true
    }
}

export function updateTranslatorPreferencesTo(deckId, to){
    return {
        type: UPDATE_TRANSLATE_PREFERENCES_TO,
        payload: to,
        deckId: deckId
    }
}

export function updateTranslatorPreferencesFrom(deckId, from){
    return {
        type: UPDATE_TRANSLATE_PREFERENCES_FROM,
        deckId: deckId,
        payload: from
    }
}