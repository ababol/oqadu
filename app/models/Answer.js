var restful = require('node-restful'),
    mongoose = restful.mongoose;

// MONGO SCHEMA
var answer = restful.model('answer', mongoose.Schema({
	text: {type:'string', required:true},
	question : {type:'ObjectId', ref:'question', required:true},
	tags : {type:['ObjectId'], ref:'tag', required:true}
}));


exports = module.exports = answer;
