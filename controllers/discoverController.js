var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");


module.exports = function(app){

    app.get("/discover", controllerUtils.requireLogin, (req, res)=>{

        requestify.get(config.apiDiscoverCards, {headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
			const data = response.getBody();
			const error = req.session.error;
			controllerUtils.cleanSessionMsgs(req);
			var cards = [];
			var errors = [];
			if(!data.success)
				errors.push(data.msg);
			else
				cards = data.msg;
			if(error)
				errors.push(error);
			res.render('discover', {cards:cards, errors:errors, imgUrl:config.apiGetImg});		
		}).fail(response=> {
			const errorCode = response.getCode();
			console.log("error code: " + errorCode);
			errors.push("API got error code: " + errorCode);
			res.render("discover", {cards:[], errors: errors}); // Some error code such as, for example, 404
		});
    });

	app.get("/discoverClasses", controllerUtils.requireLogin, (req, res)=>{
    		return res.render('discoverClasses');		
	});
		
	app.get("/recommendClasses", controllerUtils.requireLogin, (req, res)=>{
        requestify.get(config.apiRecommendClasses, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=> {
				const errorCode = response.getCode();
                console.error("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
	});

	app.get("/getDiscoverCards", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiDiscoverCards;
		var last = req.query.last;
		if(last)
			url += "?last=" + last;
		requestify.get(url, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
				const data = response.getBody();
				res.json(data);
		})
		.fail(response=>{
			const errorCode = response.getCode();
			console.log("error code: " + errorCode);
			res.json({success:false, msg:"api got error code: " + errorCode});
		});
	})

	app.get("/duplicateCard/:id", controllerUtils.requireLogin, (req, res)=>{
		const id = req.params.id;
		var url = config.apiDuplicateCard + "/" + id;
		requestify.get(url, {headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
				const data = response.getBody();
				res.json(data);
		})
		.fail(response=>{
			const errorCode = response.getCode();
			console.log("error code: " + errorCode);
			res.json({success:false, msg:"api got error code: " + errorCode});
		});
	});

};