var restful = require('node-restful'),
    mongoose = restful.mongoose;

// MONGO SCHEMA
var review = restful.model('review', mongoose.Schema({
	reviewerName: {type:'string', required:true},
	score: {type:'Number', required:true},
	comment:{type:'string', required: false}
}));


exports = module.exports = review;
