var mongoose = require('mongoose');
var User = mongoose.model('Users');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};


module.exports.getUser = function(req, res){
	User
		.find({login: req.body.login, password: req.body.password})
		.exec(function(err, usr) {
		if(!usr){
			sendJsonResponse(res, 404,{
				"message": "User not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, usr[0]);
	});
};

module.exports.getUserByLogin = function(req, res){
	User
		.find({login: req.body.login})
		.exec(function(err, usr) {
		if(!usr){
			sendJsonResponse(res, 404,{
				"message": "User not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, usr[0]);
	});
};

module.exports.addUser = function(req, res){
	var data = new User();
	data.name = req.body.name;
	data.post = req.body.post;
	data.password = req.body.password;
	data.login = req.body.login;
	data.save(function(err){
		if(err){
			sendJsonResponse(res, 400, err);
		}	else {
			sendJsonResponse(res, 201, "Created");
		}
	});
};
