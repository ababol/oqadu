var app = require('../app'),
	product = require('../models/product');

var productRoute = {
	define: function(){
		product.registers(app, '/products');
		product.methods(['get']);		

		// custom route
		product.route('recommendations', {

			//TODO

		});

	}
}

module.exports = productRoute;
