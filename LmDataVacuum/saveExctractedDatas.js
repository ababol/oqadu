var mongoose = require('node-restful').mongoose;
var app = require("express")()
var fs = require('fs');
var Lock = require('rwlock');

fs.readFile("./exctractedDatas.json", "utf-8", function(err, data){

  mongoose.connect('mongodb://public:public@ds045011.mongolab.com:45011/oqadu2');

  var routes = require('../app/routes/index');
  routes.forEach(function(route) {
    route.define(app, "/api/v2");
  });

  var Question = mongoose.model('question')
  var Product = mongoose.model('product')

  var json = JSON.parse(data);
  var lock1 = new Lock();
  var lock2 = new Lock();

  lock1.writeLock(function(release1){
    json.questions.forEach(function(question){
      lock2.writeLock(function(release2){
        var questionDocument = new Question(question);
        questionDocument.save(function(){
          release2();
        });
      });
    });
    lock2.writeLock(function(release2){
      release1();
      release2();
    })
  });


  lock1.writeLock(function(release1){
    json.products.forEach(function(product){
      lock2.writeLock(function(release2){
        var productDocument = new Product(product);
        productDocument.save(function(){
          release2();
        });
      });
    });
    lock2.writeLock(function(release2){
      release1();
      release2();
    })
  });

  lock1.writeLock(function(release1){
    mongoose.connection.close();
    release1();
  });
});
