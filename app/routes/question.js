var Question = require('../models/Question'),
  authenticator = require('../authenticator');

var questionRoute = {
  define: function(app, prefixAPI) {
    Question.methods(['get', 'post', 'put', 'delete']);

    Question.before('post', authenticator.authenticate);
    Question.before('put', authenticator.authenticate);
    Question.before('delete', authenticator.authenticate);

    // custom route
    Question.route('next', ['get'], function(request, response) {
      var input = request.body.tags,
        selectedQuestion;

      var query  = Question.where({ tags: input });
      query.findOne(function (err, question) {
        if (err) {
          response.status(400);
          return response.send("Error while getting next question.");
        }
        if (question === null) {
          response.status(416);
          return response.send("Not any remaining questions.");
        } else {
          response.status(200);
          return response.send(question);
        }
      });
    });

  Question.register(app, prefixAPI + '/Questions');
}
};

module.exports = questionRoute;
