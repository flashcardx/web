import {FETCH_USER_DECKS, CREATE_USER_DECK} from "../actions/types";
import _ from "lodash";

export function userDecksReducer(state={}, action){
    switch (action.type) {
        case FETCH_USER_DECKS:  const r = action.payload.msg;
                                var newDecks = {};
                                r.forEach(v=>{
                                    newDecks[v._id] = v;
                                });
                                console.log("path:, ", action.path);
                                if(_.isEmpty(action.path))
                                    return {...state, ...newDecks};
                                var newState = _.cloneDeep(state);
                                return newState;  
        case CREATE_USER_DECK: console.log("payload: ", action.payload);
                               const newDeck = action.payload.deck;
                               const o = {};
                               o[newDeck._id] = newDeck;
                               return {...state, ...o};
                                
                               
    }
    return state;
}
