var mongoose = require('mongoose');
var Supp = mongoose.model('Supplies');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var doAddContract = function(req, res, con){
	if(!con){
		sendJsonResponse(res, 404,{
			"message": "contracts not found"
		});
	} else {
		con.contracts.push({
			contractNumber: req.body.contractNumber,
			conclusionDate: req.body.conclusionDate,
			startExecDate: req.body.startExecDate,
    		supplierName: req.body.supplierName,
    		contractStatus: req.body.contractStatus,
    		deliveryType: req.body.deliveryType,
    		contractDrugs: req.body.contractDrugs,
    		deliveryFrequency: req.body.deliveryFrequency,
    		maxDeliveryDuration: req.body.maxDeliveryDuration,
			contractDuration: req.body.contractDuration,
			deliveryCount: req.body.deliveryCount,
   			currDeliveryCount: 0
		});
		con.save(function(err, con){
			var thisCont;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisCont = con.contracts[con.contracts.length - 1];
				sendJsonResponse(res, 201, thisCont);
			}
		});
	}
};

module.exports.addContract = function(req, res){
	Supp
		.findOne({customId: "supplies"})
		.select('contracts')
		.exec(
			function(err, con){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddContract(req, res, con);
				}
			}
	);
};

module.exports.viewContractInfo = function(req, res){
	if(req.params && req.params.contractId){
		Supp
			.findOne({customId: "supplies"})
			.exec(function(err, sup) {
			if(!sup){
				sendJsonResponse(res, 404,{
					"message": "suplies not found"
				});
				return;

			} else if(err){
				sendJsonResponse(res, 400, err);
				return;
			}
			var info;
			info = sup.contracts.id(req.params.contractId);
			if(!info){
				sendJsonResponse(res, 404,{
					"message": "Drug not found"
				});
				return;
			}
			sendJsonResponse(res, 200, info);
		});
	} else {
		sendJsonResponse(res, 404,{
			"message": "No drugid in request"
		});
	}
};

module.exports.editContract = function(req, res){
	if(!req.params.contractId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('contracts')
		.exec(
			function(err, sup){
				var thisCont;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "suplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.contracts && sup.contracts.length > 0){
					thisCont = sup.contracts.id(req.params.contractId);
					if(!thisCont)	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					}	else {
						thisCont.contractNumber = req.body.contractNumber;
						thisCont.conclusionDate = req.body.conclusionDate;
						thisCont.startExecDate = req.body.startExecDate,
    					thisCont.supplierName = req.body.supplierName;
    					thisCont.contractStatus = req.body.contractStatus;
    					thisCont.deliveryType = req.body.deliveryType;
    					thisCont.contractDrugs = req.body.contractDrugs;
    					thisCont.deliveryFrequency = req.body.deliveryFrequency;
    					thisCont.maxDeliveryDuration = req.body.maxDeliveryDuration;
    					thisCont.deliveryCount = req.body.deliveryCount;
    					thisCont.currDeliveryCount = req.body.currDeliveryCount;
						sup.save(function(err, sup) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisCont);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No contracts to update"
					});
				}
			}
		);
};

module.exports.deleteContract = function(req, res){
	if(!req.params.contractId){
		sendJsonResponse(res, 404,{
			"message": "Contract not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('contracts')
		.exec(
			function(err, sup){
				var thisCont;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "supplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.contracts && sup.contracts.length > 0)	{
					if(!sup.contracts.id(req.params.contractId))	{
						sendJsonResponse(res, 404,{
							"message": "Contract id not found"
						});
					}	else {
						sup.contracts.id(req.params.contractId).remove();
						sup.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No contracts to delete"
					});
				}
			}
		);
};