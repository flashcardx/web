var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");
var bodyParser = require('body-parser')

module.exports = function(app){

    app.get('/', controllerUtils.requireLogin, function(req, res) {
		res.render("indexLogged", {errors: []});
	});
	
    app.delete("/card/:id", controllerUtils.requireLogin, (req,res)=>{
		requestify.delete(config.apiDeleteCard + "/" + req.params.id, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
			res.json(response.getBody());
        })
		.fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });


	app.get("/getMyCards", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetUserCards + "?limit=8";
		var last = req.query.last;
		var category = req.query.category;
		var sort = req.query.sort;
		var q = req.query.q;
		if(q)
			url += "&q=" + q;
		if(sort)
			url += "&sort=" + sort;
		if(last)
			url += "&last=" + last;
		if(category !== undefined && category !== "undefined")
			url += "&category=" + category;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
	})

	app.post("/updateCard/:id", controllerUtils.requireLogin, bodyParser.urlencoded({ extended: false }), (req, res)=>{
		var url = config.apiUpdateCard + "/" + req.params.id;
		var name = req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")// avoids html injection
		var description = req.body.description.replace(/</g, "&lt;").replace(/>/g, "&gt;")
		var category = req.body.category.replace(/</g, "&lt;").replace(/>/g, "&gt;")
		requestify.post(url, {name: name, description: description, category:category}, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				res.json(data);
			});
	});

};