module.exports = function(mongoose, Schema) {
  var Tag = new Schema({
  	label: {type:String, required:true}
  });
  return mongoose.model('Tag', Tag);
};
