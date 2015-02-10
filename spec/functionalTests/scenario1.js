//var path = "http://oqadu.herokuapp.com";
var path = "http://localhost:3000";
var waitingNumber;
var firstUrl;

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};

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
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Add a customer to the waiting list', function(test){
  casper.start(path+'/customer.html').then(function(){
    casper.viewport(360, 640).then(function() {
      this.wait(3000, function(){
        firstUrl = this.getCurrentUrl();
        this.waitForSelector(".engine", function(){
          test.assertExists('.engine');
          secureClick(this, '.engine');
        });
      });
    });
  });

  casper.then(function(){
    this.waitFor(function check() {
      return this.getCurrentUrl() != firstUrl;
    }, function then() {
      test.assertUrlMatch(/#\/question\/545f70d9946ea453ece17e7e/, 'Client clicked on the ".engine" button and can now see the first question');
    });
  });

  casper.waitForText("Peinture", function(){
    secureClick(this, 'a:nth-child(3)');
  });

  casper.waitForText("peinture", function(){
    secureClick(this, 'a:nth-child(3)');
  });

  casper.run(function(){
    test.done();
  });
});
