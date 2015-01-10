var app = require('../app'),
	product = require('../models/product');

var productRoute = {
	define: function(){
		product.registers(app, '/products');
		product.methods(['get']);		

		// custom route
		product.route('recommendations', ['get'], function(request, result, next){
			var recommendations;
			var tags = request.body.tags;
			recommendations = product.find({tags:tags}, function(){});
			if(recommendations == null){
				result.error('416: Requested Range Not Satisfiable');
			}
			result.send(recommendations);
		});

	}
}

module.exports = productRoute;
