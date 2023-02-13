var mongoose = require('mongoose');
var Repo = mongoose.model('Reports');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};


module.exports.editReports = function(req, res){
	Repo
	.findOne({customId: "reports"})
		.exec(function(err, rep) {
		if(!rep){
			sendJsonResponse(res, 404,{
				"message": "Reports not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		rep.contracts = req.body.contracts;
		rep.sales = req.body.sales;
		rep.writeOff = req.body.writeOff;
		rep.returns = req.body.returns;
		rep.save(function(err, sup) {
			if(err){
				sendJsonResponse(res, 404, err);
			} else {
				sendJsonResponse(res, 200, rep);
			}
		});
	});
};

module.exports.getReports = function(req, res){
	Repo
	.findOne({customId: "reports"})
		.exec(function(err, rep) {
		if(!rep){
			sendJsonResponse(res, 404,{
				"message": "Reports not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, rep);
	});
};

var doAddSalesReport = function(req, res, rep){
	if(!rep){
		sendJsonResponse(res, 404,{
			"message": "Reports not found"
		});
	} else {
		rep.sales.push({
			saleNumber: req.body.saleNumber,
			saleDate: req.body.saleDate,
			saleUser: req.body.saleUser,
			finishCost: req.body.finishCost,
			drugs: req.body.drugs
		});
		rep.save(function(err, rep){
			var thisRepo;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisRepo = rep.sales[rep.sales.length - 1];
				sendJsonResponse(res, 201, thisRepo);
			}
		});
	}
};

module.exports.addSalesReport = function(req, res){
	Repo
		.findOne({customId: "reports"})
		.select('sales')
		.exec(
			function(err, rep){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddSalesReport(req, res, rep);
				}
			}
	);
};

module.exports.deleteSalesReport = function(req, res){
	if(!req.params.reportId){
		sendJsonResponse(res, 404,{
			"message": "Report not found"
		});
		return;
	}
	Repo
		.findOne({customId: "reports"})
		.select('sales')
		.exec(
			function(err, rep){
				if(!rep){
					sendJsonResponse(res, 404,{
						"message": "Reports not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(rep.sales && rep.sales.length > 0)	{
					if(!rep.sales.id(req.params.reportId))	{
						sendJsonResponse(res, 404,{
							"message": "Report id not found"
						});
					}	else {
						rep.sales.id(req.params.reportId).remove();
						rep.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No reports to delete"
					});
				}
			}
		);
};

var doAddWriteOffReport = function(req, res, rep){
	if(!rep){
		sendJsonResponse(res, 404,{
			"message": "Reports not found"
		});
	} else {
		rep.writeOff.push({
			count: req.body.count,
			name: req.body.name,
			transactionNumber: req.body.transactionNumber,
			madeDate: req.body.madeDate,
			shelfLife: req.body.shelfLife,
			checkDir: req.body.checkDir,
			reason: req.body.reason
		});
		rep.save(function(err, rep){
			var thisRepo;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisRepo = rep.writeOff[rep.writeOff.length - 1];
				sendJsonResponse(res, 201, thisRepo);
			}
		});
	}
};

module.exports.addWriteOffReport = function(req, res){
	Repo
		.findOne({customId: "reports"})
		.select('writeOff')
		.exec(
			function(err, rep){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddWriteOffReport(req, res, rep);
				}
			}
	);
};

module.exports.deleteWriteOffReport = function(req, res){
	if(!req.params.reportId){
		sendJsonResponse(res, 404,{
			"message": "Report not found"
		});
		return;
	}
	Repo
		.findOne({customId: "reports"})
		.select('writeOff')
		.exec(
			function(err, rep){
				if(!rep){
					sendJsonResponse(res, 404,{
						"message": "Reports not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(rep.writeOff && rep.writeOff.length > 0)	{
					if(!rep.writeOff.id(req.writeOff.reportId))	{
						sendJsonResponse(res, 404,{
							"message": "Report id not found"
						});
					}	else {
						rep.writeOff.id(req.params.reportId).remove();
						rep.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No reports to delete"
					});
				}
			}
		);
};

var doAddReturnReport = function(req, res, rep){
	if(!rep){
		sendJsonResponse(res, 404,{
			"message": "Reports not found"
		});
	} else {
		rep.returns.push({
			count: req.body.count,
			name: req.body.name,
			transactionNumber: req.body.transactionNumber,
			madeDate: req.body.madeDate,
			shelfLife: req.body.shelfLife,
			checkDir: req.body.checkDir,
			reason: req.body.reason
		});
		rep.save(function(err, rep){
			var thisRepo;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisRepo = rep.returns[rep.returns.length - 1];
				sendJsonResponse(res, 201, thisRepo);
			}
		});
	}
};

module.exports.addReturnReport = function(req, res){
	Repo
		.findOne({customId: "reports"})
		.select('returns')
		.exec(
			function(err, rep){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddReturnReport(req, res, rep);
				}
			}
	);
};

module.exports.deleteReturnReport = function(req, res){
	if(!req.params.reportId){
		sendJsonResponse(res, 404,{
			"message": "Report not found"
		});
		return;
	}
	Repo
		.findOne({customId: "reports"})
		.select('returns')
		.exec(
			function(err, rep){
				if(!rep){
					sendJsonResponse(res, 404,{
						"message": "Reports not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(rep.returns && rep.returns.length > 0)	{
					if(!rep.returns.id(req.returns.reportId))	{
						sendJsonResponse(res, 404,{
							"message": "Report id not found"
						});
					}	else {
						rep.returns.id(req.params.reportId).remove();
						rep.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No reports to delete"
					});
				}
			}
		);
};