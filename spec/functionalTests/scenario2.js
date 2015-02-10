/*Scenario 2: the client answers to each question, until he get the detail of the product of the suggestion. Finally, he joins the waiting list and returns to the main menu*/

//var path = "http://oqadu.herokuapp.com";
var path = "http://localhost:3000";

casper.test.begin('Verify the landed page of the Seller App', function(test) {
  casper.start(path+'/customer.html').waitForText("Moteur", function() {
    test.assertUrlMatch(/#\/home/, 'Redirecting to #/home by default');
  });

  casper.waitForSelector('.engine', function(){
    //this.click('.engine');
    this.mouseEvent('mousedown','.engine');
    this.mouseEvent('mouseup','.engine'); 
  });

  casper.waitForText("Jardin", function(){
    test.assertUrlMatch(/#\/question\/545f70d9946ea453ece17e7e/, 'The client can see the first question');
  });

  casper.waitForSelector('.answer', function(){
    //this.click('.answer:nth-child(2)');
    this.mouseEvent('mousedown','.answer:nth-child(2)');
    this.mouseEvent('mouseup','.answer:nth-child(2)'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/question\/545f70d9946ea453ece17e7f/, 'The client can see the second question');
  });

  casper.waitForSelector('.answer', function(){
    //this.click('.answer:nth-child(2)');
    this.mouseEvent('mousedown','.answer:nth-child(2)');
    this.mouseEvent('mouseup','.answer:nth-child(2)'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/question\/545f70d9946ea453ece17e81/, 'The client can see the third question');
  })

  casper.waitForSelector('.answer', function(){
    //this.click('.answer:nth-child(2)');
    this.mouseEvent('mousedown','.answer:nth-child(2)');
    this.mouseEvent('mouseup','.answer:nth-child(2)'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/question\/545f70d9946ea453ece17e85/, 'The client can see the fourth question');
  })

  casper.waitForSelector('.answer', function(){
    //this.click('.answer:nth-child(2)');
    this.mouseEvent('mousedown','.answer:nth-child(2)');
    this.mouseEvent('mouseup','.answer:nth-child(2)'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/recommendation\/545fc3da946ea453ece17f62/, 'The client can see the recommendation');
  })

  casper.waitForSelector('.recommendation', function(){
    //this.click('.recommendation');
    this.mouseEvent('mousedown','.recommendation');
    this.mouseEvent('mouseup','.recommendation'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/product\/545fc3da946ea453ece17f22/, 'The client can see the product detail');
  })

  casper.waitForSelector('.join', function(){
    //this.click('.join');
    this.mouseEvent('mousedown','.join');
    this.mouseEvent('mouseup','.join'); 
    console.log("The client join the queue");
    //this.click('.home');
    this.mouseEvent('mousedown','.home');
    this.mouseEvent('mouseup','.home'); 
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/home/, 'Redirecting to #/home by default');
  })


  casper.run(function() {
    test.done();
  });
});
