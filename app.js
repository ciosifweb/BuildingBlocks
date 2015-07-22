var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencode = bodyParser.urlencoded({extended: false});
var cities = {"Lotopia": 'City of lights',
                    "Caspiana": 'Best place to live',
                    "Indigo": 'Violet city (sort of)'};
app.use(express.static(__dirname + "/public"));

app.get('/cities', function(request, response) {
    
    response.json(cities);
});

app.post('/cities', urlencode, function(request, response){
    var newCity = request.body;
    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
});

module.exports = app;
