var app = require('../app');
var picture = require('../models/picture'),
authentificator = require('../authenticator');

var pictureRoute = {
	define: function(){
		picture.register(app, '/pictures');
		picture.methods(['get', 'post', 'put', 'delete']);	

		picture.before('post', authentificator.authenticate);
		picture.before('put', authentificator.authenticate);
		picture.before('delete', authentificator.authenticate);	
	}
}

module.exports = pictureRoute;