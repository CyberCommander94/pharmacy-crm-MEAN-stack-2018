var mongoose = require('mongoose');
var Store = mongoose.model('Store');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.writeoffStore = function(req, res){
	Store
		.findOne({customId: "writeOffStore"})
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

/*  Add storeItems To Write-off Store  */

var addItem = function(req, res, str){
	if(!str){
		sendJsonResponse(res, 404,{
			"message": "Store not found"
		});
	} else {
		str.storeItems.push({
			name: req.body.name,
			transactionNumber: req.body.transactionNumber,
			count: req.body.count,
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

module.exports.writeOffStoreAdd = function(req, res){
	Store
	.findOne({customId: "writeOffStore"})
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

/*  Delete Drug From Write-off Store  */

module.exports.doDeleteItem = function(req, res){
	if(!req.params.itemid){
		sendJsonResponse(res, 404,{
			"message": "Item not found"
		});
		return;
	}
	Store
	.findOne({customId: "writeOffStore"})
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


// db.store.find({title: "Склад списання"}).pretty()