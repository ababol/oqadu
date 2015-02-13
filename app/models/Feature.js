var restful = require('node-restful'),
    mongoose = restful.mongoose;



// MONGO SCHEMA
var feature = restful.model('feature', mongoose.Schema({
	label: {type:'string', required:true},
	value: {type:'string', required:true}
}));


exports = module.exports = feature;
	