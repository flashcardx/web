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
		var successMsg = req.session.successMsg;
		var errorMsg = req.session.error;
		controllerUtils.cleanSessionMsgs(req);
        return res.render("class", {errorMsg: errorMsg, successMsg:successMsg});
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

	app.get("/classesShort", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiGetClassesShort;
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
		
	app.get("/searchClass/:q", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiSearchClass + "/" + req.params.q;
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
		
	app.get("/joinClass/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiJoinClass + "/" + req.params.classname;
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
		
	app.get("/newClass", controllerUtils.requireLogin, csrfProtection, (req, res)=>{
        return res.render("newClass1", {error:null, csrfToken:req.csrfToken()});
    });

	app.post("/newClass", controllerUtils.requireLogin, parseForm, csrfProtection, (req, res)=>{
		var Class = {
			name: req.body.name,
			description: req.body.description,
			isPrivate: false
		}
		requestify.post(config.apiNewClass, Class, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				if(data.success == true)
					return res.render("newClass2", {classname:Class.name, csrfToken:req.csrfToken()});
				else
					return res.render("newClass1", {error:"Could not create class", csrfToken:req.csrfToken()});
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.render("newClass1", {error:"server got error code: " + errorCode, csrfToken:req.csrfToken()});
			});
	});
		
	app.post("/addUserToClass", controllerUtils.requireLogin, parseForm, (req, res)=>{
		requestify.post(config.apiAddUserToClass, req.body, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				if(data.success == false){
					res.json(data);
					return Promise.resolve(null);
				}
				return Promise.resolve(1);
			})
			.then(r=>{
				if(!r)
					return Promise.resolve(null);
				var url = config.apiGetUserInfo + "/" + req.body.userEmail;
				return requestify.get(url, {headers:{
					"x-access-token": req.session.token}}) 
			})
			.then(response=>{
				if(!response)
					return;
				const data = response.getBody();
				res.json(data);					
			})
			.fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not add user to class"});
			});
    });

	app.delete("/userFromClass", controllerUtils.requireLogin, parseForm, (req, res)=>{
			requestify.delete(config.apiDeleteUserFromClass, {body: req.body, headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				var data = response.getBody();
				console.log("delete user: " + JSON.stringify(data));
				res.json(data);
			})
			.fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not delete user from class"});
			});
	});

	app.get("/finishNewClass", controllerUtils.requireLogin, (req, res)=>{
		req.session.successMsg = "Your new class was added to your list";
		res.redirect("/class");
	})
	
	
	app.get("/classSettings", controllerUtils.requireLogin, (req, res)=>{
		var classname = req.query.q;
		var userId = req.userId;
		console.log("classname: " + classname);
		res.render("classSettings", {classname:classname, userId:userId});
	})

	app.get("/classStats/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetClassStats + "/" + req.params.classname;
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
	}) 

	app.get("/classIntegrants/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetIntegrants + "/" + req.params.classname;
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
	}) 

	app.get("/deleteClass/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiDeleteClass + "/" + req.params.classname;
		requestify.delete(url, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				if(data.success == true)
					req.session.successMsg = "The class was deleted";
				else{
					logger.error("could not delete class: " + err);
					req.session.error = "Could not delete class";
				}
				res.redirect("/class");
			}).fail(response=> {
				const errorCode = response.getCode();
                console.error("server got error code " + errorCode);
				req.session.error = "Could not delete class";
				res.redirect("/class");
			});
	}) 

	app.get("/leaveClass/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiLeaveClass + "/" + req.params.classname;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				if(data.success == true)
					req.session.successMsg = "You left the class";
				else{
					logger.error("User could not leave class: " + err);
					req.session.error = "Could not leave class";
				}
				res.redirect("/class");
			}).fail(response=> {
				const errorCode = response.getCode();
                console.error("server got error code " + errorCode);
				req.session.error = "Could not leave class";
				res.redirect("/class");
			});
	}) 

	app.delete("/userFromClass", controllerUtils.requireLogin, parseForm, (req, res)=>{
		var url = config.apiRemoveUserFromClass;
		requestify.get(url, {body: req.body, headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=> {
				const errorCode = response.getCode();
                console.error("server got error code " + errorCode);
				res.json({success:false, msg: "server got error code " + errorCode});	
			});
	}) 

	app.post("/duplicateCard2Class", controllerUtils.requireLogin, parseForm, (req, res)=>{
		requestify.post(config.apiDuplicateCard2Class, req.body, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not duplicate card"});
			});
	});
  
   

}