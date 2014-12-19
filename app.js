var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose');
var fs = require('fs');

mongoose.connect('mongodb://public:public@ds027698.mongolab.com:27698/oqadu');


var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var models = fs.readdirSync('app/models');
models.forEach(function (model) {
  if (model.substr(-3) === '.js') {
    restify.serve(app, require('./app/models/'+model)(mongoose, Schema));
  }
});

var queue = {
  next: [],
  past: []
};

var sendCurrent = function(res){
  if(queue.next.length > 0){
    var id = queue.next[0];
    var user = queue[id];
    res.send(JSON.stringify(user));
  }else{
    var user = '{"default":true,"qa":{},"products":{}}';
    res.send(user);
  }
}

app.get('/queue', function(req, res){
  res.send(JSON.stringify(queue));
});
app.get('/queue/size', function(req, res){
  var s = queue.next.length -1;
  if(s<0)
    s=0;
  res.send({size : s});
});
app.get('/queue/current', function(req, res){
  sendCurrent(res);
});
app.get('/queue/clear', function(req, res){
  queue = {
    next: [],
    past: []
  };
  res.send(JSON.stringify(queue));
});
app.get('/queue/next', function(req, res){
  if(queue.next.length > 0){
    queue.past.push(queue.next.shift());
    console.log("next");
  }
  sendCurrent(res);
});

app.get('/queue/prev', function(req, res){
  if(queue.past.length > 0){
    queue.next.unshift(queue.past.pop());
    console.log("prev");
  }
  sendCurrent(res);
});

app.post('/queue/updateUser', function(req, res){
  var user = req.param('user');
  queue[user.id] = user;
  res.send("ok");
});
app.post('/queue/addUser', function(req, res){
  var user = req.param('user');
  if(queue[user.id] === undefined){
    queue[user.id] = user;
    queue.next.push(user.id);
  }
  res.send("ok");
});

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
  console.log("Express server listening on port 3000");
});
