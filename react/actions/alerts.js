import {ERROR_ALERT} from "./types";



export function errorAlert(msg){
    return {
            type: ERROR_ALERT,
            payload: msg
        }
}