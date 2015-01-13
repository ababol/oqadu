var app = require('../app'),
	answer = require('../models/Answer'),
	authenticator = require('../authenticator');

var answerRoute = {
	define: function(){
		answer.methods(['get', 'post', 'put', 'delete']);

		answer.before('post', authenticator.authenticate);
		answer.before('put', authenticator.authenticate);
		answer.before('delete', authenticator.authenticate);

		answer.register(app, '/answers');
	}
}

module.exports = answerRoute;
