import {GET_USER_CARDS, MOVE_USER_CARD, CREATE_USER_CARD,
        EDIT_USER_CARD, FETCH_USER_DECKS, EDIT_USER_DECK,
        CREATE_USER_DECK, DELETE_USER_DECK, PUSH_TO_USER_DECK_PATH,
        DROP_FROM_USER_DECK_PATH, DELETE_USER_FLASHCARD, LIST_DECKS_NAME,
        GET_DECK_NAME} from "../actions/types";
import userDeckAdapter from "../adapters/userDeckAdapter.js";
import deckPathAdapter from "../adapters/deckPathAdapter.js";

export function userDecksReducer(state={}, action){
    switch (action.type) {
        case FETCH_USER_DECKS:  const newDecks = action.payload.msg;
                                const parentId = deckPathAdapter.getLastIdFromPath(action.path); 
                                return userDeckAdapter.insertDecks(state, newDecks, parentId);
        case CREATE_USER_DECK:  const newDeck = action.payload.deck;
                                return userDeckAdapter.insertNewDeck(state, newDeck, action.parentId);
        case EDIT_USER_DECK:    const editedDeck = action.payload.deck;
                                return userDeckAdapter.replaceDeck(state, editedDeck, action.parentId);
        case DELETE_USER_DECK:  return userDeckAdapter.deleteDeck(state, action.deckId);
        case DELETE_USER_FLASHCARD: return userDeckAdapter.deleteFlashcard(state, action.deckId, action.flashcardId);
        case CREATE_USER_CARD:  return userDeckAdapter.insertNewCard(state, action.payload.card, action.deckId);                     
        case EDIT_USER_CARD: return userDeckAdapter.replaceCard(state, action.payload.card, action.deckId);
        case GET_USER_CARDS:    return userDeckAdapter.insertMoreCards(state, action.payload.cards, action.deckId);
        case MOVE_USER_CARD: return userDeckAdapter.moveCard(state, action.cardId, action.oldDeckId, action.newDeckId);
    }
    return state;
}

export function userDecksPathReducer(state=[], action){
    switch (action.type) {
        case PUSH_TO_USER_DECK_PATH:
                    return deckPathAdapter.cloneAndPushOne(state, action.newPath);
        case DROP_FROM_USER_DECK_PATH:
                    const limitToDrop = state.length - action.pathLastIndex;
                    return deckPathAdapter.cloneAndDropFromRight(state, limitToDrop);
    }
    return state;
}

export function decksNameReducer(state=[], action){
    switch (action.type) {
        case LIST_DECKS_NAME: return action.payload.msg;
    }
    return state;
}

export function deckNameReducer(state=null, action){
    switch (action.type) {
        case GET_DECK_NAME: console.log("deckname: ", action.payload.msg.name);
                            return new String(action.payload.msg.name);
    }
        return state;
}
