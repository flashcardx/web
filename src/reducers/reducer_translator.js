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

export function translatePreferencesReducer(state=null, action){
    switch (action.type) {
        case TRANSLATE_PREFERENCES: const obj = JSON.parse(action.payload.msg);
                                    if(!obj)
                                        return state;
                                    return {to:obj.to, from:obj.from};
        case UPDATE_TRANSLATE_PREFERENCES_TO: var newState = _.clone(state);
                                              if(newState)
                                                    newState.to = action.payload;
                                              return newState;
        case UPDATE_TRANSLATE_PREFERENCES_FROM: var newState = _.clone(state);
                                                if(newState)
                                                    newState.from = action.payload;
                                                return newState;
        default: return state;
    }
}