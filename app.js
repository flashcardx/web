var express = require('express');
var app = express();

var indexController = require('./controllers/indexController');
var loginController = require('./controllers/loginController');

var port = process.env.PORT || 8081;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

indexController(app);
loginController(app);
console.log("FlashCardX-Web Starting in port: " + port);

app.listen(port);