var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");

module.exports = function(app){

    app.get('/', controllerUtils.requireLogin, function(req, res) {
		var errors = [];
		requestify.get(config.apiGetUserCards, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
			const data = response.getBody();
			var cards = [];
			if(!data.success)
				errors.push(data.msg);
			else
				cards = data.msg;
			res.render("indexLogged", {cards:cards, errors: errors, imgUrl:config.apiGetImg});
		}).fail(response=> {
			const errorCode = response.getCode();
			console.log("error code: " + errorCode);
			errors.push("API got error code: " + errorCode);
			res.render("indexLogged", {cards:[], errors: errors, imgUrl:config.apiGetImg}); // Some error code such as, for example, 404
		});
	});
	
    app.delete("/card/:id", controllerUtils.requireLogin, (req,res)=>{
		requestify.delete(config.apiDeleteCard + "/" + req.params.id, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
			res.json(response.getBody());
        });
    });

};