import axios from "axios";
import config from "../api_config";
import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, SIGNOUT, RE_SIGNIN, EMAIL_VERIFICATION} from "./types";
const SIGNIN_URL = config.apiLogin;
const SIGNUP_URL = config.apiSignup;
const RESEND_EMAIL_URL = config.apiResendEmailVerification;
const EMAIL_VERIFICATION_URL = config.apiEmailVerification;
const FB_AUTH_URL = config.apiFbAuthUrl;
const GOOGLE_AUTH_URL = config.apiGoogleAuthUrl;

export function signin(email, password, key){
    const request = axios.post(SIGNIN_URL, {
        email,
        password,
        "g-recaptcha-response": key
    });  
    return {
        type: SIGNIN,
        originAPI: true,
        bigLoading: true,
        payload: request
    }
}

export function signup(email,name, password, key){
    const request = axios.post(SIGNUP_URL, {
        email,
        name,
        password,
        "g-recaptcha-response": key
    });
    return {
        type: SIGNUP,
        originAPI: true,
        bigLoading:true, 
        payload: request
    }
} 

export function resendEmailSignup(email){
    const url = RESEND_EMAIL_URL + "/" + email;
    const request = axios.get(url);
    return {
        type: SIGNUP_RESEND_EMAIL,
        originAPI: true,
        bigLoading: true,
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
        bigLoading: true,
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
        bigLoading: true,
        payload: request
    }
}

export function googleAuth(googleUser){
        if(!googleUser)
            return null;
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        const request = axios.post(GOOGLE_AUTH_URL, {
            id_token: id_token
        });
        return {
            type: SIGNIN,
            originAPI: true,
            bigLoading: true,
            payload: request
        }
}

