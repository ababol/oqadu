/*Scenario 2: check if there are recommendations for each sequence of possible questions*/

//var path = "http://oqadu.herokuapp.com";
var path = "http://localhost:3000";
//var path = "www";

var isBack = false;

var secureClick = function(self, selector){
  self.mouseEvent('mousedown', selector);
  self.mouseEvent('mouseup', selector);
};

var testQuestions = function(self, Lenght, i) {
  
        
       self.waitForSelector('.answer:nth-child('+i+')', function(){
          isBack = false;
          secureClick(self, '.answer:nth-child('+i+')');
          self.echo("réponse "+(i-1)+" / "+Lenght);
        }, function timeout() {
        this.echo("temps dépassé").exit();
        },
          5000);
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
        }, function timeout() {
        casper.test.assertExists('.productreco');
        },
          5000);
     }else{
          
          casper.waitForSelector('.productreco', function(){
            casper.test.assertExists('.productreco');
            secureClick(self, '.return');
            self.echo("click back");
            isBack = true;
            casper.wait(1000, function(){
            });
          }, function timeout() {
        this.echo("temps dépassé").exit();
        },
          5000);
        }
     });
};

var loopFor = function(self, Lenght, i){
      casper.then(function(){
        casper.test.assert(Lenght>=2, "there is more than 1 question");
        });
      if (i <= Lenght+1) {
        var result = testQuestions(self, Lenght, i);
        i++;
        loopFor(self, Lenght, i);
        casper.then(function(){
          if (i == (Lenght+1) && isBack == true) {
                secureClick(self, '.return');
                self.echo("click back");
                casper.wait(1000, function(){
                });
              };
        });
      }  
};

casper.test.begin('Verify the landed page of the customer App', function(test) {
  casper.start(path+'/customer.html').waitForText("File", function() {
    test.assertUrlMatch(/#\/home/, 'Redirecting to #/home by default');
    this.waitForSelector("#engine", function(){
          test.assertExists('#engine');
          secureClick(this, '#engine');
        });
  }, function timeout() {
    this.echo("temps dépassé").exit();
    },
      5000);


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


  casper.run(function() {
    test.done();
  });
});
