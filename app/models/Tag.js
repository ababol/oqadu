var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
  var tag = restful.model('tag', mongoose.Schema({
  	label: {type:'string', required:true}
  }));
 
 exports = module.exports = tag;
