import {USER_INFO, FETCH_USER_DECKS} from "../actions/types";
import _ from "lodash";


export function getUserInfoReducer(state=null, action){
    switch (action.type) {
        case USER_INFO: return action.payload.msg;
    }
    return state;
}

export function userDecksReducer(state={}, action){
    switch (action.type) {
        case FETCH_USER_DECKS:  console.log("got: ",action.payload);
                                const r = action.payload.msg;
                                console.log("r", r);
                                var newDecks = {};
                                r.forEach(v=>{
                                    newDecks[v._id] = v;
                                });
                                if(_.isEmpty(action.path)){
                                    return {...state, ...newDecks};
                                }
                                var newState = _.cloneDeep(state);
                                return newState;  
    }
    return state;
}