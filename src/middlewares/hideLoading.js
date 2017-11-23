import {hideLoading} from "../actions/alerts";

export default function({dispatch}){
    return next=>action=>{
        if(action.bigLoading){
            dispatch(hideLoading());
        }
        next(action);
    }
}