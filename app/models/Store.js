module.exports = function(mongoose, Schema) {
  var Store = new Schema({
  	label: {type:String, required:true},
  	area: {type:Number, required:false}
  });
  return mongoose.model('Store', Store);
};
