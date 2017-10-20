var express = require('express');
var app = express();
const env = process.env.NODE_ENV || "development";
const middleware = require("./middleware");

var port = process.env.PORT || 8081;
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.enable('trust proxy'); //let me see the client's ip

middleware(app);

console.log("FlashCardX-Web Starting in port: " + port);

app.listen(port);