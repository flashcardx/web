export default function({dispatch}){
    return next=>action=>{
        if(!action.payload || !action.payload.then){
            return next(action);
        }
        var {payload} = action;
        payload
            .then(r=>{
                action.payload = r;
                dispatch(action);
            })
            .catch(err=>{
                console.error(err);
            })
    }
}