var app = require('../app');
var picture = require('../models/picture');

var pictureRoute = {
	define: function(){
		picture.register(app, '/pictures');
		picture.methods(['get']);		
	}
}

module.exports = pictureRoute;