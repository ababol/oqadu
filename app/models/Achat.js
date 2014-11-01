module.exports = function(mongoose, Schema) {
  var Achat = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true }
  });
  return mongoose.model('Achat', Achat);
};
