const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
const controllerUtils = require("./utils");

module.exports = function(app) {

    app.get("/userPreferences", controllerUtils.requireLogin, (req, res)=>{
            requestify.get(config.apiUserPreferences,{headers:{
				"x-access-token": req.session.token
			}})
            .then(response=>{
                res.json(response.getBody());
            })
            .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });

    app.get("/toggleAutocomplete", controllerUtils.requireLogin, (req, res)=>{
            requestify.get(config.apiToggleAutocomplete,{headers:{
				"x-access-token": req.session.token
			}})
            .then(response=>{
                res.json(response.getBody());
            })
            .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });

}