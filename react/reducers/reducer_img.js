import {SEARCH_IMG, RESET_SEARCH_IMAGES, IMAGE_PROXY, DELETE_IMAGE_READY} from "../actions/types";
import _ from "lodash";
import config from "../../config";
const CLOUDFRONT_URL = config.cloudfrontUrl;


export function searchImagesReducer(state=[], action){
    switch (action.type) {
        case SEARCH_IMG: return action.payload.msg;
        case RESET_SEARCH_IMAGES: return [];
    }
    return state;
}


export function imageProxyReducer(state=null, action){
    switch (action.type) {
        case IMAGE_PROXY:
                            console.log("payload: ", action.payload); 
                            if(action.payload.success == false)
                                return null;
                            const url = CLOUDFRONT_URL + action.payload.hash;
                            return {
                                    url:url,
                                    hash: action.payload.hash,
                                    width: action.width,
                                    height: action.height,
                                    x:0,
                                    y:0
                            }
        case DELETE_IMAGE_READY: return null;
    }

    return state;
}