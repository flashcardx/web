import {NOTIFICATIONS_COUNT} from "../actions/types";
import _ from "lodash";

export function countReducer(state=0, action){
    const {payload} = action;
    switch (action.type) {
        case NOTIFICATIONS_COUNT: 
                                return payload;
    }
    return state;
}