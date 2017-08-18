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
            requestify.request(config.apiFbLogin, {method:"post",
                headers:{"x-secret-token":config.apiSecret},
                body: user})
            .then(response=>{
                    var r = response.getBody();
                    console.log("got back with: " + JSON.stringify(r));
                    if (r.success == true){
                        	req.session.token = r.token;
				return done();
                    }
                    if(r.code==0){
                        var user = {
                                facebookId: profile.id,
                                facebookToken: accessToken,
                                name: profile.name.givenName + ' ' + profile.name.familyName,
                                email: profile.emails[0].value,
                                picture: profile.photos[0].value
                        }
                        return requestify.post(config.apiFbSignup, user);
                    }
                    req.session.error = "internal error please contact support, detail: " + r.msg;
                    return done(null, false, r.msg);
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