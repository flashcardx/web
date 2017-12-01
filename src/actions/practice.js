import axios from "axios";
import config from "../api_config";
import deckPathAdapter from "../adapters/deckPathAdapter.js";
import {FETCH_SP_USER_CARDS, RANK_USER_CARD} from "./types";
const FETCH_SP_USER_CARDS_URL = config.apiGetSpUserCards;
const RANK_USER_CARD_URL = config.apiRankCard;

export function fetchSpacedRepetitionCards(deckId){
    var url = FETCH_SP_USER_CARDS_URL;
    if(deckId)
        url += "?deckId=" + deckId;
    const request = axios.get(url, {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
            payload: request,
            type: FETCH_SP_USER_CARDS,
            originAPI: true,
            bigLoading: true
    }
}

export function rankCard(cardId, name){
    var url = RANK_USER_CARD_URL;
    const data = {
        cardId: cardId,
        name: name
    }
    const request = axios.post(url, data, {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {
            payload: request,
            type: RANK_USER_CARD,
            originAPI: true,
            bigLoading: true
    }
}