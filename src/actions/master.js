import axios from "axios";
import config from "../api_config";
import {MASTER_CARD_COUNT,
        MASTER_USER_COUNT,
        MASTER_LOGINS,
        MASTER_CODE_GEN
        } from "./types";
const MASTER_CARD_COUNT_URL = config.apiMasterCardCount,
      MASTER_USER_COUNT_URL = config.apiMasterUserCount,
      MASTER_LOGINS_URL = config.apiMasterLogins,
      MASTER_CODEGEN_URL = config.apiMasterCodegen;

export function fetchCardCount(){
    const request = axios.get(MASTER_CARD_COUNT_URL, {
                                headers: {'x-access-token': localStorage.getItem("jwt")}
                                });
    return {
        type: MASTER_CARD_COUNT,
        payload: request,
        originAPI: true
    }
}

export function fetchUserCount(){
    const request = axios.get(MASTER_USER_COUNT_URL, {
                                headers: {'x-access-token': localStorage.getItem("jwt")}
                                });
    return {
        type: MASTER_USER_COUNT,
        payload: request,
        originAPI: true
    }
}

export function fetchLogins(){
    const request = axios.get(MASTER_LOGINS_URL, {
                                headers: {'x-access-token': localStorage.getItem("jwt")}
                                });
    return {
        type: MASTER_LOGINS,
        payload: request,
        originAPI: true
    }
}

export function submitCodeGen(count, months, school){
    var url = MASTER_CODEGEN_URL + count +"/"+months;
    if(school)
        url += "?school="+school;
    const request = axios.get(url, {
                                headers: {'x-access-token': localStorage.getItem("jwt")}
                                });
    return {type:  MASTER_CODE_GEN,
            payload: request,
            originAPI: true,
            successMsg: "The codes will be sent to your email"
        }
}