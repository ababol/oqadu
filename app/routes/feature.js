var app = require('../app'),
	feature = require('../models/feature'),
	authentificator = require('../authenticator');

var featureRoute = {
	define: function(){
		feature.methods(['get', 'post', 'put', 'delete']);

		feature.before('post', authentificator.authenticate);
		feature.before('put', authentificator.authenticate);
		feature.before('delete', authentificator.authenticate);

		feature.register(app, '/features');
	}
}

module.exports = featureRoute;
