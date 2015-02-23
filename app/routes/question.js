var Question = require('../models/Question'),
  Product = require('../models/Product'),
  authenticator = require('../authenticator'),
  Q = require('q'),
  maxReco = 5;


function checkAnswer(tags) {
  var deferred = Q.defer();

  if (tags.length === 0) {
    return deferred.resolve("Valid answer");
  }

  Product.where("tags").all(tags).count(function(err, productCount) {
    if(productCount > 0){
      return deferred.resolve("Valid answer");
    }
    else{
      return deferred.resolve("Invalid answer");
    }
  });

  return deferred.promise;
}

function checkRecommendation(tags) {
  var deferred = Q.defer();

  if (tags.length === 0) {
    return deferred.resolve("Get More Questions");
  }

  Product.where("tags").in(tags).count(function(err, products) {
    if (products < maxReco) {
      return deferred.reject("Moins de " + maxReco + " reco!");
    }
    Product.where("tags").all(tags).count(function(err, products) {
      if (products < maxReco) {
        return deferred.reject("Moins de " + maxReco + " reco!");
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
          qIds = req.body.qIds,
          query;

      Q.when(checkRecommendation(tags))
      .then(function() {
        if ((tags.length === 0) || (tags.length === 1 && tags[0] === "")) {
          query = Question.where({tags: {$size: 0}});
        } else {
          query = Question.where("tags").all(tags).nin("_id", qIds);
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
            var promises = [];

            question.answers.forEach(function(answer) {
              promises.push(checkAnswer(tags.concat(answer.tags)));
            });

            Q.all(promises)
            .then(function(data) {
              data.forEach(function (answer, index) {
                if (answer === "Invalid answer") {
                  question.answers.splice(index, 1);
                }
              });
              return question;
            })
            .then(function(filteredQ) {
              if (filteredQ.answers.length > 1) {
                res.status(200);
                return res.send(question);
              }
              else {
                res.status(204);
                return res.send(question._id);
              }
            });

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
