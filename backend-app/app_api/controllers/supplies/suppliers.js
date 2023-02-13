var mongoose = require('mongoose');
var Supp = mongoose.model('Supplies');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.supplies = function(req, res){
	Supp
		.findOne({customId: "supplies"})
		.exec(function(err, sup) {
		if(!sup){
			sendJsonResponse(res, 404,{
				"message": "Store not found"
			});
			return;

		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, sup);
	});
};


module.exports.viewSupplierInfo = function(req, res){
	if(req.params && req.params.supplierId){
		Supp
			.findOne({customId: "supplies"})
			.exec(function(err, sup) {
			if(!sup){
				sendJsonResponse(res, 404,{
					"message": "supectory not found"
				});
				return;

			} else if(err){
				sendJsonResponse(res, 400, err);
				return;
			}
			var info;
			info = sup.suppliers.id(req.params.supplierId);
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

var doAddSupplier = function(req, res, sup){
	if(!sup){
		sendJsonResponse(res, 404,{
			"message": "supectory not found"
		});
	} else {
		sup.suppliers.push({
			name: req.body.name,
    		address: req.body.address,
    		phone: req.body.phone,
    		email: req.body.email,
    		drugs: []
		});
		sup.save(function(err, sup){
			var thisSupp;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisSupp = sup.suppliers[sup.suppliers.length - 1];
				sendJsonResponse(res, 201, thisSupp);
			}
		});
	}
};

module.exports.addSupplier = function(req, res){
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				if(err){
					sendJsonResponse(res, 400, err);
				}	else {
					doAddSupplier(req, res, sup);
				}
			}
	);
};

module.exports.editSupplier = function(req, res){
	if(!req.params.supplierId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				var thisSupp;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "suplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.suppliers && sup.suppliers.length > 0){
					thisSupp = sup.suppliers.id(req.params.supplierId);
					if(!thisSupp)	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					}	else {
						thisSupp.name = req.body.name;
    					thisSupp.address = req.body.address,
    					thisSupp.phone = req.body.phone,
    					thisSupp.email = req.body.email,
						sup.save(function(err, sup) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisSupp);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No suppliers to update"
					});
				}
			}
		);
};

module.exports.deleteSupplier = function(req, res){
	if(!req.params.supplierId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				var thisSupp;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "supplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.suppliers && sup.suppliers.length > 0)	{
					if(!sup.suppliers.id(req.params.supplierId))	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					}	else {
						sup.suppliers.id(req.params.supplierId).remove();
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
						"message": "No drugs to delete"
					});
				}
			}
		);
};


module.exports.addSupplierDrug = function(req, res){
	if(!req.params.supplierId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				var thisSupp;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "supplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.suppliers && sup.suppliers.length > 0){
					thisSupp = sup.suppliers.id(req.params.supplierId);
					if(!thisSupp)	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					} else {
						thisSupp.drugs.push({
							name: req.body.name,
							cost: req.body.cost,
						});
						sup.save(function(err, sup){
							var thisSupp;
							if(err){
								sendJsonResponse(res, 400, err);
							}	else {
								sendJsonResponse(res, 201, thisSupp);
							}
						});
					}
				}
			}
		);
}

module.exports.editSupplierDrug = function(req, res){
	if(!req.params.supplierId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	if(!req.params.drugId){
		sendJsonResponse(res, 404,{
			"message": "Supplier drug not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				var thisSupp;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "suplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.suppliers && sup.suppliers.length > 0){
					thisSupp = sup.suppliers.id(req.params.supplierId);
					thisDrug = thisSupp.drugs.id(req.params.drugId);
					if(!thisSupp)	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					} else if(!thisDrug){
						sendJsonResponse(res, 404,{
							"message": "Supplier drug id not found"
						});
					} else {
						thisDrug.name = req.body.name;
    					thisDrug.cost = req.body.cost,
						sup.save(function(err, sup) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisSupp);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No suppliers to update"
					});
				}
			}
		);
}

module.exports.deleteSupplierDrug = function(req, res){
	if(!req.params.supplierId){
		sendJsonResponse(res, 404,{
			"message": "Supplier not found"
		});
		return;
	}
	if(!req.params.drugId){
		sendJsonResponse(res, 404,{
			"message": "Supplier drug not found"
		});
		return;
	}
	Supp
		.findOne({customId: "supplies"})
		.select('suppliers')
		.exec(
			function(err, sup){
				var thisSupp;
				if(!sup){
					sendJsonResponse(res, 404,{
						"message": "suplies not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(sup.suppliers && sup.suppliers.length > 0)	{
					if(!sup.suppliers.id(req.params.supplierId))	{
						sendJsonResponse(res, 404,{
							"message": "Supplier id not found"
						});
					}	else {
						var thisSup = sup.suppliers.id(req.params.supplierId);
						thisSup.drugs.id(req.params.drugId).remove();
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
						"message": "No drugs to delete"
					});
				}
			}
		);
}