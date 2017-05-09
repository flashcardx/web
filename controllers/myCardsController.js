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
		res.render("indexLogged", {errors: []});
	});
	
    app.delete("/card/:id", controllerUtils.requireLogin, (req,res)=>{
		requestify.delete(config.apiDeleteCard + "/" + req.params.id, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
			res.json(response.getBody());
        });
    });


	app.get("/getMyCards", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetUserCards + "?limit=8";
		var last = req.query.last;
		if(last)
			url += "&last=" + last;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=> {
				const errorCode = response.getCode();
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
	})

};