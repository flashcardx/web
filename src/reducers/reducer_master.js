import {MASTER_CARD_COUNT,
    MASTER_USER_COUNT,
    MASTER_LOGINS} from "../actions/types";


function getUserInfoReducer(state={}, action){
    switch (action.type) {
       case MASTER_CARD_COUNT: var newState = {...state, ...{cardCount:action.payload.count}}
                               return newState
       case MASTER_USER_COUNT: var newState2 = {...state, ...{userCount:action.payload.count}}
                               return newState2
       case MASTER_LOGINS: var newState3 = {...state, ...{logins:action.payload.msg}}
                               return newState3
       default: return state;
    }
}

export default getUserInfoReducer;


