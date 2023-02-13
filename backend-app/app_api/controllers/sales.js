var mongoose = require('mongoose');
var Sale = mongoose.model('Sales');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};



/*  sale  */

module.exports.getSale = function(req, res){
	Sale
		.findById(req.params.saleId)
		.exec(function(err, sale) {
		if(!sale){
			sendJsonResponse(res, 404,{
				"message": "Sales not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, sale);
	});
};

/*  sales  */

module.exports.getSales = function(req, res){
	Sale
		.find()
		.exec(function(err, sales) {
		if(!sales){
			sendJsonResponse(res, 404,{
				"message": "Sales not found"
			});
			return;
		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, sales);
	});
};


/*  Add item  */

module.exports.addSale = function(req, res){
	var data = new Sale();
	data.saleNumber = req.body.saleNumber;
	data.saleUser = req.body.saleUser;
	data.finishCost = req.body.finishCost;
	if(req.body.drugs){
		data.drugs = req.body.drugs;
	}
	if(req.body.saleDate){
		data.saleDate = req.body.saleDate;
	}
	data.save(function(err){
		if(err){
			sendJsonResponse(res, 400, err);
		}	else {
			sendJsonResponse(res, 201, "Created");
		}
	});
};



/*  Edit item  */

module.exports.editSale = function(req, res){
	Sale
		.findById(req.params.saleId)
		.exec(
			function(err, sale){
				var thisSale;
				if(!sale){
					sendJsonResponse(res, 404,{
						"message": "Sale not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sale){
					thisSale = sale;
					thisSale.saleNumber = req.body.saleNumber;
					thisSale.saleUser = req.body.saleUser;
					thisSale.finishCost = req.body.finishCost;
					thisSale.drugs = req.body.drugs;
					sale.save(function(err, sale) {
						if(err){
							sendJsonResponse(res, 404, err);
						} else {
							sendJsonResponse(res, 200, thisSale);
						}
					});	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No sales to update"
					});
				}
			}
		);
};



/*  Delete item  */

module.exports.deleteSale = function(req, res){
	Sale
		.findById(req.params.saleId)
		.exec(
			function(err, sale){
				if(!sale){
					sendJsonResponse(res, 404,{
						"message": "Sales not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sale){
					sale.remove(function(err) {
						if(err){
							sendJsonResponse(res, 404, err);
						} else {
							sendJsonResponse(res, 200, null);
						}
					});	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No sales to delete"
					});
				}
			}
		);
};