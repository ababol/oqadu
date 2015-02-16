var restful = require('node-restful'),
    mongoose = restful.mongoose;

// MONGO SCHEMA
var question = restful.model('question', mongoose.Schema({
  text: {type:'string', required:true},
  answers: {
    type: [{
      text: {type:'string', required:true},
      tags: {type:['string'], required:false}
    }],
    required: true
  },
  tags: {type:['string'], required:false}
}));

exports = module.exports = question;
