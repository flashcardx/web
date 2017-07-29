var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage,
                        limits: { fileSize: 1900000 } });

function multerErrorHandler(err, req, res, next){
    if(err && err.code === "LIMIT_FILE_SIZE"){
		console.log("limit size");
        req.session.error = "File size is too large and can not be updated";
        next();
    }
    next();
}

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
        var userPlan;
        requestify.get(config.apiGetUserPlan,{headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
            var data = response.getBody();
            if(data.success === false)
                errors.push(data.msg);
            userPlan = data;
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
            return res.render("settings", {errors:errors,success:success, data:userPlan.msg, csrfToken:req.csrfToken()});
        });
        if(req.session.error){
            errors.push(req.session.error);
            controllerUtils.cleanSessionMsgs(req);
        }
    });

    app.get("/getLangs", (req, res)=>{
        requestify.get(config.apiGetLangs)
        .then(response=>{
					langs = response.getBody();
					return res.json(langs);
			})
        .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});

    });

     app.get("/getUserLang", controllerUtils.requireLogin, (req, res)=>{
        requestify.get(config.apiGetUserLang,{headers:{
			"x-access-token": req.session.token
		}}).then(response=>{
					lang = response.getBody();
					return res.json(lang);
			})
           .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});

    });

    app.get("/getUserInfo", (req, res)=>{
        requestify.get(config.apiGetUserInfo,{headers:{
			"x-access-token": req.session.token
		}})
        .then(response=>{
                    r = response.getBody();
                    console.log("response: " + JSON.stringify(r));
					return res.json(r);
			})
        .fail(response=> {
				const errorCode = response.getCode();
                console.log("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
    });

    app.post("/userImg", controllerUtils.requireLogin, upload.single('fileInput'),
	multerErrorHandler,
	(req, res)=>{
		if(req.session.error){
			var error = req.session.error;
			controllerUtils.cleanSessionMsgs(req);
			return res.json({success:false, msg: error});
		}
		var url = config.apiChangeUserImg;
		requestify.post(url, req.file.buffer, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not change image"});
			});
    });
        
    app.delete("/userImg", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiDeleteUserProfileImage;
		requestify.delete(url, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not delete image"});
			});
	});


}