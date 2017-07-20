var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");


module.exports = function(app){

    app.get("/class", controllerUtils.requireLogin, (req, res)=>{
        return res.render("class");
    });

    app.get("/activity", controllerUtils.requireLogin, (req, res)=>{
        console.log("page: "+ req.query.page);
		var url = config.apiGetActivity + "?page=" + req.query.page;
		console.log("url: " + url);
		requestify.get(url, {headers:{
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

      app.get("/activityCount", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiGetActivityCount;
		requestify.get(url, {headers:{
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

	app.get("/classes", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiGetClasses;
		requestify.get(url, {headers:{
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


    

  
   

}