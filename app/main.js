var restful = require('node-restful'),
    mongoose = restful.mongoose;
    app = require('./app');

mongoose.connect("mongodb://login:pwd@localhost/unjolinom");

var routes = require('./routes/index');
routes.forEach(function(route) {
  route.define();
});

app.listen(3000);
