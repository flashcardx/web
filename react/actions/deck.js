import axios from "axios";
import config from "../../config";
import {FETCH_USER_DECKS, CREATE_USER_DECK, DELETE_USER_DECK} from "./types";
const FETCH_USER_DECKS_URL = config.apiGetUserDecks;
const CREATE_USER_DECK_URL = config.apiCreateUserDeck;
const DELETE_USER_DECK_URL = config.apiDeleteUserDeck;
import deckPathAdapter from "../adapters/deckPathAdapter.js";


export function fetchUserDecks(skip=0, path=[]){
    const parentId = deckPathAdapter.getLastIdFromPath(path);
    var url = FETCH_USER_DECKS_URL + "?skip=" + skip;
    if(parentId)
        url += "&parentId="+parentId;
    const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
   console.log("fetchuserdecks");
   return {type: FETCH_USER_DECKS,
            originAPI: true,
            bigLoading: true,
            payload: request,
            path: path,
            skip: skip}
}

export function createUserDeck(name, description, lang, img, parentId, callback){
    const data = {name,
                  description,
                  lang,
                  parentId,
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
            parentId
            };
}

export function deleteUserDeck(deckId, callback){
    const url = DELETE_USER_DECK_URL+deckId;
    const request = axios.delete(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    request.then(()=>{
            callback();
    });
    return {type:DELETE_USER_DECK,
            deckId: deckId,
            originAPI: true,
            bigLoading: true,
            payload:request};
}
