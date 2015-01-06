var path = "http://oqadu.herokuapp.com";

casper.test.begin('Verify the landed page of the Seller App', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertUrlMatch(/#\/tab\/user$/, 'Good redirecting to #/tab/user by default');
  }).run(function() {
    test.done();
  });
});

casper.test.begin('Fiche Client part', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertSelectorHasText('a.active', 'Fiche client', 'Verify that the selected item on the left menu is the good one');
    test.assertExists('ul.list', 'The left menu exists');
    test.assertElementCount('.list a', 4, 'The left menu contains 4 items');
  }).run(function() {
    test.done();
  });
});
