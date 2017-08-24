const appRoot = require('app-root-path');
const helmet = require("helmet");
const session = require('client-sessions');
const randomstring = require("randomstring");
var express = require('express');
var cookieParser = require('cookie-parser');

module.exports = app=>{

    app.use(helmet());
    app.use(session({
        cookieName: 'session',
        secret: randomstring.generate(),
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
        httpOnly: true, // dont let browser javascript access cookies ever
        secure: true, //only use cookies over https
        ephemeral: true //delete this cookie when the browser is closed
    }));

    app.use((req, res, next)=>{
        if(req.session.token){
            req.session.token = req.session.token // refresh cookie
        }
        next();
    });
    // parse cookies
    // we need this because "cookie" is true in csrfProtection
    app.use(cookieParser());
    
    app.use('/', function (req, res, next) {
        if (req.session.token) 
            return res.sendFile(appRoot+'/public/html/index.html');
        next();
    });
}