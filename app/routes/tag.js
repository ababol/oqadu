var app = require('../app'),
	tag = require('../models/tag');

var tagRoute = {
	define: function(){
		tag.register(app, '/tags');
		tag.methods(['get']);		
	}
}

module.exports = tagRoute;



