var app = require('../app'),
	question = require('../models/question');

var questionRoute = {
	define: function(){
		question.registers(app, '/questions');
		question.methods(['get']);		

		// custom route 
		question.route('nextQuestion',['get'] ,function(request, result, next{
			var SelectedQuestions;
			var input = request.body.tags;
			Selectedquestions = question.find({
				
				tags: {$in : input}

			}, function(){});
			if(selectedQuestions == null){
				result.error('416: Requested Range Not Satisfiable');
			}
			result.send(selectedQuestions[0]);
		});

	}
}

module.exports = questionRoute;
