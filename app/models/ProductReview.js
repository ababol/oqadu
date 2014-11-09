module.exports = function(mongoose, Schema) {
  var ProductReview = new Schema({
  	productId: {type: Schema.Types.ObjectId, ref: 'Product', required:true},
  	score: {type:Number, required:true},
  	text: {type:String, required:true}
  });
  return mongoose.model('Review', ProductReview);
};
