//var path = "http://oqadu.herokuapp.com";
var path = "www";
//var path = "http://localhost:3000";

var waitingNumberInital, waitingNumberEnd;
var firstUrl;

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};

var clickLoop = function(self, selector){
  self.wait(2000, function(){
    if (!self.exists('.productreco')) {
          casper.waitForSelector(selector, function(){
          casper.test.assertExists(selector, 'Cutomer answers question');
          secureClick(self, selector);          
          clickLoop(self,selector);
          });
        }else{
           casper.test.assertExists('.productreco', 'Cutomer can see recommandations');
        }
  });
        
};

casper.test.begin('Seller APP : Get the number of customers currently in waiting list', function(test) {

  casper.start(path+'/seller.html').then(function() {
    test.assertUrlMatch(/#\/login/, 'Redirecting to #/login by default');
    this.fillSelectors('.username', {
      'input[placeholder="Username"]': 'Zlatan'
    }, true);
    this.fillSelectors('.password', {
      'input[placeholder="Password"]': '123456'
    }, true);
    this.clickLabel('Login');
  });

  casper.wait(2000,function(){
    test.assertExists('.stats');
      secureClick(this,'.stats');
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
    }, 5000);
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
        this.waitForSelector("#engine", function(){
          test.assertExists('#engine');
          secureClick(this, '#engine');
        });
      });
    });
  });

  casper.then(function(){
    this.waitFor(function check() {
      return this.getCurrentUrl() != firstUrl;
    }, function then() {
      test.assertUrlMatch(/#\/question/, 'Client clicked on the "#engine" button and can now see the first question');
    });
  });

casper.then(function(){
  clickLoop(this, '.answer');
});

  casper.waitForSelector('.productreco', function(){
    secureClick(this, 'a:nth-child(1)');
  });

  casper.waitForText("Produit", function(){
    test.assertTextExists('Produit', 'Cutomer can see the details of a product');
    secureClick(this, '.join');
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
