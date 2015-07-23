var express = require("express");
var app = express();
var cities = require("./routes/cities");

app.set('views', __dirname+'/views');

app.use(express.static(__dirname + "/public"));

app.use('/cities', cities);


module.exports = app;
