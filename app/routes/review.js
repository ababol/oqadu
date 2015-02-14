var review = require('../models/Review'),
	authenticator = require('../authenticator');

var reviewRoute = {
	define: function(app, prefixAPI) {
		review.methods(['get', 'post', 'put', 'delete']);

		review.before('post', authenticator.authenticate);
		review.before('put', authenticator.authenticate);
		review.before('delete', authenticator.authenticate);

		review.register(app, prefixAPI + '/Reviews');
	}
};

module.exports = reviewRoute;
