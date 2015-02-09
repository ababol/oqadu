var path = "http://oqadu.herokuapp.com";
//var path = "http://localhost:3000";

casper.test.begin('Verify the landed page of the Seller App', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertUrlMatch(/#\/tab\/user$/, 'Good redirecting to #/tab/user by default');
  }).run(function() {
    test.done();
  });
});

/*
casper.test.begin('Fiche Client part : left menu', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertSelectorHasText('a.active', 'Fiche client', 'Verify that the selected item on the left menu is the good one');
    test.assertExists('ul.list', 'The left menu exists');
    test.assertElementCount('.list a', 4, 'The left menu contains 4 items');
    test.assertExists('ul.list .logout', '1st item menu has class="logout"');
    test.assertSelectorHasText('ul.list .logout', 'John Doe', '1st item menu text is "John Doe"');
    test.assertExists('ul.list .details', '2nd item menu has class="details"');
    test.assertSelectorHasText('ul.list .details', 'Fiche client', '2nd item menu text is "Fiche client"');
    test.assertExists('ul.list .stats', '3rd item menu has class="stats"');
    test.assertSelectorHasText('ul.list .stats', 'Statistiques', '3rd item menu text is "Statistiques"');
    test.assertExists('ul.list .stats', '4th item menu has class="stats"');
    test.assertSelectorHasText('ul.list .products', 'Produits', '4th item menu text is "Produits"');
  }).run(function() {
    test.done();
  });
});
*/
/*
casper.test.begin('Fiche Client part : top tabs', function(test) {
  casper.start(path+'/seller.html').then(function() {
    test.assertExists('.tabs', 'The tabs exist');
    test.assertElementCount('.tabs a', 4, 'There is 3 tabs');
    test.assertExists('.tabs .user', '1st tab item has class="user"');
    test.assertSelectorHasText('.tabs .user', 'John Doe', '1st item menu text is "John Doe"');
    test.assertExists('ul.list .details', '2nd item menu has class="details"');
    test.assertSelectorHasText('ul.list .details', 'Fiche client', '2nd item menu text is "Fiche client"');
    test.assertExists('ul.list .stats', '3rd item menu has class="stats"');
    test.assertSelectorHasText('ul.list .stats', 'Statistiques', '3rd item menu text is "Statistiques"');
    test.assertExists('ul.list .stats', '4th item menu has class="stats"');
    test.assertSelectorHasText('ul.list .products', 'Produits', '4th item menu text is "Produits"');
  }).run(function() {
    test.done();
  });
});
*/
