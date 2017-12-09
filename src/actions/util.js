import {REDIRECT} from "./types";

export function redirect(path){
    console.log("redirecting to: ", path);
    return {
        type: REDIRECT,
        payload: path
    }
}