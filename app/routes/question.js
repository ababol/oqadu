var app = require('../app'),
	question = require('../models/question');

var questionRoute = {
	define: function(){
		question.registers(app, '/questions');
		question.methods(['get', 'post', 'put', 'delete']);		

		// custom route 
		question.route('nextQuestion', {

			//TODO

		});

	}
}

module.exports = questionRoute;
