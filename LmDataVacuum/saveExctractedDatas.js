var mongoose = require('node-restful').mongoose
data = require('./exctractedDatas.json')


var inserts = function(data){

  mongoose.connect('mongodb://public:public@ds045027.mongolab.com:45027/oqadu2');
  var Question = mongoose.model('question')
  var Product = mongoose.model('product')

  var json = datas

  console.log("QUESTIONS \n")
  data.questions.forEach(function(question){
    console.log(question)
    questionDocument = new Question(question);
    questionDocument.save()
  });

  console.log("PRODUCTS \n")
  data.products.forEach(function(product){
    console.log(product)
    productDocument = new Product(product);
    productDocument.save()
  });

  mongoose.connection.close()
}

inserts(data);
