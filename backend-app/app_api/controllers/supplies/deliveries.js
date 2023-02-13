var mongoose = require('mongoose');
var Supp = mongoose.model('Supplies');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.deleteDelivery = function(req, res){
	if(!req.params.deliveryId){
		sendJsonResponse(res, 404,{
			"message": "Delivery not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('delivery')
		.exec(
			function(err, del){
				var thisDel;
				if(!del){
					sendJsonResponse(res, 404,{
						"message": "deliveries not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(del.delivery && del.delivery.length > 0)	{
					if(!del.delivery.id(req.params.deliveryId))	{
						sendJsonResponse(res, 404,{
							"message": "Delivery id not found"
						});
					}	else {
						del.delivery.id(req.params.deliveryId).remove();
						del.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No deliveries to delete"
					});
				}
			}
		);
};

var doAddDelivery = function(req, res, sup){
	if(!sup){
		sendJsonResponse(res, 404,{
			"message": "supplies not found"
		});
	} else {
		sup.delivery.push({
			deliveryNumber: req.body.deliveryNumber,
			contractNumber: req.body.contractNumber,
			creatingDate: req.body.creatingDate,
    		deliveryDate: req.body.deliveryDate,
    		deliveryStatus: req.body.deliveryStatus
		});
		sup.save(function(err, sup){
			var thisDel;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisDel = sup.delivery[sup.delivery.length - 1];
				sendJsonResponse(res, 201, thisDel);
			}
		});
	}
};

module.exports.addDelivery = function(req, res){
	Supp
		.findOne({customId: "supplies"})
		.select('delivery')
		.exec(
			function(err, sup){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddDelivery(req, res, sup);
				}
			}
	);
};

module.exports.editDelivery = function(req, res){
	if(!req.params.deliveryId){
		sendJsonResponse(res, 404,{
			"message": "Delivery not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('delivery')
		.exec(
			function(err, sup){
				var thisDel;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "suplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.delivery && sup.delivery.length > 0){
					thisDel = sup.delivery.id(req.params.deliveryId);
					if(!thisDel)	{
						sendJsonResponse(res, 404,{
							"message": "Delivery id not found"
						});
					}	else {
						thisDel.deliveryNumber = req.body.deliveryNumber;
						thisDel.contractNumber = req.body.contractNumber;
    					thisDel.deliveryDate = req.body.deliveryDate;
    					thisDel.deliveryStatus = req.body.deliveryStatus;
						sup.save(function(err, sup) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisDel);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No deliveries to update"
					});
				}
			}
		);
};