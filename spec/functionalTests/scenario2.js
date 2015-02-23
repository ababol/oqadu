/*Scenario 2: check if there are recommendations for each sequence of possible questions*/

//var path = "http://oqadu.herokuapp.com";
//var path = "http://localhost:3000";
var path = "www";

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};



/**var clickLoop = function(self, length){// en cours de dev
  
    self.echo('test');

    casper.waitForSelector('.answer', function(){
      self.capture('test'+index+'.png');
      var Lenght2= self.evaluate(function(){
        return document.querySelectorAll(".answer").length;
      });
    self.echo(Lenght2);
    
      for (var j = 2; j <= length+1; j++) {
        

          secureClick(self, '.answer:nth-child('+j+')');
        

        self.capture('test'+j+'.png');
        self.echo('click');

         casper.wait(2000, function(){
          if (!self.exists('.productreco')) {
          casper.waitForSelector('.answer', function(){
          casper.test.assertExists('.answer');
          length = self.evaluate(function(){
            return document.querySelectorAll(".answer").length;
          });
          this.echo(length);
        });
        
        casper.then(function(){
          clickLoop(self, length);
        }); 
        }else{
          casper.test.assertExists('.productreco');
          casper.wait(2000, function(){
            self.capture('test'+j+'.png');
            });
          secureClick(self, '.back-button');
          //retourner au questions????
        } 
        });
    }
    
};**/

var func = function(self, Lenght, i) {
  
        
       self.waitForSelector('.answer:nth-child('+i+')', function(){
       self.echo([i, ".answer", Lenght]);
          secureClick(self, '.answer:nth-child('+i+')');
          self.echo('click');
        });
      casper.wait(2000, function(){
      if (!self.exists('.productreco')) {
       self.waitForSelector(".answer", function(){
          casper.test.assertExists('.answer');
          var Lenght= self.evaluate(function(){
        return document.querySelectorAll(".answer").length;
        });
          self.then(function(){
            loopFor(self, Lenght, 2);
          });
          
        });
     }else{
          
          casper.wait(1000, function(){
            self.capture('test1.png');
            casper.test.assertExists('.productreco');
          
          secureClick(self, '.return');
          self.echo("return");
          casper.wait(1000, function(){
            self.capture('test2.png');
            if (i == (Lenght+1)) {
            secureClick(self, '.return');
            self.echo("return2");
        };
          });
          
          });
          


          //retourner au questions????
        }
     });
};

var loopFor = function(self, Lenght, i){
      if (i <= Lenght+1) {
        var result = func(self, Lenght, i);
        i++;
        loopFor(self, Lenght, i);
        
      }
      
};

casper.test.begin('Verify the landed page of the Seller App', function(test) {
  casper.start(path+'/customer.html').waitForText("File", function() {
    test.assertUrlMatch(/#\/home/, 'Redirecting to #/home by default');
    this.waitForSelector("#engine", function(){
          test.assertExists('#engine');
          secureClick(this, '#engine');
        });
  });


  casper.waitForSelector('.answer', function(){
      test.assertUrlMatch(/#\/question/, 'Client can start to answer');
      var Lenght= this.evaluate(function(){
        return document.querySelectorAll(".answer").length;
        });
      loopFor(this, Lenght, 2);
      //clickLoop(this, Lenght);
    }, function timeout() {
    this.echo("temps dépassé").exit();
    },
      5000);

casper.then(function(){

});



  casper.run(function() {
    test.done();
  });
});
