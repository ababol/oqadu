var user = require('./models/User');

var authenticator = {

	hash : function(pwd){
		var i, chr;
		var len = pwd.length;
		var hash = 0;

		if(pwd.length == 0){
			return hash;
		}
		for(i = 0; i < len; i++){
			chr = pwd.charCodeAt(i);
			hash = ((hash << 5) - hash) +chr;
			hash |= 0;
		}
		return hash;
	},

	authenticate : function(request, response, next){
		var uname = request.body.username;
		var pwd = authenticator.hash(request.body.password);

		var authenticUser = user.find({
			username:uname,
			password:pwd
		}, function(){});

		if(authenticUser == null){
			response.status(401);
			response.send("Unauthorized.")
		}else{
			next();
		}
	}
}

module.exports = authenticator;
