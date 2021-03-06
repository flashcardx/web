import {SIGNIN, SIGNUP, SIGNUP_RESEND_EMAIL, RE_SIGNIN, SIGNOUT, EMAIL_VERIFICATION} from "../actions/types";

export function authReducer(state=false, action){
    const {payload} = action;
    switch (action.type) {
        case SIGNIN:   if(action.fbAccessToken)
                             localStorage.setItem("fbAcessToken", action.accessToken);
                       localStorage.setItem("jwt", payload.token);
                       return true;
        case RE_SIGNIN: return true;
        case SIGNOUT: if(localStorage.getItem("fbAcessToken") && window.FB){
                            window.FB.logout();
                            localStorage.removeItem("fbAcessToken")
                        }  
                      localStorage.removeItem("jwt");
                      return false;
        default: return state;   
    }
}

export function signupReducer(state=null, action){
    switch(action.type){ 
        case SIGNUP: if(action.payload.success===true && !action.payload.code)
                        return {type:1, msg: action.payload.msg};
                     if(action.payload.code === 5)
                        return {type:2, email:action.payload.email, msg: action.payload.msg};
                     break;
        case SIGNUP_RESEND_EMAIL: if(action.payload.success===true)
                                    return {type:1, msg: action.payload.msg};
                                  break;
        case EMAIL_VERIFICATION:if(action.payload.success===true) 
                                    return {type:3, msg: action.payload.msg};
                                break;
        default: return state;   
    }
}