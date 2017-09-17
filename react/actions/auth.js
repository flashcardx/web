import axios from "axios";
import apiUrls from "../../config/api.json";
import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, SIGNOUT, RE_SIGNIN, EMAIL_VERIFICATION} from "./types";
const env = process.env.NODE_ENV || "development";
const SIGNIN_URL = apiUrls[env].login;
const SIGNUP_URL = apiUrls[env].signup;
const RESEND_EMAIL_URL = apiUrls[env].resendEmailVerification;
const EMAIL_VERIFICATION_URL = apiUrls[env].emailVerification;
const FB_AUTH_URL = apiUrls[env].fbAuth;
export function signin({email, password}, key){
    const request = axios.post(SIGNIN_URL, {
        email,
        password,
        "g-recaptcha-response": key
    });
    return {
        type: SIGNIN,
        originAPI: true,
        payload: request
    }
}

export function signup({name, email, password}, key){
    const request = axios.post(SIGNUP_URL, {
        email,
        name,
        password,
        "g-recaptcha-response": key
    });
    return {
        type: SIGNUP,
        originAPI: true,
        payload: request
    }
} 

export function resendEmailSignup(email){
    const url = RESEND_EMAIL_URL + "/" + email;
    const request = axios.get(url);
    return {
        type: SIGNUP_RESEND_EMAIL,
        originAPI: true,
        payload: request
    }
}

export function reSignin(){
    return {
        type: RE_SIGNIN
    }
}

export function signout(){
    return {type:SIGNOUT};
}

export function emailVerification(id){
    const url = EMAIL_VERIFICATION_URL + "/" + id;
    const request = axios.get(url);
    return {
        type: EMAIL_VERIFICATION,
        originAPI: true,
        payload: request
    }
}

export function fbAuth({accessToken}){
    const request = axios.post(FB_AUTH_URL,{
       access_token: accessToken 
    });
    return {
        type: SIGNIN,
        originAPI: true,
        payload: request
    }
}
