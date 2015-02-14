var answer = require('../models/Answer'),
	authenticator = require('../authenticator');

var answerRoute = {
	define: function(app, prefixAPI) {
		answer.methods(['get', 'post', 'put', 'delete']);

		answer.before('post', authenticator.authenticate);
		answer.before('put', authenticator.authenticate);
		answer.before('delete', authenticator.authenticate);

		answer.register(app, prefixAPI + '/Answers');
	}
};

module.exports = answerRoute;
