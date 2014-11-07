module.exports = function(mongoose, Schema) {
  var Picture = new Schema({
  	label: {type:String, required:true},
  	filepath: {type:String, required:true}
  });
  return mongoose.model('Picture', Picture);
};
