import axios from "axios";
import config from "../api_config";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import {CREATE_USER_CARD, EDIT_USER_CARD, GET_USER_CARDS, DELETE_USER_FLASHCARD, MOVE_USER_CARD} from "./types";
const CREATE_USER_CARD_URL = config.apiCreateUserCard;
const EDIT_USER_CARD_URL = config.apiEditCard;
const MOVE_USER_CARD_URL = config.apiMoveCard;
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
    request.then(r=>{
        if(r.data.success == true)
            callback();
    });
    return {type: CREATE_USER_CARD,
            originAPI: true,
            bigLoading: true,
            payload: request,
            deckId,
            successMsg: "Tu ficha fue creada exitosamente!"
        }
}

export function editUserFlashcard({name, cardId, description, imgs, deckId}, callback){
    const url = EDIT_USER_CARD_URL + cardId;
    //we dont need to send deckid unless we wanna move the flashcard to other deck
    const data = {
        name,
        description,
        imgs
    };
    const request = axios.post(url, data,{
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(r=>{
        if(r.data.success == true)
            callback();
    })
    return {
        type: EDIT_USER_CARD,
        originAPI: true,
        payload: request,
        deckId: deckId,
        successMsg: "Tu ficha fue editada!"
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
    request.then(r=>{
        if(r.data.success == true)
            callback();
    });
    return {type:DELETE_USER_FLASHCARD,
            flashcardId: flashcardId,
            deckId: deckId,
            originAPI: true,
            bigLoading: true,
            payload:request,
            successMsg: "Tu ficha ha sido eliminada!"
        };
}

export function moveUserFlashcardToDeck(cardId, oldDeckId, newDeckId, callback){
    const url = MOVE_USER_CARD_URL + cardId + "/" + newDeckId;
    const request = axios.get(url, {
                        headers: {'x-access-token': localStorage.getItem("jwt")}
                        });
    request.then(r=>{
        if(r.data.success == true)
            callback();
    })
    return {
        type: MOVE_USER_CARD,
        originAPI: true,
        payload: request,
        oldDeckId: oldDeckId,
        newDeckId: newDeckId,
        cardId: cardId,
        successMsg: "Tu ficha ha sido movida!"
    }
}