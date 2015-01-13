var app = require('../app'),
	feature = require('../models/feature'),
	authentificator = require('../authenticator');

var featureRoute = {
	define: function(){
		feature.register(app, '/features');
		feature.methods(['get', 'post', 'put', 'delete']);		

		feature.before('post', authentificator.authenticate);
		feature.before('put', authentificator.authenticate);
		feature.before('delete', authentificator.authenticate);
	}
}

module.exports = featureRoute;
