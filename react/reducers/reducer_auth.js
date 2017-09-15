import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, RE_SIGNIN, SIGNOUT} from "../actions/types";
import _ from "lodash";

export function authReducer(state=false, action){
    const {payload} = action;
    switch (action.type) {
        case SIGNIN: if(payload.success == true){
                        localStorage.setItem("jwt", payload.token);
                        return true;
                    }
                    return false;
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
    }
    return state;
}