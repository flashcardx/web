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
        req.session.error = "File size is too large and can not be updated";
        return res.redirect("/create");
    }
    next();

}

module.exports = function(app){

    app.get("/create", controllerUtils.requireLogin, csrfProtection, (req, res)=>{
        var errors = [];
        if(req.session.error){
            errors.push(req.session.error);
            controllerUtils.cleanSessionMsgs(req);
        }
        res.render("createCard", {errors:errors, success:"", csrfToken:req.csrfToken()});
    });


    app.post("/create", controllerUtils.requireLogin, upload.fields([{ name: 'fileInput1', maxCount: 1 }, { name: 'fileInput2', maxCount: 2 }, { name: 'fileInput3', maxCount: 1 }]),multerErrorHandler, csrfProtection, (req, res)=>{
        var imgs = [];
        var errors = [];
        if(req.body.img1){
            console.log("1img");
            imgs.push({
                url: req.body.img1,
                width: req.body.width1,
                height: req.body.height1,
                
            });
        }
        else if(req.files["fileInput1"]){
             console.log("1file");
             imgs.push({
                width: req.body.width1,
                height: req.body.height1,
                name: req.files["fileInput1"][0].originalname,
                data: req.files["fileInput1"][0].buffer
            });
        }
        if(req.body.img2){
            console.log("2img");
            imgs.push({
                url: req.body.img2,
                width: req.body.width2,
                height: req.body.height2
            });
        }
         else if(req.files["fileInput2"]){
            console.log("2file");
            imgs.push({
                width: req.body.width2,
                height: req.body.height2,
                name: req.files["fileInput2"][0].originalname,
                data: req.files["fileInput2"][0].buffer
            });
        }
        if(req.body.img3){
            imgs.push({
                url: req.body.img3,
                width: req.body.width3,
                height: req.body.height3
            });
        }
         else if(req.files["fileInput3"]){
            imgs.push({
                width: req.body.width3,
                height: req.body.height3,
                name: req.files["fileInput3"][0].originalname,
                data: req.files["fileInput3"][0].buffer
            });
        }
        var card = {
            name: req.body.name.replace(/</g, "&lt;").replace(/>/g, "&gt;"),// avoids html injection
            description: req.body.description.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            imgs: imgs,
            category: req.body.category
        };
        requestify.post(config.apiPostCard, card,
         {headers:{
			"x-access-token": req.session.token
		}
        }).then(response=>{
            var answer = response.getBody();
            var success = "";
            if(answer.success === false){
                errors.push(answer.msg);
            }
            else{
                success = answer.msg;
            }
           
            res.render("createCard", {errors:errors,success:success, csrfToken:req.csrfToken()});
        });
    });

    app.get("/search/:parameter", controllerUtils.requireLogin, (req, res)=>{
        var page = 1;
        if(req.query.page)
            page = req.query.page;
        const parameter = req.params.parameter;
        requestify.get(config.apiSearchImage + "/" + parameter +"/?page=" + page,
         {headers:{
			"x-access-token": req.session.token
		}})
            .then(
                response=>{
                        return res.json(response.getBody());
                }
            );
        });

    app.get("/examples/:word", controllerUtils.requireLogin, (req, res)=>{
        const url = config.apiExamples + "/" + req.params.word;
        requestify.get(url, {headers:{
                "x-access-token": req.session.token
            }})
                .then(
                    response=>{
                            return res.json(response.getBody());
                    }
                );
        });

    app.get("/categories", controllerUtils.requireLogin, (req, res)=>{
        var url = config.apiGetCategories;
        requestify.get(url, {headers:{
                "x-access-token": req.session.token
            }})
                .then(
                    response=>{
                            return res.json(response.getBody());
                    }
                );
    });

}

