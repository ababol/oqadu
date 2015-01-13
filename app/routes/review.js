var app = require('../app'),
	review = require('../models/review'),
	authenticator = require('../authenticator');

var reviewRoute = {
	define: function(){
		review.methods(['get', 'post', 'put', 'delete']);

		review.before('post', authenticator.authenticate);
		review.before('put', authenticator.authenticate);
		review.before('delete', authenticator.authenticate);
		
		review.register(app, '/reviews');
	}
}

module.exports = reviewRoute;
