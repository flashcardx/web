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
                        limits: { fileSize: 1600000 } });

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
            imgs.push({
                url: req.body.img1,
                width: req.body.width1,
                height: req.body.height1
            });
        }
        else if(req.files["fileInput1"]){
            console.log("file1: " + req.files["fileInput1"][0]);
        }
        if(req.body.img2){
            imgs.push({
                url: req.body.img2,
                width: req.body.width2,
                height: req.body.height2
            });
        }
         else if(req.files["fileInput2"]){
            console.log("file2: " + req.files["fileInput2"]);
        }
        if(req.body.img3){
            imgs.push({
                url: req.body.img3,
                width: req.body.width3,
                height: req.body.height3
            });
        }
         else if(req.files["fileInput3"]){
            console.log("file3: " + req.files["fileInput3"]);
        }
        var card = {
            name: req.body.name,
            description: req.body.description,
            imgs: imgs
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

}

