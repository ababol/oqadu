var User = require('../models/User'),
  authenticator = require('../authenticator');

var userRoute = {
  define: function(app, prefixAPI) {
    User.methods(['get', 'post']);

    User.before('post', authenticator.authenticate);

    // custom route
    User.route('Login.post', function(req, res) {
      var username = req.body.username,
          password = authenticator.hash(req.body.password),
          query = User.where({username: username, password: password, rank: 1});

      query.findOne(function(err, user) {
        if (err) {
          res.status(500);
          return res.send("Authentification Error!");
        }
        if (user === null) {
          res.status(401);
          return res.send("Authentification failure!");
        } else {
          res.status(200);
          return res.send(user);
        }
      });
    });

    User.register(app, prefixAPI + '/Users');
  }
};

module.exports = userRoute;
