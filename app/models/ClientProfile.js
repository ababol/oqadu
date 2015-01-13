var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
var clientProfile = restful.model('clientProfile', mongoose.Schema({
	currentTags:{type:['ObjectId'], ref:'tag', required:false}
}));

exports = module.exports = clientProfile;
