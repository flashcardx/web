const env = process.env.NODE_ENV || "development";
const api = require("./api.json")[env];
const fbAuth = require("./fbAuth.json")[env];

module.exports = {

    apiGetInitialCards: api.getInitialCards,
    apiGetImg: api.getImg,
    apiSignup: api.signup,
    apiGetLangs: api.getLangs,
    apiEmailVerification: api.emailVerification,
    apiResendEmailVerification: api.resendEmailVerification,
    apiLogin: api.login,
    apiGetUserCards: api.getUserCards,
    apiValidateToken: api.validateToken,
    apiDeleteCard: api.deleteCard,
    apiSearchImage: api.searchImage,
    apiPostCard: api.postCard,
    apiDiscoverCards: api.discoverCards,
    apiDuplicateCard: api.duplicateCard,
    apiUserPreferences: api.userPreferences,
    apiToggleAutocomplete: api.toggleAutocomplete,
    apiExamples: api.examples,
    apiDefine: api.define,
    apiUpdateCard: api.updateCard,
    apiGetCategories: api.getCategories,
    apiGetUserPlan: api.getUserPlan,
    apiGetUserLang: api.getUserLang,
    apiUpdateUserLang: api.updateUserLang,
    apiFbLogin: api.fbLogin,
    apiFbSignup: api.fbSignup,
    fbAuthId: fbAuth.clientID,
    fbAuthSecret: fbAuth.clientSecret,
    fbAuthCallbackUrl: fbAuth.callbackURL,
    apiGetPracticeCards: api.getPracticeCards,
    apiRankCard: api.rankCard,
    apiSuggest: api.suggest,
    apiGetUserInfo: api.getUserInfo,
    apiGetActivity: api.getActivity,
    apiGetActivityCount: api.getActivityCount,
    apiGetClasses: api.getClasses,
    apiGetClassesShort: api.getClassesShort,
    apiSearchClass: api.searchClass,
    apiRecommendClasses: api.recommendClasses,
    apiJoinClass: api.joinClass,
    apiNewClass: api.newClass,
    apiAddUserToClass: api.addUserToClass,
    apiDeleteUserFromClass: api.deleteUserFromClass,
    apiGetClassStats: api.getClassStats,
    apiGetIntegrants: api.getIntegrants,
    apiDeleteClass: api.deleteClass,
    apiLeaveClass: api.leaveClass,
    apiRemoveUserFromClass: api.removeUserFromClass,
    apiDuplicateCard2Class: api.duplicateCard2Class,
    apiGetClassCategories: api.getClassCategories,
    apiGetClassCards: api.getClassCards,
    apiUpdateCardClass: api.updateCardClass,
    apiDeleteClassCard: api.deleteClassCard,
    apiDuplicateCardClassUser: api.duplicateCardClassUser,
    apiGetFeed: api.getFeed,
    apiUploadClassProfileImage: api.uploadClassProfileImage,
    apiDeleteClassProfileImage: api.deleteClassProfileImage 
};