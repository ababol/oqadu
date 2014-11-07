module.exports = function(mongoose, Schema) {
  var ProductType = new Schema({
  	name: {type:String, required:true}
  	dutyFreePrice: {type:Number, required:true}
  });
  return mongoose.model('ProductType', ProductType);
};
