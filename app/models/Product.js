var restful = require('node-restful'),
    mongoose = restful.mongoose;



// MONGO SCHEMA
var product = restful.model('product', mongoose.Schema({
	name: {type:'string', required:true},
	dutyFreePrice: {type:'Number', required:true},
	tags: {type:['ObjectId'], ref:'tag', required:true},
	pictures: {type:['ObjectId'], ref:'picture', required:false},
	features: {type:['ObjectId'], ref:'feature', required:false}
}));

exports = module.exports = product;
