import axios from "axios";
import config from "../../config";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import {CREATE_USER_CARD, GET_USER_CARDS, DELETE_USER_FLASHCARD} from "./types";
const CREATE_USER_CARD_URL = config.apiCreateUserCard;
const GET_USER_CARDS_URL = config.apiGetUserCards;
const DELETE_USER_FLASHCARD_URL = config.apiDeleteUserFlashcard;


export function createUserCard(name, description, images, deckId, callback){
    const url = CREATE_USER_CARD_URL + deckId;
    const data = {name,
                  description,
                  imgs: images};
    const request = axios.post(url, data,{
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(()=>{
        callback();
    });
    return {type: CREATE_USER_CARD,
            originAPI: true,
            bigLoading: true,
            payload: request,
            deckId
        }
}

export function fetchUserCards(skip=0, deckId){
    const url = GET_USER_CARDS_URL + deckId + "?skip="+skip;
    const request = axios.get(url, {
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    return {type: GET_USER_CARDS,
            originAPI: true,
            bigLoading: true,
            payload: request,
            deckId
            };
}

export function deleteUserFlashcard(deckId, flashcardId, callback){
    const url = DELETE_USER_FLASHCARD_URL+flashcardId;
    const request = axios.delete(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    request.then(()=>{
            callback();
    });
    return {type:DELETE_USER_FLASHCARD,
            flashcardId: flashcardId,
            deckId: deckId,
            originAPI: true,
            bigLoading: true,
            payload:request};
}