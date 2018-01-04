import {TRANSLATE,
        TRANSLATE_PREFERENCES,
        UPDATE_TRANSLATE_PREFERENCES_TO,
        UPDATE_TRANSLATE_PREFERENCES_FROM} from "../actions/types";
import _ from "lodash"

export function translateReducer(state={}, action){
    switch (action.type) {
        case TRANSLATE: return {text:action.payload.text, audioSrc:action.payload.audioSrc ,from:action.payload.from}
        default: return state;
    }
}

export function translatePreferencesReducer(state={}, action){
    switch (action.type) {
        case TRANSLATE_PREFERENCES: const obj = JSON.parse(action.payload.msg);
                                    if(!obj)
                                        return state;
                                    var newState = _.clone(state)
                                    if(!newState[action.deckId])
                                        newState[action.deckId] = {}
                                    newState[action.deckId].to = obj.to;
                                    newState[action.deckId].from = obj.from;
                                    return newState;
        case UPDATE_TRANSLATE_PREFERENCES_TO: var newState3 = _.clone(state);
                                              if(!newState3[action.deckId])
                                                 newState3[action.deckId] = {}
                                              newState3[action.deckId].to = action.payload;
                                                return newState3;
        case UPDATE_TRANSLATE_PREFERENCES_FROM: var newState2 = _.clone(state);
                                                if(!newState2[action.deckId])
                                                    newState2[action.deckId] = {}
                                                newState2[action.deckId].from = action.payload;
                                                return newState2;
        default: return state;
    }
}