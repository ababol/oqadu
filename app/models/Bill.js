module.exports = function(mongoose, Schema) {
  var Bill = new Schema({
  	date: {type:Date, required:true},
  	taxedPrice: {type:Number, required:true}
  });
  return mongoose.model('Bill', Bill);
};
