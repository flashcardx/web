import axios from "axios";
import config from "../api_config";
import {USER_INFO, SET_PROMOCODE, ERROR_ALERT, SIGNIN} from "./types";
const USER_INFO_URL = config.apiGetUserInfo;
const SET_PROMOCODE_URL = config.apiSetPromocode

export function getUserInfo(){
    const request = axios.get(USER_INFO_URL,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    return {type:USER_INFO,
            originAPI: true,
            payload:request};
}

export function submitPromocode(promocode, captchaKey, callback){
    const data ={
        code:promocode,
        "g-recaptcha-response": captchaKey
    }
    const request = axios.post(SET_PROMOCODE_URL, data,
           {headers: {'x-access-token': localStorage.getItem("jwt")}});
        request.then(r=>{
            if(r.data.success)
                callback();
        }) 
        return {
            type: SIGNIN,
            originAPI: true,
            bigLoading: true,
            successMsg: "Tu cuenta ah sido activada, bienvenido!",
            payload: request
        }
}
