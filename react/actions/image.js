import axios from "axios";
import config from "../../config";
import {SEARCH_IMG,
        SEARCH_GIF,
        RESET_SEARCH_IMAGES
        } from "./types";
const SEARCH_IMG_URL = config.apiSearchImage;
const SEARCH_GIF_URL = config.apiSearchGif;


export function searchImg(term){
    const url = SEARCH_IMG_URL + term;
    const request = axios.get(url,
            {headers:{'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: SEARCH_IMG,
        payload: request,
        originAPI: true
    }
}

export function searchGif(term){
    const url = SEARCH_GIF_URL + term;
    const request = axios.get(url,
            {headers:{'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: SEARCH_IMG,
        payload: request,
        originAPI: true
    }
}

export function resetSearchImages(){
    return {
        type: RESET_SEARCH_IMAGES
    }
}