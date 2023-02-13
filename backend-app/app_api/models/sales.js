var mongoose = require('mongoose')

var saleDrugSchema = new mongoose.Schema({
	drugName: String,
	drugCost: Number,
	drugQuantity: Number
});


var saleSchema = new mongoose.Schema({
	saleNumber: Number,
	saleDate: {type: Date, "default": new Date()},
	saleUser: String,
	finishCost: Number,
	drugs: [saleDrugSchema],
},{
    versionKey: false
});

mongoose.model('Sales', saleSchema, 'sales');




// db.sales.save({
// 	saleNumber: 1243,
// 	saleDate: new Date(),
// 	saleUser: "Карпович О.Г.",
// 	finishCost: 120,
// 	drugs: [{
// 		drugName: "Солікс",
// 		grugCost: 60,
// 		drugQuantity: 2
// 	}]
// })