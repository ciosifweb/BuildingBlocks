var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencode = bodyParser.urlencoded({extended: false});
var redis = require("redis");
var client = redis.createClient();

client.select((process.env.NODE_ENV || "development").length);


app.use(express.static(__dirname + "/public"));

app.get('/cities', function(request, response) {
    client.hkeys('cities', function(error, cityNames) {
        if (error) throw error;
        response.json(cityNames);
    });
    
});

app.post('/cities', urlencode, function(request, response){
    var newCity = request.body;
    client.hset('cities', newCity.name, newCity.description, function(error) {
        response.status(201).json(newCity.name);
    });
    
});

module.exports = app;
