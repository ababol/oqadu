var app = require('../app'),
	tag = require('../models/tag');

var tagRoute = {
	define: function(){
		tag.registers(app, '/tags');
		tag.methods(['get', 'put', 'post', 'delete']);		
	}
}

module.exports = tagRoute;



