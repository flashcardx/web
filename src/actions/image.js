import axios from "axios";
import config from "../api_config";
import {SEARCH_IMG,
        SEARCH_GIF,
        RESET_SEARCH_IMAGES,
        IMAGE_PROXY,
        DELETE_IMAGE_READY
        } from "./types";
const SEARCH_IMG_URL = config.apiSearchImage;
const SEARCH_GIF_URL = config.apiSearchGif;
const IMAGE_PROXY_URL = config.apiImageProxy;


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

export function proxyImgFromUrl(img){
    const request = axios.post(IMAGE_PROXY_URL, img, {headers:{'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: IMAGE_PROXY,
        payload: request,
        originAPI: true,
        bigLoading: true,
        showErrorAsWarning: true,
        customErrorMsg: "Sorry this image can't be downloaded",
        width: img.width,
        height: img.height
    }
}

export function proxyImgFromData(form, img){
    const request = axios.post(IMAGE_PROXY_URL, form, {headers:{'x-access-token': localStorage.getItem("jwt")}});
    return {
        type: IMAGE_PROXY,
        payload: request,
        originAPI: true,
        bigLoading: true,
        showErrorAsWarning: true,
        customErrorMsg: "Sorry this image can't be downloaded, make sure the size is less than 4mb",
        width: img.width,
        height: img.height
    }
}

export function deleteImageReady(){
    return {
        type: DELETE_IMAGE_READY
    }
}