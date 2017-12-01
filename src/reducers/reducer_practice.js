import {FETCH_SP_USER_CARDS, RANK_USER_CARD} from "../actions/types";

export function spCardsReducer(state=[], action){
    switch (action.type) {
        case FETCH_SP_USER_CARDS: return action.payload.cards;
        default: return state;
    }
}

export function rankCardReducer(state={}, action){
    switch (action.type) {
        case RANK_USER_CARD: return {points: action.payload.points,
                                     hit: action.payload.hit,
                                     rank: action.payload.rank};
        default: return state;
    }
}