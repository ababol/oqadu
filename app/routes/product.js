var app = require('../app'),
	product = require('../models/product');

var productRoute = {
	define: function(){
		product.registers(app, '/products');
		product.methods(['get']);		

		// custom route
		product.route('recommendations', ['get'], function(request, response, next){
			var recommendations;
			var input = request.body.tags;
			recommendations = product.find({
				
				tags:{ $in : input}

			}, function(){});
			if(response == null){
				response.status(416);
				response.send('No product corresponds to the given tags.');
			}
			response.status(200);
			response.send(recommendations);
		});

	}
}

module.exports = productRoute;
