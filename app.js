var express = require('express');
var app = express();
var loginController = require('./controllers/loginController');
var signupController = require('./controllers/signupController');
const myCardsController = require("./controllers/myCardsController");
const discoverController = require("./controllers/discoverController");
const createCardController = require("./controllers/createCardController");
const env = process.env.NODE_ENV || "development";
const preferencesController = require("./controllers/preferencesController");
const settingsController = require("./controllers/settingsController");
const practiceController = require("./controllers/practiceController");
const classController = require("./controllers/classController");
const feedController = require("./controllers/feedController");
const middleware = require("./middleware");

var port = process.env.PORT || 8081;
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.enable('trust proxy'); //let me see the client's ip

middleware(app);
loginController(app);
signupController(app);
myCardsController(app);
discoverController(app);
createCardController(app);
preferencesController(app);
settingsController(app);
practiceController(app);
classController(app);
feedController(app);

console.log("FlashCardX-Web Starting in port: " + port);

app.listen(port);