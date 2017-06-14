var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var langs = undefined;
module.exports = function(app) {
	

	
	app.post("/signup",parseForm, csrfProtection,(req, res)=>{
			if(req.body.password !== req.body.password2){
				req.session.error = "Passwords do not match!";
				res.redirect("/home");
			}
			else{
				const user = {
					email: req.body.email,
					name: req.body.name,
					lang: req.body.lang,
					password: req.body.password 
				};
				req.session.email = req.body.email; 
				requestify.post(config.apiSignup,user).then(response=>{
					var result = response.getBody();
					if(result.success)
						req.session.successMsg = result.msg;
					else{
						req.session.error = result.msg;
						if(result.errorCode === 1){
							console.log("resend");
							req.session.resend = 1;
						}
					}
					return res.redirect("/home");
				});
			}
	});
	
	app.get("/email-verification/:id", csrfProtection,(req,res)=>{
		const url = config.apiEmailVerification + "/" + req.params.id;
		req.session.reset();
		requestify.get(url).then(response=>{
			req.session.successMsg = "User registered ok, you can sign in now!"; 
			res.redirect("/home");
		});
	});

	app.get("/resend-email", (req, res)=>{
		requestify.get(config.apiResendEmailVerification + "/" +req.session.email).then(response=>{
			 res.json(response.getBody());
		});
	});

	

}