import {REDIRECT, ISFETCHING_DECKS_START,
    ISFETCHING_DECKS_STOP} from "../actions/types";
import _ from "lodash";

export function redirectReducer(state=null, action){
    switch (action.type) {
        case REDIRECT:  return {path: action.payload};
        default: return state;
    }
}

export function isFetchingReducer(state={}, action){
    switch (action.type) {
        case ISFETCHING_DECKS_START: var newState = _.clone(state)
                                     newState.decks = true;
                                     return newState
        case ISFETCHING_DECKS_STOP: var newState2 = _.clone(state)
                                    newState2.decks = false;
                                    return newState2
        default:                    return state;
    }
}