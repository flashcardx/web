import {ERROR_ALERT} from "../actions/types";
import _ from "lodash";

export function alertsReducer(state=null, action){
    const {payload} = action;
    switch (action.type) {
        case ERROR_ALERT:  return {msg:payload, type:"error"};
    }
    return state;
}