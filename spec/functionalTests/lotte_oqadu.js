this.open('http://localhost:3000/seller.html', function() {
  this.describe('test', function() {
    this.assert.ok(this.$('.list').length, 'expects button to be in the DOM');
    this.success();
  });
});
