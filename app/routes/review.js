var app = require('../app'),
	review = require('../models/review'),
	authentificator = require('../authenticator');

var reviewRoute = {
	define: function(){
		review.methods(['get', 'post', 'put', 'delete']);

		review.before('post', authentificator.authenticate);
		review.before('put', authentificator.authenticate);
		review.before('delete', authentificator.authenticate);
		
		review.register(app, '/reviews');
	}
}

module.exports = reviewRoute;
