var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
const controllerUtils = require("./utils");


module.exports = function(app){

    app.get("/create", controllerUtils.requireLogin, csrfProtection, (req, res)=>{
        res.render("createCard", {errors:[], success:"", csrfToken:req.csrfToken()});
    });

    app.post("/create", controllerUtils.requireLogin, parseForm,csrfProtection, (req, res)=>{
        var urls = [];
        var errors = [];
        if(req.body.img1)
            urls.push(req.body.img1);
        if(req.body.img2)
            urls.push(req.body.img2);
        if(req.body.img3)
            urls.push(req.body.img3);
        var card = {
            name: req.body.name,
            description: req.body.description,
            urls: urls
        };
        requestify.post(config.apiPostCard, card,
         {headers:{
			"x-access-token": req.session.token
		}
        }).then(response=>{
            var answer = response.getBody();
            var success = "";
            if(!answer.success)
                errors.push(answer.msg);
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

