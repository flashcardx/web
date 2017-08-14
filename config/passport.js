const env = process.env.NODE_ENV || "development";
const appRoot = require('app-root-path');
var FacebookStrategy = require('passport-facebook').Strategy;
const requestify = require("requestify");
const config = require(appRoot + "/config");
const configFbAuth = require("./keys.json")[env].fbAuth;


module.exports = function(passport) {

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


	passport.use(new FacebookStrategy({
	    clientID: configFbAuth.clientID,
	    clientSecret: configFbAuth.clientSecret,
	    callbackURL: configFbAuth.callbackURL,
        profileFields: ['id', 'emails', 'name', "picture.type(large)"],
        passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
          process.nextTick(()=>{
            var user = {
                'facebookId': profile.id
            };
            requestify.post(config.apiFbLogin, user)
            .then(response=>{
                    var r = response.getBody();
                    if (r.success === true){
                        	req.session.token = r.token;
					        return done();
                    }
                    var user = {
                            facebookId: profile.id,
                            facebookToken: accessToken,
                            name: profile.name.givenName + ' ' + profile.name.familyName,
                            email: profile.emails[0].value,
                            picture: profile.photos[0].value
                    }
                    return requestify.post(config.apiFbSignup, user);
            })
            .then(response=>{
                    var r = response.getBody();
                    if (r.success === true){
                        	req.session.token = r.token;
					        return done();
                    }
                    else{
                        req.session.error = r.msg;
                        return done(null, false, r.msg);
                    }
                    
            });
	    });
    }

	));


}