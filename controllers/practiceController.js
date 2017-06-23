var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");
var bodyParser = require('body-parser')

module.exports = function(app){

    app.get("/practice", controllerUtils.requireLogin, (req, res)=>{
        res.render("practice");
    });

    app.get("/practiceCards", controllerUtils.requireLogin, (req, res)=>{
        requestify.get(config.apiGetPracticeCards, {headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
            return res.json(response.getBody());
        })
        .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });

    app.get("/rankCard/:cardId/:mark", controllerUtils.requireLogin, (req, res)=>{
        var cardId = req.params.cardId;
        var mark = req.params.mark;
        requestify.post(config.apiRankCard +"/"+cardId, {mark: mark}, {headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
            return res.json(response.getBody());
        })
         .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });


}