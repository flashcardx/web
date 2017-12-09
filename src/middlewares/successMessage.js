import {successAlert} from "../actions/alerts";

export default function({dispatch}){
    return next=>action=>{
        if(!action.originAPI)
            return next(action);
        if(action.successMsg && action.payload.success)
            next(successAlert(action.successMsg));
        next(action);
    }
}