var mongoose = require('mongoose');
var Store = mongoose.model('Store');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.tradeStore = function(req, res){
	Store
	.findOne({customId: "tradeStore"})
		.exec(function(err, str) {
		if(!str){
			sendJsonResponse(res, 404,{
				"message": "Store not found"
			});
			return;

		} else if(err){
			sendJsonResponse(res, 400, err);
			return;
		}
		sendJsonResponse(res, 200, str);
	});
};

/*  Add storeItems To Trade Store  */

var addItem = function(req, res, str){
	if(!str){
		sendJsonResponse(res, 404,{
			"message": "Store not found"
		});
	} else {
		str.storeItems.push({
			name: req.body.name,
			count: req.body.count,
			transactionNumber: req.body.transactionNumber,
			madeDate: new Date(req.body.madeDate),
			shelfLife: req.body.shelfLife
		});
		str.save(function(err, str){
			var thisItem;
			if(err){
				sendJsonResponse(res, 400, err);
			}	else {
				thisItem = str.storeItems[str.storeItems.length - 1];
				sendJsonResponse(res, 201, thisItem);
			}
		});
	}
};

module.exports.tradeStoreAdd = function(req, res){
	Store
	.findOne({customId: "tradeStore"})
		.select('storeItems')
		.exec(
			function(err, str){
				if(err){
					sendJsonResponse(res, 400, err);
				} else {
					addItem(req, res, str);
				}
		}
	);
};

/*  Delete Drug From Trade Store  */

module.exports.doDeleteItem = function(req, res){
	if(!req.params.itemid){
		sendJsonResponse(res, 404,{
			"message": "Item not found"
		});
		return;
	}
	Store
	.findOne({customId: "tradeStore"})
		.select('storeItems')
		.exec(
			function(err, str){
				var thisItem;
				if(!str){
					sendJsonResponse(res, 404,{
						"message": "Store not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(str.storeItems && str.storeItems.length > 0)	{
					if(!str.storeItems.id(req.params.itemid))	{
						sendJsonResponse(res, 404,{
							"message": "itemid not found"
						});
					}	else {
						str.storeItems.id(req.params.itemid).remove();
						str.save(function(err) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, null);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No storeItems to delete"
					});
				}
			}
		);
};

module.exports.doEditItem = function(req, res){
	if(!req.params.itemid){
		sendJsonResponse(res, 404,{
			"message": "Item not found"
		});
		return;
	}
	Store
		.findOne({customId: "tradeStore"})
		.select('storeItems')
		.exec(
			function(err, str){
				var thisItem;
				if(!str){
					sendJsonResponse(res, 404,{
						"message": "store not found"
					});
					return;
				} else if(err){
					sendJsonResponse(res, 404, err);
					return;
				}
				if(str.storeItems && str.storeItems.length > 0){
					thisItem = str.storeItems.id(req.params.itemid);
					if(!thisItem)	{
						sendJsonResponse(res, 404,{
							"message": "itemid not found"
						});
					}	else {
						thisItem.name = req.body.name,
						thisItem.count = req.body.count,
						thisItem.transactionNumber = req.body.transactionNumber,
						thisItem.madeDate = req.body.madeDate,
						thisItem.shelfLife = req.body.shelfLife,
						str.save(function(err, str) {
							if(err){
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, thisItem);
							}
						});
					}	
				} else {
					sendJsonResponse(res, 404,{
						"message": "No storeItems to update"
					});
				}
			}
		);
};


// db.store.find({title: "Склад реалізації"}).pretty()