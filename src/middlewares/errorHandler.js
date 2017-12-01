import {errorAlert, infoAlert} from "../actions/alerts";
import {SIGNOUT} from "../actions/types";
import {errorCodes} from "../api_config";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI || action.payload.success === undefined)
            return next(action);
        if(action.payload.success === false){
            console.error("error(errorhandler mdw): ", action.payload.msg);
            if(action.payload.code === 1)
                return dispatch({type:SIGNOUT});
            var msg;
            if(!action.customErrorMsg && action.payload.code){
                msg = extractMsg(action.payload.code);
            }
            else
                 msg = (action.customErrorMsg)? action.customErrorMsg : action.payload.msg;   
            if(action.showErrorAsWarning)
                return next(infoAlert(msg));
            else
                return next(errorAlert(msg));
        }
        next(action);
    }
}

function extractMsg(code){
    if(!errorCodes[code])
        return null;
    return errorCodes[code].es;
}