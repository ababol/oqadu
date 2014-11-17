module.exports = function(mongoose, Schema) {
  var Product = new Schema({
  	name: {type:String, required:true},
  	img: {type:[String], required:true},
    info_label: {type:[String], required:false, default: []},
    info_text: {type:[String], required:false, default: []},
    description: {type: String, default:""},
    price: {type: Number},
    answer: [Schema.Types.ObjectId],
    tags:{type:[String], required:false, default:[]}
  });
  return mongoose.model('Product', Product);
};
