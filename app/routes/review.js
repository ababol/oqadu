var app = require('../app'),
	review = require('../models/review');

var reviewRoute = {
	define: function(){
		review.register(app, '/reviews');
		review.methods(['get']);		
	}
}

module.exports = reviewRoute;
