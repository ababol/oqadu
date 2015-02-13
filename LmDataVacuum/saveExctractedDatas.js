var mongoose = require('node-restful').mongoose
fs = require('fs')

fs.readFile("./exctractedDatas.json", "utf-8", function(err, data){
  mongoose.connect('mongodb://public:public@ds045027.mongolab.com:45027/oqadu2');

var routes = require('../app/routes/index');
routes.forEach(function(route) {
  route.define();
});

var Question = mongoose.model('question')
var Product = mongoose.model('product')

  var json = JSON.parse(data);

  console.log(json.questions.length);
  console.log(json.products.length);
  json.questions.forEach(function(question){
    //questionDocument = new Question(question);
    //questionDocument.save()
  });

  json.products.forEach(function(product){
    //productDocument = new Product(product);
    //productDocument.save()
  });

  mongoose.connection.close()

});
