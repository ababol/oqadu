//var path = "http://oqadu.herokuapp.com";
var path = "http://localhost:3000";
var waitingNumber;
var firstUrl;

casper.test.begin('Get the number of customers currently in waiting list', function(test) {

  casper.start(path+'/seller.html').then(function() {
    test.assertUrlMatch(/#\/tab\/user$/, 'Redirecting to #/tab/user by default');
    this.clickLabel('Statistiques');
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/waitlist/, 'Redirecting to #/waitlist');
  });

  casper.then(function(){
    this.waitFor(function check(){
      return this.evaluate(function(){
        return document.querySelector('.waitingNumber').innerText != "0";
      });
    }, function then(){
        waitingNumber = this.evaluate(function(){
        return document.querySelector('.waitingNumber').innerText;
      });
    }, function timeout() {
      this.echo("Temps dépassé.").exit();
    });
  });

  casper.then(function(){
    this.echo('There is '+waitingNumber+' customers in waiting list.');
    casper.click('.products');
    this.waitForSelector(".products.active", function(){
      console.log(this.getCurrentUrl());
    });
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Add a customer to the waiting list', function(test){
  casper.start(path+'/customer.html').then(function(){
    this.waitForSelector("#engine.engine", function(){
      firstUrl = this.getCurrentUrl();
      this.click('#engine');
    });
  });

  casper.then(function(){
    this.waitFor(function check() {
      return this.getCurrentUrl() != firstUrl;
    }, function then() {
      console.log(this.getCurrentUrl());
    }, function timeout() {
      this.echo("Temps dépassé.").exit();
    });
  });

  casper.run(function(){
    test.done();
  });
});
