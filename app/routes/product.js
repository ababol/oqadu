var Product = require('../models/Product'),
  authenticator = require('../authenticator');

var productRoute = {
  define: function(app, prefixAPI) {
    Product.methods(['get', 'post', 'put', 'delete']);

    Product.before('post', authenticator.authenticate);
    Product.before('put', authenticator.authenticate);
    Product.before('delete', authenticator.authenticate);

    // custom route
    Product.route('Recommendations.get', function(req, res) {
      var tags = req.query.tags.split(","),
        recommendations, query;

      query = Product.where("tags").all(tags);
      query.find(function(err, products) {
        if (err) {
          res.status(400);
          return res.send("Error while getting the recommendations.<br/>" + err);
        }
        if (products === null) {
          res.status(416);
          return res.send("Aucun produit correspondant aux tags: '" + tags.join(",") + "' trouvé.");
        } else {
          res.status(200);
          return res.send(products);
        }
      });
    });

    Product.route('Barcode.get', function(req, res) {
      var barcode = parseInt(req.query.barcode, 10),
        product, query;

      if (isNaN(barcode)) {
        barcode = 0;
      }

      query = Product.where({ barcode: barcode });
      query.findOne({}, '_id', function(err, product) {
        console.log(product)
        if (err) {
          res.status(400);
          return res.send("Error while getting the product.<br/>" + err);
        }
        if (product === null) {
          res.status(404);
          return res.send("Aucun produit trouvé.");
        } else {
          res.status(200);
          return res.send(product._id);
        }
      });
    });

    Product.register(app, prefixAPI + '/Products');
  }
};

module.exports = productRoute;
