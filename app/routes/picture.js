var app = require('../app');
var picture = require('../models/picture'),
authentificator = require('../authenticator');

var pictureRoute = {
	define: function(){
		picture.methods(['get', 'post', 'put', 'delete']);

		picture.before('post', authentificator.authenticate);
		picture.before('put', authentificator.authenticate);
		picture.before('delete', authentificator.authenticate);

		picture.register(app, '/pictures');
	}
}

module.exports = pictureRoute;
