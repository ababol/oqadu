var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/bricodata');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var models = fs.readdirSync('app/models');
models.forEach(function (model) {
  if (model.substr(-3) === '.js') {
    restify.serve(app, require('./app/models/'+model)(mongoose, Schema));
  }
});

http.createServer(app).listen(3000, function() {
  console.log("Express server listening on port 3000");
});
