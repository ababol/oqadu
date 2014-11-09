module.exports = function(mongoose, Schema) {
  var Answer = new Schema({
  	text: {type:String, required:true},
    questionId: {type: Schema.Types.ObjectId, ref: 'Question', required:true},
    nextUrl: {type: String, required:true}
  });
  return mongoose.model('Answer', Answer);
};
