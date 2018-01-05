import axios from "axios";
import config from "../api_config";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import {FETCH_USER_DECKS,
        CREATE_USER_DECK,
        DELETE_USER_DECK,
        PUSH_TO_USER_DECK_PATH,
        DROP_FROM_USER_DECK_PATH,
        EDIT_USER_DECK,
        LIST_DECKS_NAME,
        GET_DECK_NAME,
        ISFETCHING_DECKS_START,
        ISFETCHING_DECKS_STOP} from "./types";
import {getTranslatorPreferences} from "./translator"
const FETCH_USER_DECKS_URL = config.apiGetUserDecks;
const CREATE_USER_DECK_URL = config.apiCreateUserDeck;
const DELETE_USER_DECK_URL = config.apiDeleteUserDeck;
const EDIT_USER_DECK_URL = config.apiEditUserDeck;
const LIST_DECKS_NAME_URL = config.apiListDecksNameUrl;
const GET_DECK_URL = config.apiGetDeckUrl;

export function fetchUserDecks(skip=0, path=[]){
    const parentId = deckPathAdapter.getLastIdFromPath(path);
    var url = FETCH_USER_DECKS_URL + "?skip=" + skip;
    if(parentId)
        url += "&parentId="+parentId;
    const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return dispatch => {
            dispatch({type: FETCH_USER_DECKS,
                      originAPI: true,
                      bigLoading: true,
                      payload: request,
                      path: path,
                      skip: skip});
           dispatch({type: ISFETCHING_DECKS_START});
           request.then(()=>{
                dispatch({type: ISFETCHING_DECKS_STOP});
           })
   };
}

export function listDecksName(deckId){
        var url = LIST_DECKS_NAME_URL;
        if(deckId)
                url += "?deckId="+deckId;
        const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
        return {
                type: LIST_DECKS_NAME,
                originAPI: true,
                bigLoading: true,
                payload: request
        }
}

export function createUserDeck(name, description, lang, img, parentId, callback){
    const data = {name,
                  description,
                  lang,
                  parentId,
                  img};
    const request = axios.post(CREATE_USER_DECK_URL, data,{
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(r=>{
            if(r.data.success)
                callback();  
    });
    return {type: CREATE_USER_DECK,
            originAPI: true,
            bigLoading: true,
            payload: request,
            parentId,
            successMsg: "Mazo creado exitosamente!"
            };
}

export function editUserDeck(name, description, lang, img, deckId, parentId, callback){
        const data = {name,
                      description,
                      lang,
                      parentId,
                      img};
    const url = EDIT_USER_DECK_URL + deckId;
    const request = axios.post(url, data,{
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(r=>{
            if(r.data.success)
                callback();  
    });
    return {type: EDIT_USER_DECK,
            originAPI: true,
            bigLoading: true,
            payload: request,
            parentId,
            successMsg: "Tu mazo ha sido editado!"
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
            payload:request,
            successMsg: "Mazo eliminado correctamente"
        };
}

export function pushToPath(deckId, deckName){
        const newPath = {
                        id: deckId,
                        name: deckName
                        }
        return dispatch => {
                dispatch({
                        type: PUSH_TO_USER_DECK_PATH,
                        newPath
                })
                dispatch(getTranslatorPreferences(deckId));
            };
}

export function dropFromPath(pathLastIndex){
        return {
                type: DROP_FROM_USER_DECK_PATH,
                pathLastIndex
        }
}

export function getDeckName(deckId){
        const url = GET_DECK_URL + deckId + "?fields=name";
        const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
        return {
                type: GET_DECK_NAME,
                payload: request,
                originAPI: true
                }        
}