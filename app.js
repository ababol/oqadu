var restful = require('node-restful'),
    mongoose = restful.mongoose,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    express = require('express'),
    http = require('http');

mongoose.connect('mongodb://public:public@ds045027.mongolab.com:45027/oqadu2');

app = express();

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

var routes = require('./app/routes/index');
routes.forEach(function(route) {
  route.define(app, "/api/v2");
});

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
  console.log("Express server listening on port 3000");
});
