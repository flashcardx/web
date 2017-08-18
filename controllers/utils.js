const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");

function requireLogin (req, res, next) {
  if (!req.session.token) {
    res.redirect("/home");
  } else {
    requestify.get(config.apiValidateToken + "/" + req.session.token)
    .then(response=>{
      var data = response.getBody(); 
      if(data.success == false){
          req.session.reset();      //reset cookie
          res.redirect("/home");
        }
        else{
            req.userId = data.userId; 
            next();
        }
    })
    .fail(r=>{
          req.session.reset();      //reset cookie
          res.redirect("/home");
    })
  }
};

function cleanSessionMsgs(req){
  req.session.error = undefined;
  req.session.successMsg = undefined;
  req.session.resend = undefined;
}


module.exports = {
    requireLogin: requireLogin,
    cleanSessionMsgs: cleanSessionMsgs
};
