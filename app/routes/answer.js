var app = require('../app'),
	answer = require('../models/answer');

var answerRoute = {
	define: function(){
		answer.register(app, '/answers');
		answer.methods(['get']);		
	}
}

module.exports = answerRoute;
