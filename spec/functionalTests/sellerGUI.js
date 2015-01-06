var casper = require('casper').create();

casper.start('http://localhost:3000/seller.html#/products', function() {
  if (this.exists('input')) {
    this.echo('the input exists');
  }else{
    this.echo("it doesn't");
  }
});

casper.run();
