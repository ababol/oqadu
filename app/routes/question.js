var Question = require('../models/Question'),
  Product = require('../models/Product'),
  authenticator = require('../authenticator'),
  Q = require('q');

function checkRecommendation(tags) {
  var deferred = Q.defer();

  if (tags.length === 0) {
    return deferred.resolve("Get More Questions");
  }

  Product.where("tags").in(tags).count(function(err, products) {
    if (products < 5) {
      return deferred.reject("Moins de 5 reco!");
    }
    Product.where("tags").all(tags).count(function(err, products) {
      if (products < 5) {
        return deferred.reject("Moins de 5 reco!");
      }
      return deferred.resolve("Get More Questions");
    });
  });

  return deferred.promise;
}

var questionRoute = {
  define: function(app, prefixAPI) {
    Question.methods(['get', 'post', 'put', 'delete']);

    Question.before('post', authenticator.authenticate);
    Question.before('put', authenticator.authenticate);
    Question.before('delete', authenticator.authenticate);

    // custom route
    Question.route('Next.post', function(req, res) {
      var tags = req.body.tags,
          qId = req.body.qId,
          query;

      Q.when(checkRecommendation(tags))
      .then(function() {
        if ((tags.length === 0) || (tags.length === 1 && tags[0] === "")) {
          query = Question.where({tags: {$size: 0}});
        } else {
          query = Question.where("tags").all(tags).nin("_id", qId);
        }

        query.findOne(function(err, question) {
          if (err) {
            res.status(400);
            return res.send("Error while getting next question.<br/>" + err);
          }
          if (question === null || question === []) {
            res.status(200);
            return res.send("Not any remaining questions.");
          } else {
            res.status(200);
            return res.send(question);
          }
        });
      })
      .catch(function() {
        res.status(200);
        return res.send("Not any remaining questions.");
      });
    });

    Question.register(app, prefixAPI + '/Questions');
  }
};

module.exports = questionRoute;
