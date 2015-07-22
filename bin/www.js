#!/usr/bin/env node

var app = require("./../app");
app.listen(process.env.PORT, function() {
    console.log("Listening on "+ process.env.PORT);
});