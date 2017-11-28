import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, RE_SIGNIN, SIGNOUT, EMAIL_VERIFICATION} from "../actions/types";

export function authReducer(state=false, action){
    const {payload} = action;
    switch (action.type) {
        case SIGNIN:  localStorage.setItem("jwt", payload.token);
                       return true;
        case RE_SIGNIN: return true;
        case SIGNOUT: localStorage.removeItem("jwt");
                      return false;
        default: return state;   
    }
}

export function signupReducer(state=null, action){
    switch(action.type){ 
        case SIGNUP: if(action.payload.success===true && !action.payload.errorCode)
                        return {type:1, msg: action.payload.msg};
                     if(action.payload.errorCode === 1)
                        return {type:2, email:action.payload.email, msg: action.payload.msg};
                    break;
        case SIGNUP_RESEND_EMAIL: if(action.payload.success===true)
                                    return {type:1, msg: action.payload.msg};
                                    break;
        case EMAIL_VERIFICATION: return {type:1, msg: action.payload.msg};
        default: return state;   
    }
}