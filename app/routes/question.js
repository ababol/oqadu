var Question = require('../models/Question'),
  authenticator = require('../authenticator');

var questionRoute = {
  define: function(app, prefixAPI) {
    Question.methods(['get', 'post', 'put', 'delete']);

    Question.before('post', authenticator.authenticate);
    Question.before('put', authenticator.authenticate);
    Question.before('delete', authenticator.authenticate);

    // custom route
    Question.route('Tags.get', function(req, res) {
      var tags = req.query.tags.split(","),
        selectedQuestion, query;

      if (tags.length === 0 || tags[0] === "") {
        query = Question.where({tags: {$size: 0}});
      } else {
        query = Question.where("tags").all(tags);
      }

      query.findOne(function(err, question) {
        if (err) {
          res.status(400);
          return res.send("Error while getting next question.<br/>" + err);
        }
        if (question === null) {
          res.status(200);
          return res.send("Not any remaining questions.");
        } else {
          res.status(200);
          return res.send(question);
        }
      });
    });

    Question.register(app, prefixAPI + '/Questions');
  }
};

module.exports = questionRoute;
