var app = require('../app'),
	question = require('../models/question');

var questionRoute = {
	define: function(){
		question.registers(app, '/questions');
		question.methods(['get']);		

		// custom route 
		question.route('nextQuestion',['get'] ,function(request, response, next{
			var SelectedQuestions;
			var input = request.body.tags;
			Selectedquestions = question.find({
				
				tags: {$in : input}

			}, function(){});
			if(selectedQuestions == null){
				response.status(416);
				response.send('Not any remaining questions.');
			}
			response.status(200);
			response.send(selectedQuestions[0]);
		});

	}
}

module.exports = questionRoute;
