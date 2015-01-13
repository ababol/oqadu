var app = require('../app'),
	clientProfile = require('../models/clientProfile'),
	authentificator = require('../authenticator');

var clientProfileRoute = {
	define: function(){
		clientProfile.register(app, '/clientProfiles');
		clientProfile.methods(['get', 'post', 'put', 'delete']);

		clientProfile.before('post', authentificator.authenticate);
		clientProfile.before('put', authentificator.authenticate);
		clientProfile.before('delete', authentificator.authenticate);
	}
}

module.exports = clientProfileRoute;
