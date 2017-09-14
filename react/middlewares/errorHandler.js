import {errorAlert} from "../actions/alerts";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI || action.success == undefined)
            return next(action);
        if(action.success == false){
            console.error("error: " + action.msg);
            next(errorAlert(action.msg));
        }
        next(action);
    }
}