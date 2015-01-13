var app = require('../app'),
	tag = require('../models/tag'),
	authenticator = require('../authenticator');

var tagRoute = {
	define: function(){
		tag.methods(['get', 'post', 'put', 'delete']);

		tag.before('post', authenticator.authenticate);
		tag.before('put', authenticator.authenticate);
		tag.before('delete', authenticator.authenticate);

		tag.register(app, '/tags');
	}
}

module.exports = tagRoute;
