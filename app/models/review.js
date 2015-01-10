var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA

var review = restful.model('review', mongoose.Schema({
	reviewedProduct: {type:'ObjectId', ref:'product', required:true},
	reviewerName: {type:'string', required:true},
	score: {type:'int', required:true},
	comment:{type:'string', required: false}
}));


exports = module.exports = review;
