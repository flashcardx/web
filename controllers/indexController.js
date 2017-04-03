var bodyParser = require('body-parser');
const appRoot = require('app-root-path');
const config = require(appRoot + "/config");
const requestify = require("requestify");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	
	app.get('/', function(req, res) {
		requestify.get(config.apiGetInitialCards).then(function(response) {
			res.render('indexNoLogged', response.getBody());
		});

	});
	
	
}