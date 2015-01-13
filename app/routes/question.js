var app = require('../app'),
	question = require('../models/question'),
	authentificator = require('../authenticator');

var questionRoute = {
	define: function(){
		question.register(app, '/questions');
		question.methods(['get', 'post', 'put', 'delete']);	

		question.before('post', authentificator.authenticate);
		question.before('put', authentificator.authenticate);
		question.before('delete', authentificator.authenticate);

		// custom route 
		question.route('question-next',['get'] ,function(request, response, next){
			var SelectedQuestions;
			var input = request.body.tags;

			Selectedquestions = question.find({
				tags: {$all : input}
			}, function(){});

			if(selectedQuestions == null){
				response.status(416);
				response.send('Not any remaining questions.');
			}else{
				response.status(200);
				response.send(selectedQuestions[0]);
			}
		});

	}
}

module.exports = questionRoute;
