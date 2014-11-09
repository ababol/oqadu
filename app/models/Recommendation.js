module.exports = function(mongoose, Schema) {
  var Recommendation = new Schema({
  	answerId: {type: Schema.Types.ObjectId, ref: 'Answer', required:true},
  	productId: {type: Schema.Types.ObjectId, ref: 'Product', required:true}
  });
  return mongoose.model('Recommendation', Recommendation);
};
