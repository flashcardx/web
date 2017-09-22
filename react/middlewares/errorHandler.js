import {errorAlert} from "../actions/alerts";
import {SIGNOUT} from "../actions/types";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI || action.payload.success == undefined)
            return next(action);
        if(action.payload.success == false){
            console.error("error: ", action.payload.msg);
            if(action.payload.errorCode == 1)
                return dispatch({type:SIGNOUT});
            next(errorAlert(action.payload.msg));
        }
        next(action);
    }
}