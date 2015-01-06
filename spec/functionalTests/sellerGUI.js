casper.test.begin('assert that an input exists in the products tab', 1, function(test) {
  casper.start('http://localhost:3000/seller.html#/products').then(function() {
    test.assertExists('input');
    test.assertExists('h1.fakeid');
  }).run(function() {
    test.done();
  });
});
