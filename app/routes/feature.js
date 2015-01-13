var app = require('../app'),
	feature = require('../models/feature'),
	authenticator = require('../authenticator');

var featureRoute = {
	define: function(){
		feature.methods(['get', 'post', 'put', 'delete']);

		feature.before('post', authenticator.authenticate);
		feature.before('put', authenticator.authenticate);
		feature.before('delete', authenticator.authenticate);

		feature.register(app, '/features');
	}
}

module.exports = featureRoute;
