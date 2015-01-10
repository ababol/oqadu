var app = require('../app'),
	feature = require('../models/feature');

var featureRoute = {
	define: function(){
		feature.registers(app, '/features');
		feature.methods(['get']);		
	}
}

module.exports = featureRoute;
