var question = require('../models/Question'),
	authenticator = require('../authenticator');

var questionRoute = {
	define: function(app, prefixAPI) {
		question.methods(['get', 'post', 'put', 'delete']);

		question.before('post', authenticator.authenticate);
		question.before('put', authenticator.authenticate);
		question.before('delete', authenticator.authenticate);

		// custom route
		question.route('next',['get'] ,function(request, response, next){
			var selectedQuestion;
			var input = request.body.tags;

			selectedquestion = question.findOne({
				tags: {$all : input}
			}, function(){});

			if(selectedQuestion == null){
				response.status(416);
				response.send('Not any remaining questions.');
			}else{
				response.status(200);
				response.send(selectedQuestion);
			}
		});

		question.register(app, prefixAPI + '/Questions');
	}
};

module.exports = questionRoute;
