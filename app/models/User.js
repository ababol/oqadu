var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
  var user = restful.model('user', mongoose.Schema({
  	username: {type:'string', required:true},
  	password: {type:'string', required:true}
  }));
 
 exports = module.exports = user;