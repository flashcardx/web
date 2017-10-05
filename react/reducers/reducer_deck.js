import {FETCH_USER_DECKS, CREATE_USER_DECK, DELETE_USER_DECK, PUSH_TO_USER_DECK_PATH, DROP_FROM_USER_DECK_PATH} from "../actions/types";
import _ from "lodash";
import userDeckAdapter from "../adapters/userDeckAdapter.js";
import deckPathAdapter from "../adapters/deckPathAdapter.js";

export function userDecksReducer(state={}, action){
    switch (action.type) {
        case FETCH_USER_DECKS:  const newDecks = action.payload.msg;
                                console.log("deck reducer, path: ", action.path);
                                const parentId = deckPathAdapter.getLastIdFromPath(action.path); 
                                return userDeckAdapter.insertDecks(state, newDecks, parentId);
        case CREATE_USER_DECK:  console.log("create deck got", action.payload.msg);
                                const newDeck = action.payload.deck;
                                return userDeckAdapter.insertDecks(state, [newDeck], action.parentId);
        case DELETE_USER_DECK:  console.log("deleted deckid: ", action.deckId);
                                return userDeckAdapter.deleteDeck(state, action.deckId);
                               
    }
    return state;
}

export function userDecksPathReducer(state=[], action){
    switch (action.type) {
        case PUSH_TO_USER_DECK_PATH:
                    console.log("push to path: ", action.newPath);
                    return deckPathAdapter.cloneAndPushOne(state, action.newPath);
        case DROP_FROM_USER_DECK_PATH:
                    const limitToDrop = state.length - action.pathLastIndex;
                    return deckPathAdapter.cloneAndDropFromRight(state, limitToDrop);
    }
    return state;
}
