import axios from "axios";
import config from "../../config";
import {FETCH_USER_DECKS, CREATE_USER_DECK, DELETE_USER_DECK} from "./types";
const FETCH_USER_DECKS_URL = config.apiGetUserDecks;
const CREATE_USER_DECK_URL = config.apiCreateUserDeck;
const DELETE_USER_DECK_URL = config.apiDeleteUserDeck;


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

export function createUserDeck(name, description, lang, img, parentId, callback){
    const data = {name,
                  description,
                  lang,
                  thumbnail: img};
    const request = axios.post(CREATE_USER_DECK_URL, data,{
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(()=>{
            callback();
    });
    return {type: CREATE_USER_DECK,
            originAPI: true,
            bigLoading: true,
            payload: request,
            };
}

export function deleteUserDeck(deckId, path, callback){
    const url = DELETE_USER_DECK_URL+deckId;
    const request = axios.delete(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    request.then(()=>{
            callback();
    });
    return {type:DELETE_USER_DECK,
            deckId: deckId,
            path:path,
            originAPI: true,
            bigLoading: true,
            payload:request};
}