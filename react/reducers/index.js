import { combineReducers } from 'redux';
import {countReducer} from "./reducer_notifications";
import {authReducer, signupReducer} from "./reducer_auth";
import {alertsReducer} from "./reducer_alerts";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  notificationCount: countReducer,
  isAuthenticated: authReducer,
  form: formReducer,
  alert: alertsReducer,
  signupMsg: signupReducer
});

export default rootReducer;
