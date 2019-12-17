var db = require("./db/database");
var flights = require("./routes/flights");
var clubs = require("./routes/clubs");
var pilots = require("./routes/pilots");
var takeoffs = require("./routes/takeoffs");

var express = require("express");
var app = express();
var port = process.env.PORT || 3001;
app.listen(port);

console.log("Server is listening on " + port);

flights(app, db);
clubs(app, db);
pilots(app, db);
takeoffs(app, db);
