const env = process.env.NODE_ENV || "development";
const api = require("./api.json")[env];

module.exports = {

    apiGetInitialCards: api.getInitialCards,
    apiGetImg: api.getImg,
    apiSignup: api.signup
};