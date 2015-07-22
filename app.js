var express = require("express");
var app = express();

app.get('/', function(request, response) {
    response.send("OK sir, you are awesome");
});

app.listen(process.env.PORT);
