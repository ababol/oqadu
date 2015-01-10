var app = require('../app'),
	clientProfile = require('../models/clientProfile');

var clientProfileRoute = {
	define: function(){
		clientProfile.registers(app, '/clientProfiles');
		clientProfile.methods(['get', 'post', 'put', 'delete']);		
	}
}

module.exports = clientProfileRoute;
