var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");


module.exports = function(app){

    app.get("/feed", controllerUtils.requireLogin, (req, res)=>{
		var successMsg = req.session.successMsg;
		var errorMsg = req.session.error;
		controllerUtils.cleanSessionMsgs(req);
        return res.render("feed", {errorMsg: errorMsg, successMsg:successMsg});
    });

    app.get("/getFeed", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiGetFeed;
        if(req.query.last)
            url += "?last=" + req.query.last;
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