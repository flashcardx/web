import axios from "axios";
import config from "../../config";
import {USER_INFO, FETCH_USER_DECKS} from "./types";
const USER_INFO_URL = config.apiGetUserInfo;
const FETCH_USER_DECKS_URL = config.apiGetUserDecks;

export function getUserInfo(){
    const request = axios.get(USER_INFO_URL,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {type:USER_INFO,
            originAPI: true,
            payload:request};
}

export function fetchUserDecks(parentId=undefined, skip=0, path={}){
    var url = FETCH_USER_DECKS_URL + "?skip=" + skip;
    if(parentId)
        url += "&parentId="+parentId;
    const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {type: FETCH_USER_DECKS,
            originAPI: true,
            bigLoading: true,
            payload: request,
            path: path}
}