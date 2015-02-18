/*Scenario 2: check if there are recommendations for each sequence of possible questions*/

//var path = "http://oqadu.herokuapp.com";
//var path = "http://localhost:3000";
var path = "www";

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};



var clickLoop = function(self, length){// en cours de dev
  
    /*self.echo('test');

    casper.waitForSelector('.answer', function(){
      self.capture('test'+index+'.png');
      var Lenght2= self.evaluate(function(){
        return document.querySelectorAll(".answer").length;
      });
    self.echo(Lenght2);**/
    
      for (var j = 2; j <= length+1; j++) {
            self.capture('test'+j+'.png');
            secureClick(self, '.answer:nth-child('+j+')');
            self.echo('click');
            casper.waitForSelector('.answer', function(){
              casper.test.assertExists('.answer');
              length = self.evaluate(function(){
                return document.querySelectorAll(".answer").length;
              });
              this.echo(length);
            });
            if (self.exists('.productreco')) {
              casper.test.assertExists('.productreco');
            return true;
            }else{
            casper.then(function(){
              clickLoop(self, length);
            }); 
          }; 
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
      this.echo(Lenght);
      clickLoop(this, Lenght);
    }, function timeout() {
    this.echo("temps dépassé").exit();
    },
      5000);





  casper.run(function() {
    test.done();
  });
});
