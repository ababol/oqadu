var app = require('../app');
var ReadWriteLock = require('rwlock');

var autoIncIdGen = {
	lastGivenValue : 0,
	generateUniqueId : function(){
		return ++autoIncIdGen.lastGivenValue;
	}
}

var idGeneratorRoute = {
	define : function(){
		
		var lock = new ReadWriteLock();

		app.get('/uniqueId', function(request, response){
			
			var id;
  			// LOCKED
  			lock.writeLock(function(){
  				id = autoIncIdGen.generateUniqueId();
  				release();
  			});
  			// REALEASED
  			response.status(200);
  			response.send(id);
		});
	}
}


module.exports = idGeneratorRoute;