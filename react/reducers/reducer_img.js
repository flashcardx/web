import {SEARCH_IMG, RESET_SEARCH_IMAGES, IMAGE_PROXY, DELETE_IMAGE_READY} from "../actions/types";
import _ from "lodash";
import config from "../../config";

export function searchImagesReducer(state=[], action){
    switch (action.type) {
        case SEARCH_IMG: return action.payload.msg;
        case RESET_SEARCH_IMAGES: return [];
    }
    return state;
}


export function imageProxyReducer(state=null, action){
    switch (action.type) {
        case IMAGE_PROXY:   if(action.payload.success == false)
                                return null;
                            return {
                                    src: action.payload.src,
                                    hash: action.payload.hash,
                                    width: action.width,
                                    height: action.height
                            }
        case DELETE_IMAGE_READY: return null;
    }

    return state;
}