var restful = require('node-restful'),
    mongoose = restful.mongoose;


// MONGO SCHEMA
var user = restful.model('user', mongoose.Schema({
  username: {type:'string', required:true},
  password: {type: Number, required:true},
  name: {type:'string', required:true},
  clientId: {type: 'Number', required: true, default: 0},
  rank: {type: 'Number', required: true, default: 0},
  shelf: {type: 'string', required: false},
  avatar: {type: 'string', required: false}
}));

 exports = module.exports = user;
