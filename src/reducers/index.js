import { combineReducers } from 'redux';
import {countReducer, showNotifsReducer, getNotifsReducer} from "./reducer_notifications";
import {authReducer, signupReducer} from "./reducer_auth";
import {alertsReducer, loadingReducer} from "./reducer_alerts";
import {getUserInfoReducer} from "./reducer_user";
import {userDecksReducer,
        userDecksPathReducer,
        decksNameReducer,
        deckNameReducer} from "./reducer_deck";
import masterReducer from "./reducer_master"
import {spCardsReducer, rankCardReducer} from "./reducer_practice";
import {redirectReducer} from "./reducer_util"
import {searchImagesReducer, imageProxyReducer} from "./reducer_img";
import {reducer as formReducer} from "redux-form";
import {translateReducer, translatePreferencesReducer} from "./reducer_translator";

const appReducer = combineReducers({
  notificationCount: countReducer,
  isAuthenticated: authReducer,
  form: formReducer,
  alert: alertsReducer,
  signupMsg: signupReducer,
  showNotifs: showNotifsReducer,
  notifs: getNotifsReducer,
  user: getUserInfoReducer,
  bigLoading: loadingReducer,
  userDecks: userDecksReducer,
  userDecksPath: userDecksPathReducer,
  searchImages: searchImagesReducer,
  imageReady: imageProxyReducer,
  decksName: decksNameReducer,
  deckName: deckNameReducer,
  cardsToPractice: spCardsReducer,
  practiceCardRank: rankCardReducer,
  master: masterReducer,
  redirect: redirectReducer,
  translation: translateReducer,
  translationPreferences: translatePreferencesReducer
});

const rootReducer = (state, action) => {
   if (action.type === 'SIGNOUT')//on signout we delete the store!
      state = undefined
  return appReducer(state, action);
}

export default rootReducer;
