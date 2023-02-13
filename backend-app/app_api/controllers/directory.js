var mongoose = require('mongoose');
var Dir = mongoose.model('Directory');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};



/*  Directory  */

module.exports.directory = function(req, res){
		Dir
			.findOne({customId: "directory"})
			.exec(function(err, dir) {
			if(!dir){
				sendJsonResponse(res, 404,{
					"message": "Directory not found"
				});
				return;

			} else if(err){
				sendJsonResponse(res, 400, err);
				return;
			}
			sendJsonResponse(res, 200, dir);
		});
};

module.exports.doEditDirectory = function(req, res){
	Dir
		.findOne({customId: "directory"})
		.exec(
			function(err, dir){
				var thisDirectory;
				if(!dir){
					sendJsonResponse(res, 404,{
						"message": "Directory not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				thisDirectory = dir;
				thisDirectory.title = req.body.title;
				thisDirectory.editDate = req.body.editDate;
				thisDirectory.editUser = req.body.editUser;
				thisDirectory.drugs = req.body.drugs;
				dir.save(function(err, dir) {
					if(err){
						sendJsonResponse(res, 404, err);
					} else {
						sendJsonResponse(res, 200, thisDirectory);
					}
				});
			}
		);
};


/*  View Item  */

module.exports.viewItem = function(req, res){
	if(req.params && req.params.drugid){
		Dir
			.findOne({customId: "directory"})
			.exec(function(err, dir) {
			if(!dir){
				sendJsonResponse(res, 404,{
					"message": "Directory not found"
				});
				return;

			} else if(err){
				sendJsonResponse(res, 400, err);
				return;
			}
			var drug;
			drug = dir.drugs.id(req.params.drugid);
			if(!drug){
				sendJsonResponse(res, 404,{
					"message": "Drug not found"
				});
				return;
			}
			sendJsonResponse(res, 200, drug);
		});
	} else {
		sendJsonResponse(res, 404,{
			"message": "No drugid in request"
		});
	}
};



/*  Add item  */

var doAddDrug = function(req, res, dir){
	if(!dir){
		sendJsonResponse(res, 404,{
			"message": "Directory not found"
		});
	} else {
		dir.drugs.push({
			name: req.body.name,
			shelfLife: req.body.shelfLife,
			cost: req.body.cost,
			pack: req.body.pack,
			actSubstance: req.body.actSubstance,
			analogs: req.body.analogs.split(','),
			manual: req.body.manual,
			pharmGroup: req.body.pharmGroup,
			regDate: new Date(),
			img: req.body.img
		});
		dir.save(function(err, dir){
			var thisDrug;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisDrug = dir.drugs[dir.drugs.length - 1];
				sendJsonResponse(res, 201, thisDrug);
			}
		});
	}
};

module.exports.doAddItem = function(req, res){
	Dir
		.findOne({customId: "directory"})
		.select('drugs')
		.exec(
			function(err, dir){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddDrug(req, res, dir);
				}
			}
	);
};



/*  Edit item  */

module.exports.doEditItem = function(req, res){
	if(!req.params.drugid){
		sendJsonResponse(res, 404,{
			"message": "Drug not found"
		});
		return;
	}
	Dir
		.findOne({customId: "directory"})
		.select('drugs')
		.exec(
			function(err, dir){
				var thisDrug;
				if(!dir){
					sendJsonResponse(res, 404,{
						"message": "Directory not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(dir.drugs && dir.drugs.length > 0){
					thisDrug = dir.drugs.id(req.params.drugid);
					if(!thisDrug)	{
						sendJsonResponse(res, 404,{
							"message": "Drugid not found"
						});
					}	else {
						thisDrug.name = req.body.name;
						thisDrug.shelfLife = req.body.shelfLife;
						thisDrug.cost = req.body.cost;
						thisDrug.pack = req.body.pack;
						thisDrug.actSubstance = req.body.actSubstance;
						thisDrug.analogs = req.body.analogs.join(', ');
						thisDrug.manual = req.body.manual;
						thisDrug.pharmGroup = req.body.pharmGroup;
						thisDrug.img = req.body.img;
						dir.save(function(err, dir) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisDrug);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No drugs to update"
					});
				}
			}
		);
};



/*  Delete item  */

module.exports.doDeleteItem = function(req, res){
	if(!req.params.drugid){
		sendJsonResponse(res, 404,{
			"message": "Drug not found"
		});
		return;
	}
	Dir
		.findOne({customId: "directory"})
		.select('drugs')
		.exec(
			function(err, dir){
				var thisDrug;
				if(!dir){
					sendJsonResponse(res, 404,{
						"message": "Directory not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(dir.drugs && dir.drugs.length > 0)	{
					if(!dir.drugs.id(req.params.drugid))	{
						sendJsonResponse(res, 404,{
							"message": "Drugid not found"
						});
					}	else {
						dir.drugs.id(req.params.drugid).remove();
						dir.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No drugs to delete"
					});
				}
			}
		);
};