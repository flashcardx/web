var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var langs = undefined;
module.exports = function(app) {
	

	app.get('/signup', csrfProtection, function(req, res) {
		if(langs)
			res.render("signup", {data:{success:true}, langs:langs, csrfToken:req.csrfToken()});
		else
			requestify.get(config.apiGetLangs).then(response=>{
					langs = response.getBody();
					res.render("signup", {data:{success:true}, langs:langs, csrfToken:req.csrfToken()});
			});
	});
	
	app.post("/signup",parseForm, csrfProtection,(req, res)=>{

			if(req.body.password != req.body.password2){
				res.render("signup", {data:{success:false, errorCode:0,msg:"Both passwords are different, when should be the same!"}, langs:langs, csrfToken:req.csrfToken()});
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
					if(langs)
						res.render("signup",{ data: response.getBody(), langs:langs , csrfToken:req.csrfToken()});
					else
						requestify.get(config.apiGetLangs).then(response=>{
								langs = response.getBody();
								res.render("signup",{ data: response.getBody(), langs:langs , csrfToken:req.csrfToken()});
						});
				});
			}
	});
	
	app.get("/email-verification/:id", csrfProtection,(req,res)=>{
		const url = config.apiEmailVerification + "/" + req.params.id;
		requestify.get(url).then(response=>{
			if(langs)
				res.render("signup",{ data: response.getBody(), langs:langs , csrfToken:req.csrfToken()});
			else
				requestify.get(config.apiGetLangs).then(response2=>{
					langs = response2.getBody();
					res.render("signup",{ data: response.getBody(), langs:langs , csrfToken:req.csrfToken()});
			});
		});
	});

	app.get("/resend-email", (req, res)=>{
		requestify.get(config.apiResendEmailVerification + "/" +req.session.email).then(response=>{
			 res.json(response.getBody());
		});
	});

	

}