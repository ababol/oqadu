var app = require('../app');
var picture = require('../models/picture');

var pictureRoute = {
	define: function(){
		picture.registers(app, '/pictures');
		picture.methods(['get']);		
	}
}

module.exports = pictureRoute;