import _ from "lodash";
export default function({dispatch}){
    return next=>action=>{
        if(action.originAPI){
            _.forIn(action.payload.data, (value, key)=>{
                action.payload[key] = value;
            });
            return next(action);
        }
        return next(action);
    }
}