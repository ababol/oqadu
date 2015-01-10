var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
var picture = restful.model('picture', mongoose.Schema({
	label: {type:'string', required:true},
	url: {type:'string', required:true}
}));


exports = module.exports = picture;
