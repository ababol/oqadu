var restful = require('node-restful'),
    mongoose = restful.mongoose;

var picture = mongoose.model('picture').schema;
var feature = mongoose.model('feature').schema;
var review = mongoose.model('review').schema;

// MONGO SCHEMA
var product = restful.model('product', mongoose.Schema({
	barcode: {type:'Number', required:true},
	name: {type:'string', required:true},
	price: {type:'Number', required:true},
	tags: {type:['string'], required:true},
	pictures: {type:[picture], required:false},
	features: {type:[feature], required:false},
  reviews: {type:[review], required:false}
}));

exports = module.exports = product;
