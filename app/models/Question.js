module.exports = function(mongoose, Schema) {
  var Question = new Schema({
  	text: {type:String, required:true}
  });
  return mongoose.model('Question', Question);
};
