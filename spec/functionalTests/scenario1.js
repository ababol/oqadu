// var path = "http://oqadu.herokuapp.com";
var path = "www";
var waitingNumberInital, waitingNumberEnd;
var firstUrl;

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};

casper.test.begin('Seller APP : Get the number of customers currently in waiting list', function(test) {

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
        return document.querySelector('.waitingNumber').innerText != "-1";
      });
    }, function then(){
      waitingNumberInital = this.evaluate(function(){
        return document.querySelector('.waitingNumber').innerText;
      });
    }, function timeout() {
      this.echo("Temps dépassé.").exit();
    });
  });

  casper.then(function(){
    this.echo('There is '+waitingNumberInital+' customers in waiting list.');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin('Customer APP : Add a customer to the waiting list', function(test){
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
    test.assertTextExists('Peinture', 'Cutomer answers Peinture');
    secureClick(this, 'a:nth-child(3)');

  });

  casper.waitForText("peinture", function(){
    test.assertTextExists('peinture', 'Cutomer answers Materiel de peinture');
    secureClick(this, 'a:nth-child(3)');
  });

  casper.waitForText("Rouleau", function(){
    test.assertTextExists('Rouleau', 'Cutomer answers Rouleau');
    secureClick(this, 'a:nth-child(3)');
  });

  casper.waitForText("Rouleau", function(){
    test.assertTextExists('Rouleau', 'Cutomer can see the product Rouleau');
    secureClick(this, 'a:nth-child(1)');
  });

  casper.waitForText("Produit", function(){
    test.assertTextExists('Produit', 'Cutomer can see the details of a Rouleau');
    secureClick(this, '#waitingList');
    this.waitForSelector('#leaveWaitingList', function(){
      test.assertExists('#leaveWaitingList', 'Cutomer joined the waiting list');
    });
  });

  casper.then(function() {
    secureClick(this, '.add-product');
    var cartLenght= this.evaluate(function(){
      return document.querySelector('.cart').innerText.toString().replace(" ", "");
    });
    test.assert(cartLenght == "1", 'Rouleau added to cart (cart.lenght = 1)');
    secureClick(this, '.cart');
    test.assertUrlMatch(/#\/cart/, 'Customer can see his cart');
  });

  casper.waitForText("Rouleau", function(){
    test.assertTextExists('Rouleau', 'Rouleau appear in cart');
    this.waitForSelector('.productreco', function(){
      secureClick(this, '.productreco');
    }, function timeout() {
    this.echo("temps dépassé").exit();
    },
      5000);

  },function timeout() {
    this.echo("temps dépassé").exit();
  },
    5000);

  casper.waitForSelector('.add-product', function(){
    test.assertTextExists('Produit', 'Customer is back to the details of a Rouleau');
    casper.wait(1000, function(){
      secureClick(this, '.add-product');
    });
    }, function timeout() {
    this.echo("temps dépassé").exit();
    },
      5000);

  casper.waitForSelector('.cart',function(){
    secureClick(this, '.cart');
    test.assertUrlMatch(/#\/cart/, 'Customer can see his cart');
  });

  casper.wait(1000, function(){
     test.assertTextDoesntExist('Rouleau', 'Rouleau was remove from cart');
  });

  casper.then(function(){
    secureClick(this, '.home');
    test.assertUrlMatch(/#\/home/, 'Redirecting to #/home by default');
  });

  casper.run(function(){
    test.done();
  });
});


casper.test.begin('Seller APP : Verify that the customer has been added to the waiting list', function(test){
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
          return document.querySelector('.waitingNumber').innerText != "-1";
        });
      }, function then(){
          waitingNumberEnd = this.evaluate(function(){
          return document.querySelector('.waitingNumber').innerText;
        });
      }, function timeout() {
        this.echo("Temps dépassé.").exit();
      });
    });

    casper.then(function(){
      this.echo('There is now '+waitingNumberEnd+' customers in waiting list.');
      var total = parseInt(waitingNumberEnd)-parseInt(waitingNumberInital);
      test.assert(total==1 ,"Add a customer to the waiting list really add a customer to the waiting list");
    });


    casper.run(function() {
      test.done();
    });
});
