var restful = require('node-restful'),
    mongoose = restful.mongoose;

var answer = mongoose.model('answer').schema;

// MONGO SCHEMA
var question = restful.model('question', mongoose.Schema({
	text: {type:'String', required:true},
	answers: {type:[answer], required: true},
	tags: {type:['ObjectId'], ref:'tag', required:true}
}));

exports = module.exports = question;
