module.exports = function(mongoose, Schema) {
  var User = new Schema({
    name: { type: String, required: true },
    comment: { type: String }
  });
  return mongoose.model('User', User);
};
