module.exports = function(mongoose, Schema) {
  var Product = new Schema({
  	name: {type:String, required:true},
  	img: {type:String, required:true},
    info_label: {type:[String], required:false, default: []},
    info_text: {type:String, required:false, default: []},
    description: {type: String},
    answer: [Schema.Types.ObjectId]
  });
  return mongoose.model('Product', Product);
};
