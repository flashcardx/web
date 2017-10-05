import {SEARCH_IMG, RESET_SEARCH_IMAGES} from "../actions/types";
import _ from "lodash";


export function searchImagesReducer(state=[], action){
    switch (action.type) {
        case SEARCH_IMG: return action.payload.msg;
        case RESET_SEARCH_IMAGES: return [];
    }
    return state;
}
