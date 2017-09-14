import {SIGNIN, SIGNOUT} from "../actions/types";
import _ from "lodash";

export function authReducer(state=false, action){
    const {payload} = action;
    switch (action.type) {
        case SIGNIN: if(payload.data.success == true){
                        localStorage.setItem("jwt", payload.data.token);
                        return true;
                    }
                    return false;
        case SIGNOUT: localStorage.removeItem("jwt");
                      return false;
    }
    return state;
}