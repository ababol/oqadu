var app = require('../app'),
	tag = require('../models/tag'),
	authentificator = require('../authenticator');

var tagRoute = {
	define: function(){
		tag.register(app, '/tags');
		tag.methods(['get', 'post', 'put', 'delete']);

		tag.before('post', authentificator.authenticate);
		tag.before('put', authentificator.authenticate);
		tag.before('delete', authentificator.authenticate);
	}
}

module.exports = tagRoute;



