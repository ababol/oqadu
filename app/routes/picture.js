var picture = require('../models/Picture'),
	authenticator = require('../authenticator');

var pictureRoute = {
	define: function(app, prefixAPI) {
		picture.methods(['get', 'post', 'put', 'delete']);

		picture.before('post', authenticator.authenticate);
		picture.before('put', authenticator.authenticate);
		picture.before('delete', authenticator.authenticate);

		picture.register(app, prefixAPI + '/Pictures');
	}
};

module.exports = pictureRoute;
