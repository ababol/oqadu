module.exports = function(mongoose, Schema) {
  var Feature = new Schema({
  	label: {type:String, required:true},
  	value: {type:String, required:true}
  });
  return mongoose.model('Feature', Feature);
};
