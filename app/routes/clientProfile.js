var app = require('../app'),
	clientProfile = require('../models/ClientProfile'),
	authenticator = require('../authenticator');

var clientProfileRoute = {
	define: function(){
		clientProfile.methods(['get', 'post', 'put', 'delete']);

		clientProfile.before('post', authenticator.authenticate);
		clientProfile.before('put', authenticator.authenticate);
		clientProfile.before('delete', authenticator.authenticate);

		clientProfile.register(app, '/clientProfiles');
	}
}

module.exports = clientProfileRoute;
