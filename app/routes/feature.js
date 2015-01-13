var app = require('../app'),
	feature = require('../models/feature');

var featureRoute = {
	define: function(){
		feature.register(app, '/features');
		feature.methods(['get']);		
	}
}

module.exports = featureRoute;
