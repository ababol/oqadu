module.exports = function(mongoose, Schema) {
  var Product = new Schema({
  	creationDate: {type:Date, required:true}
  	laspingDate: {type:Date, required:false}
  });
  return mongoose.model('Product', Product);
};
