var path = "http://oqadu.herokuapp.com";
//var path = "http://localhost:3000";

casper.test.begin('Verify the landed page of the Seller App', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertUrlMatch(/#\/tab\/user$/, 'Redirecting to #/tab/user by default');
    this.clickLabel('Statistiques');
  });

  casper.then(function(){
    test.assertUrlMatch(/#\/waitlist/, 'Redirecting to #/waitlist');
  });

  casper.run(function() {
    test.done();
  });
});
