var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");

module.exports = function(app) {
	
	app.get('/home', csrfProtection, function(req, res) {
		if(req.session.token)
			return res.redirect("/");
		requestify.get(config.apiGetInitialCards).then(function(response) {
			const data = response.getBody();
			const error = req.session.error;
			var cards = [];
			var errors = [];
			if(!data.success)
				errors.push(data.msg);
			else
				cards = data.msg;
			if(error)
				errors.push(error);
			res.render('indexNoLogged', {cards:cards, errors:errors, imgUrl:config.apiGetImg, csrfTokenLogin: req.csrfToken()});		
		});
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

	
	app.get("/logout", (req, res)=>{
		req.session.reset();
		res.redirect("/home");
	});
			

	
}