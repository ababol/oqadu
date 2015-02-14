var feature = require('../models/Feature'),
	authenticator = require('../authenticator');

var featureRoute = {
	define: function(app, prefixAPI) {
		feature.methods(['get', 'post', 'put', 'delete']);

		feature.before('post', authenticator.authenticate);
		feature.before('put', authenticator.authenticate);
		feature.before('delete', authenticator.authenticate);

		feature.register(app, prefixAPI + '/Features');
	}
};

module.exports = featureRoute;
