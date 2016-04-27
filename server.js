var express = require("express");
var mongoose = require("mongoose");
var bodyparse = require("body-parser");


// Db Configuration
mongoose.connect("mongodb://localhost/bookmark");


var app = express();
app.use(bodyparse.urlencoded({extended: true}));
app.use(bodyparse.json());

//Namespace matching
app.use("/api", require("./controller/routes"));

// Server config
app.listen(3000);
console.log("started listening from here");