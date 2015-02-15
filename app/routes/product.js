var Product = require('../models/Product'),
  authenticator = require('../authenticator');

var productRoute = {
  define: function(app, prefixAPI) {
    Product.methods(['get', 'post', 'put', 'delete']);

    Product.before('post', authenticator.authenticate);
    Product.before('put', authenticator.authenticate);
    Product.before('delete', authenticator.authenticate);

    // custom route
    Product.route('recommendations', ['get'], function(request, response) {
      var tags = request.body.tags,
        recommendations;

      recommendations = Product.find({
        tags: { $in: tags }
      });

      if (recommendations == null) {
        response.status(416);
        response.send('No product corresponds to the given tags.');
      } else {
        response.status(200);
        response.send(recommendations);
      }
    });

    Product.route('product-barcode', ['get'], function(request, response) {
      var barcode = request.body.barcode,
        correspondingProduct;

      correspondingProduct = Product.find({
        barcode: barcode
      });

      if (correspondingProduct == null) {
        response.status(404);
        response.send('There is not any product corresponding to that bar code.');
      } else {
        response.status(200);
        response.send(correspondingProduct);
      }
    });

    Product.register(app, prefixAPI + '/Products');
  }
};

module.exports = productRoute;
