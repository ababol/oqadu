module.exports = function(mongoose, Schema) {
  var Client = new Schema({
  	first_name: {type:String, required:true},
  	surename: {type:String, required:true},
  	birth_date: {type:Date, required:false}
  });
  return mongoose.model('Client', Client);
};
