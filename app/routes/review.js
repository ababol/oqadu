var app = require('../app'),
	review = require('../models/review');

var reviewRoute = {
	define: function(){
		review.registers(app, '/reviews');
		review.methods(['get']);		
	}
}

module.exports = reviewRoute;
