module.exports = function(mongoose, Schema) {
  var Answer = new Schema({
  	text: {type:String, required:true}
  });
  return mongoose.model('Answer', Answer);
};
