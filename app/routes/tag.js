var app = require('../app'),
	tag = require('../models/tag'),
	authentificator = require('../authenticator');

var tagRoute = {
	define: function(){
		tag.methods(['get', 'post', 'put', 'delete']);

		tag.before('post', authentificator.authenticate);
		tag.before('put', authentificator.authenticate);
		tag.before('delete', authentificator.authenticate);

		tag.register(app, '/tags');
	}
}

module.exports = tagRoute;
