var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");
const passport = require('passport');
require(appRoot + "/config/passport")(passport);

module.exports = function(app) {
	
	app.get('/home', csrfProtection, function(req, res) {
		if(req.session.token)
			return res.redirect("/");
		const error = req.session.error;
		var errors = [];
		if(error)
			errors.push(error);
		var successMsg = req.session.successMsg;
		var resend = req.session.resend;
		controllerUtils.cleanSessionMsgs(req);
		res.render('indexNoLogged', {resend: resend, successMsg:successMsg, errors:errors, csrfTokenLogin: req.csrfToken()});		
	});

	app.post("/home", parseForm, (req, res)=>{
			requestify.post(config.apiLogin, {email:req.body.email, password:req.body.password}).then(function(response) {
				const data = response.getBody();
				if(!data.success){
					req.session.error = data.msg;
					res.redirect("/home"); 
				}
				else{
					req.session.token = data.token;
					res.redirect("/");
				}
			});
		});

	app.get("/getAllCards", (req, res)=>{
		var url = config.apiGetInitialCards;
		var last = req.query.last;
		if(last)
			url += "?last=" + last;
		requestify.get(url).then(response=>{
				const data = response.getBody();
				res.json(data);
		});
	})
	
	app.get("/logout", (req, res)=>{
		req.session.reset();
		res.redirect("/home");
	});
			
	app.get('/auth/facebook',passport.initialize(), passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', passport.initialize(), 
	passport.authenticate('facebook', { successRedirect: '/',
	                                    failureRedirect: '/home' }));

	
}