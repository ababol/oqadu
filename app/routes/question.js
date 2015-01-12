var app = require('../app'),
	question = require('../models/question');

var questionRoute = {
	define: function(){
		question.registers(app, '/questions');
		question.methods(['get']);		

		// custom route 
		question.route('question-next',['get'] ,function(request, response, next{
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
