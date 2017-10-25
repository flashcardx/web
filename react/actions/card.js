import axios from "axios";
import config from "../../config";
import {CREATE_USER_CARD, GET_USER_CARDS} from "./types";
const CREATE_USER_CARD_URL = config.apiCreateUserCard;
const GET_USER_CARDS_URL = config.apiGetUserCards;
import deckPathAdapter from "../adapters/deckPathAdapter.js";


export function createUserCard(name, description, images, deckId, callback){
    const url = CREATE_USER_CARD_URL + deckId;
    const data = {name,
                  description,
                  images};
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
            deckId
            };
}