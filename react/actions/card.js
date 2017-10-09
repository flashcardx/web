import axios from "axios";
import config from "../../config";
import {FETCH_USER_DECKS,
        CREATE_USER_DECK,
        DELETE_USER_DECK,
        PUSH_TO_USER_DECK_PATH,
        DROP_FROM_USER_DECK_PATH} from "./types";
const FETCH_USER_DECKS_URL = config.apiGetUserDecks;
const CREATE_USER_DECK_URL = config.apiCreateUserDeck;
const DELETE_USER_DECK_URL = config.apiDeleteUserDeck;
import deckPathAdapter from "../adapters/deckPathAdapter.js";


export function createUserCard(name, description, lang, imgs, parentId, callback){
    callback();
    /*
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
    */
}
