var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
var answer = restful.model('answer', mongoose.Schema({
	text: {type:'string', required:true},
	tags : {type:['string'], required:false}
}));


exports = module.exports = answer;
