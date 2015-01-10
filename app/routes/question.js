var app = require('../app'),
	question = require('../models/question');

var questionRoute = {
	define: function(){
		question.registers(app, '/questions');
		question.methods(['get', 'post', 'put', 'delete']);		

		// custom route 
		question.route('nextQuestion',['get'] ,function(request, result, next{
			var SelectedQuestions;
			var tags = request.body.tags;
			Selectedquestions = question.find({tags:tags}, function(){});
			if(selectedQuestions == null){
				result.error('416: Requested Range Not Satisfiable');
			}
			result.send(selectedQuestions[0]);
		});

	}
}

module.exports = questionRoute;
