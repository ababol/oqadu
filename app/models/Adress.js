module.exports = function(mongoose, Schema) {
  var Adress = new Schema({
  	country: {type:String, required:true},
  	town: {type:String, required:true},
  	cp: {type:String, required:false},
  	street: {type:String, required:true},
  	street_num: {type:String, required:true},
  	detail: {type:String, required:false}
  });
  return mongoose.model('Adress', Adress);
};
