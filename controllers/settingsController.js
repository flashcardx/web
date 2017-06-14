var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");


module.exports = function(app){

    app.get("/settings", controllerUtils.requireLogin, csrfProtection, (req, res)=>{
        var errors = [];
        requestify.get(config.apiGetUserPlan,{headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
            var data = response.getBody();
            if(data.success === false)
                errors.push(data.msg);
            return res.render("settings", {errors:errors, success:"", data:data.msg, csrfToken:req.csrfToken()});
        });
        if(req.session.error){
            errors.push(req.session.error);
            controllerUtils.cleanSessionMsgs(req);
        }
    });

      app.post("/settings", controllerUtils.requireLogin, parseForm, csrfProtection, (req, res)=>{
        var errors = [];
        var lang = req.body.lang;
        console.log("lang: " + lang);
        requestify.get(config.apiGetUserPlan,{headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
            var data = response.getBody();
            if(data.success === false)
                errors.push(data.msg);
            var url = config.apiUpdateUserLang + "/" + lang;
            return requestify.get(url, {headers:{
                "x-access-token": req.session.token
            }});
        })
        .then(response=>{
            var data = response.getBody();
            var success = "";
            if(data.success === false)
                errors.push(data.msg);
            else
                success += "Languaje updated succesfully!";
            return res.render("settings", {errors:errors,success:success, data:data.msg, csrfToken:req.csrfToken()});
        });
        if(req.session.error){
            errors.push(req.session.error);
            controllerUtils.cleanSessionMsgs(req);
        }
    });

    app.get("/getLangs", (req, res)=>{
        requestify.get(config.apiGetLangs).then(response=>{
					langs = response.getBody();
					return res.json(langs);
			});

    });

     app.get("/getUserLang", controllerUtils.requireLogin, (req, res)=>{
        requestify.get(config.apiGetUserLang,{headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
					lang = response.getBody();
					return res.json(lang);
			});

    });

}