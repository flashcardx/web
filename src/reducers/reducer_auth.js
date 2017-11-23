import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, RE_SIGNIN, SIGNOUT, EMAIL_VERIFICATION} from "../actions/types";
import _ from "lodash";

export function authReducer(state=false, action){
    const {payload} = action;
    switch (action.type) {
        case SIGNIN:  localStorage.setItem("jwt", payload.token);
                       return true;
        case RE_SIGNIN: return true;
        case SIGNOUT: localStorage.removeItem("jwt");
                      return false;           
    }
    return state;
}

export function signupReducer(state=null, action){
    switch(action.type){ 
        case SIGNUP: if(action.payload.success==true && !action.payload.errorCode)
                        return {type:1, msg: action.payload.msg};
                     if(action.payload.errorCode == 1)
                        return {type:2, email:action.payload.email, msg: action.payload.msg};
        case SIGNUP_RESEND_EMAIL: if(action.payload.success==true)
                                    return {type:1, msg: action.payload.msg};
        case EMAIL_VERIFICATION: return {type:1, msg: action.payload.msg};
    }
    return state;
}