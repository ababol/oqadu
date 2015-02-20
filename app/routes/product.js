var Product = require('../models/Product'),
  authenticator = require('../authenticator');

var productRoute = {
  define: function(app, prefixAPI) {
    Product.methods(['get', 'post', 'put', 'delete']);

    Product.before('post', authenticator.authenticate);
    Product.before('put', authenticator.authenticate);
    Product.before('delete', authenticator.authenticate);

    // custom route
    Product.route('Recommendations.post', function(req, res) {
      var tags = req.body.tags,
        productId = req.body.productId,
        query;

      if (tags.length === 0) {
        query = Product;
      } else {
        query = productId ? Product.where("tags").all(tags).ne("_id", productId)
                          : Product.where("tags").all(tags);
      }
      query.find(function(err, products) {
        if (err) {
          res.status(400);
          return res.send("Error while getting the recommendations.<br/>" + err);
        }
        if (products === null || products === []) {
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
          query;

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
        if (product === null || product === []) {
          res.status(404);
          return res.send("Aucun produit trouvé.");
        } else {
          res.status(200);
          return res.send(product._id);
        }
      });
    });

    Product.route('Promo.get', function(req, res) {
      Product.find({}, "price promo pictures")
      .where("promo").gt(10)
      .exec(function(err, products) {
        if (err) {
          res.status(400);
          return res.send("Error while getting the product.<br/>" + err);
        }
        if (products === null || products === []) {
          res.status(404);
          return res.send("Aucun produit trouvé.");
        } else {
          res.status(200);
          return res.send(products);
        }
      });
    });

    Product.route('Search.get', function(req, res) {
      var name = req.query.name,
        query;

      if (name) {
        query = Product.find(
          { $text : { $search : name } },
          "name pictures"
        );
      } else {
        query = Product.find(
          {},
          'name pictures'
        ).limit(50);
      }
      query.exec(function(err, products) {
        if (err) {
          res.status(400);
          return res.send("Error while searching the products.<br/>" + err);
        }
        if (products === null || products === []) {
          res.status(200);
          return res.send("Aucun produit trouvé.");
        } else {
          res.status(200);
          return res.send(products);
        }
      });
    });

    Product.register(app, prefixAPI + '/Products');
  }
};

module.exports = productRoute;
