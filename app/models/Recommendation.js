module.exports = function(mongoose, Schema) {
  var Recommandation = new Schema({
  	answerId: {type: Schema.Types.ObjectId, ref: 'Answer', required:true},
  	products: {type: [Schema.Types.ObjectId], ref: 'Product', required:true}
  });
  return mongoose.model('Recommendation', Recommendation);
};
