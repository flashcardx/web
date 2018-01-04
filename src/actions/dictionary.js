import {DICTIONARY_DEFINE} from "./types"
import axios from "axios"
import config from "../api_config";
const DICTIONARY_DEFINE_URL = config.apiDictionaryDefine


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