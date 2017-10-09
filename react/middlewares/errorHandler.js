import {errorAlert, infoAlert} from "../actions/alerts";
import {SIGNOUT} from "../actions/types";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI || action.payload.success == undefined)
            return next(action);
        if(action.payload.success == false){
            console.error("error: ", action.payload.msg);
            if(action.payload.errorCode == 1)
                return dispatch({type:SIGNOUT});
            var msg = (action.customErrorMsg)? action.customErrorMsg : action.payload.msg;   
            if(action.showErrorAsWarning)
                next(infoAlert(msg));
            else
                next(errorAlert(msg));
        }
        next(action);
    }
}