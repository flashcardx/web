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
  
	app.get("/class/:classname", controllerUtils.requireLogin, (req, res)=>{
		var classname = req.params.classname;
		var url = config.apiGetClassThumbnail + classname;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				if(data.success == "false")
						return res.render("classCollection", {classname: classname, errorMsg:"could not get class picture"});	
				return res.render("classCollection", {classname: classname, errorMsg:undefined, thumbnail:data.msg.thumbnail});
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.render("classCollection", {classname: classname, errorMsg:"could not get class picture"});	
			});
    });
   
	app.get("/classCategories/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetClassCategories + "/" + req.params.classname;
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

	app.post("/classImg/:classname", controllerUtils.requireLogin, upload.single('fileInput'),
	multerErrorHandler,
	(req, res)=>{
		if(req.session.error){
			var error = req.session.error;
			controllerUtils.cleanSessionMsgs(req);
			return res.json({success:false, msg: error});
		}
		var url = config.apiUploadClassProfileImage +"/" + req.params.classname;
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

	app.delete("/classImg/:classname", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiDeleteClassProfileImage +"/" + req.params.classname;
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

	
	app.get("/class/:classname/connect", controllerUtils.requireLogin, (req, res)=>{
		var classname = req.params.classname;
		var userId = req.userId;
		var url = config.apiGetClassThumbnail + classname;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				if(data.success == "false")
						return res.render("classConnect", {classname: classname, errorMsg:"could not get class picture", userId:userId});	
				return res.render("classConnect", {classname: classname, errorMsg:undefined, thumbnail:data.msg.thumbnail, userId:userId});
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.render("classConnect", {classname: classname, errorMsg:"could not get class picture", userId:userId});	
			});
	});
	
	app.post("/classConnect/post/:classname", controllerUtils.requireLogin, parseForm, (req, res)=>{
        var userId = req.userId;
		var url = config.apiClassConnectPost + req.params.classname;
		requestify.post(url, req.body, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not publish post"});
			});
		
	});
		
	app.get("/class/posts/:classname", controllerUtils.requireLogin, (req, res)=>{
		var classname = req.params.classname;
		var userId = req.userId;
		var lastId = req.query.last
		var url = config.apiGetClassPosts + classname;
		if(lastId)
			url += "?last=" + lastId;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				return res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json(data);	
			});
	});

	app.post("/class/commentPost/:classname", controllerUtils.requireLogin, parseForm, (req, res)=>{
        var userId = req.userId;
		var url = config.apiClassCommentPost + req.params.classname;
		requestify.post(url, req.body, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not publish comment"});
			});
	});

	app.post("/class/postReaction/:classname", controllerUtils.requireLogin, parseForm, (req, res)=>{
        var userId = req.userId;
		var url = config.apiClassPostReaction + req.params.classname;
		requestify.post(url, req.body, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not publish reaction"});
			});
	});

	app.post("/class/commentReaction/:classname", controllerUtils.requireLogin, parseForm, (req, res)=>{
		var userId = req.userId;
		var url = config.apiClassCommentReaction + req.params.classname;
		requestify.post(url, req.body, {headers:{
				"x-access-token": req.session.token
			}}).then(response=>{
				const data = response.getBody();
				res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json({success:false, msg:"Could not publish reaction"});
			});
	});

	app.get("/class/postReactions/:postId", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetPostReactions + req.params.postId;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				return res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json(data);	
			});
	});

	app.get("/class/commentReactions/:postId/:commentId", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetCommentReactions + req.params.postId+"/"+req.params.commentId;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				return res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json(data);	
			});
	});

	app.get("/class/postReactionDetail/:postId/:reaction", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetPostReactionDetail + req.params.postId + "/" +req.params.reaction;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				return res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json(data);	
			});
	});

	app.get("/class/commentReactionDetail/:postId/:commentId/:reaction", controllerUtils.requireLogin, (req, res)=>{
		var url = config.apiGetCommentReactionDetail + req.params.postId +"/" +req.params.commentId+ "/" +req.params.reaction;
		requestify.get(url, {headers:{
				"x-access-token": req.session.token
			}})
			.then(response=>{
				const data = response.getBody();
				return res.json(data);
			}).fail(response=>{
				const errorCode = response.getCode();
				console.error("server got error code " + errorCode);
				return res.json(data);	
			});
	});


	app.get("/class/comments/:postId", controllerUtils.requireLogin, (req, res)=>{
		var postId = req.params.postId; 
        var skip = req.query.skip;
        var limit = req.query.limit;
		var url = config.apiGetComments + req.params.postId+"?skip="+skip+"&limit="+limit;
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