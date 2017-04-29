const env = process.env.NODE_ENV || "development";
const api = require("./api.json")[env];

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
    apiDiscoverCards: api.discoverCards
};