var app = require('../app'),
	product = require('../models/Product'),
	authenticator = require('../authenticator');

var productRoute = {
	define: function(){
		product.methods(['get', 'post', 'put', 'delete']);

		product.before('post', authenticator.authenticate);
		product.before('put', authenticator.authenticate);
		product.before('delete', authenticator.authenticate);

		// custom route
		product.route('recommendations', ['get'], function(request, response, next){
			var recommendations;
			var input = request.body.tags;

			recommendations = product.find({
				tags:{ $in : input}
			}, function(){});

			if(recommendations == null){
				response.status(416);
				response.send('No product corresponds to the given tags.');
			}else{
				response.status(200);
				response.send(recommendations);
			}
		});

		product.route('product-barcode', ['get'], function(request, response, next){
			var correspondingProduct;
			var input = request.body.barcode;

			correspondingProduct = product.find({
				barcode : input
			}, function(){});

			if(correspondingProduct == null){
				response.status(404);
				response.send('There is not any product corresponding to that bar code.')
			}else{
				response.status(200);
				response.send(correspondingProduct);
			}
		});

		product.register(app, '/products');
	}
}

module.exports = productRoute;
