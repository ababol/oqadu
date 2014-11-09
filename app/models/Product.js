module.exports = function(mongoose, Schema) {
  var Product = new Schema({
  	name: {type:String, required:true},
  	img: {type:String, required:true},
    info1: {type:String, required:false},
    info1_text: {type:String, required:false},
    info2: {type:String, required:false},
    info2_text: {type:String, required:false},
    info3: {type:String, required:false},
    info3_text: {type:String, required:false},
    info4: {type:String, required:false},
    info4_text: {type:String, required:false},
    info5: {type:String, required:false},
    info5_text: {type:String, required:false},
    answer: [Schema.Types.ObjectId]
  });
  return mongoose.model('Product', Product);
};
