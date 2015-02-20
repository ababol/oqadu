var restful = require('node-restful'),
    mongoose = restful.mongoose;

// MONGO SCHEMA
var product = restful.model('product', mongoose.Schema({
  barcode: {type:'Number', required:true},
  name: {type:'string', required:true},
  price: {type:'Number', required:true},
  promo: {type:'Number', required:false},
  tags: {type:['string'], required:false},
  pictures: {
    type:[{
      label: {type:'string', required:true},
      path: {type:'string', required:true}
    }],
    required:false
  },
  features: {
    type:[{
      label: {type:'string', required:true},
      value: {type:'string', required:true}
    }],
    required:false
  },
  reviews: {
    type: [{
      title: {type:'string', required:true},
      reviewerName: {type:'string', required:true},
      score: {type:'Number', required:true},
      comment:{type:'string', required: false}
    }],
    required:false
  },
  faq: {
    type: [{
      title: {type:'string', required:true},
      content: {type:'string', required:true}
    }],
    required:false
  }
}));

product.collection.ensureIndex({ name: "text" }, function(error) {
  if (error) {
    console.log("Issue node, need to update https://github.com/mafintosh/mongojs/issues/135");
  }
});

exports = module.exports = product;
