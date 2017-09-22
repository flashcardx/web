import { combineReducers } from 'redux';
import {countReducer, showNotifsReducer, getNotifsReducer} from "./reducer_notifications";
import {authReducer, signupReducer} from "./reducer_auth";
import {alertsReducer, loadingReducer} from "./reducer_alerts";
import {getUserInfoReducer, userDecksReducer} from "./reducer_user";
import {reducer as formReducer} from "redux-form";

const rootReducer = combineReducers({
  notificationCount: countReducer,
  isAuthenticated: authReducer,
  form: formReducer,
  alert: alertsReducer,
  signupMsg: signupReducer,
  showNotifs: showNotifsReducer,
  notifs: getNotifsReducer,
  user:  getUserInfoReducer,
  bigLoading: loadingReducer,
  userDecks: userDecksReducer
});

export default rootReducer;
