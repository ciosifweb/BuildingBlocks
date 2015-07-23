var express = require("express");
var bodyParser = require("body-parser");
var urlencode = bodyParser.urlencoded({extended: false});
var redis = require("redis");
var client = redis.createClient();

client.select((process.env.NODE_ENV || "development").length);

var router = express.Router();
router.route('/')


.get(function(request, response) {
    client.hkeys('cities', function(error, cityNames) {
        if (error) throw error;
        response.json(cityNames);
    });
    
})

.post(urlencode, function(request, response){
    var newCity = request.body;
    
    if (!newCity.name || !newCity.description) {
        response.sendStatus(400);
        return false;
    }
    
    client.hset('cities', newCity.name, newCity.description, function(error) {
        response.status(201).json(newCity.name);
    });
    
});

router.route('/:name')

.delete(function(request, response) {
    client.hdel('cities', request.params.name, function(error) {
        if (error) throw error;
        response.sendStatus(204);
    });
    
})

.get(function(request, response) {
    client.hget('cities', request.params.name, function(error, description) {
       if (error) throw error;
       response.render("show.ejs", {city: 
    {name: request.params.name, description: description}});
    });
    
});

module.exports = router;
