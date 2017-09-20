import {showLoading} from "../actions/alerts";

export default function({dispatch}){
    return next=>action=>{
        if(action.bigLoading){
            dispatch(showLoading());
        }
        next(action);
    }
}