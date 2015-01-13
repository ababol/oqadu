var app = require('../app'),
	answer = require('../models/answer'),
	authentificator = require('../authenticator');

var answerRoute = {
	define: function(){
		answer.register(app, '/answers');
		answer.methods(['get', 'post', 'put', 'delete']);	

		answer.before('post', authentificator.authenticate);
		answer.before('put', authentificator.authenticate);
		answer.before('delete', authentificator.authenticate);
	}
}

module.exports = answerRoute;
