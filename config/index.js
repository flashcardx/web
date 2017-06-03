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
    apiUpdateCard: api.updateCard,
    apiGetCategories: api.getCategories,
    apiGetUserPlan: api.getUserPlan,
    apiGetUserLang: api.getUserLang,
    apiUpdateUserLang: api.updateUserLang,
    apiFbLogin: api.fbLogin,
    apiFbSignup: api.fbSignup,
    fbAuthId: fbAuth.clientID,
    fbAuthSecret: fbAuth.clientSecret,
    fbAuthCallbackUrl: fbAuth.callbackURL
};