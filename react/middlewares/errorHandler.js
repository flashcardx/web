import {errorAlert} from "../actions/alerts";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI || action.payload.success == undefined)
            return next(action);
        if(action.payload.success == false){
            console.error("error: " + action.payload.msg);
            next(errorAlert(action.payload.msg));
        }
        next(action);
    }
}