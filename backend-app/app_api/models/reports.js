var mongoose = require('mongoose')

var saleDrugSchema = new mongoose.Schema({
	drugName: String,
	drugCost: Number,
	drugQuantity: Number
});

var contractDrugsSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    quantity: Number
});

var deliverySchema = new mongoose.Schema({
	deliveryNumber: {type: Number},
    contractNumber: {type: String, required: true},
    creatingDate: {type: Date, required: true},
    deliveryDate: Date,
    deliveryStatus: String
});

var contractSchema = new mongoose.Schema({
	contractNumber: {type: Number, required: true},
    conclusionDate: {type: Date, required: true},
    startExecDate: {type: Date, required: true},
    supplierName: {type: String},
    contractStatus: {type: String},
    deliveryType: {type: String, required: true},
    contractDrugs: [contractDrugsSchema],
    deliveryFrequency: {type: Number, required: true},
    maxDeliveryDuration: {type: Number, required: true},
    deliveryCount: {type: Number, required: true},
	currDeliveryCount: {type: Number},
	deliveries: [deliverySchema]
});


var salesSchema = new mongoose.Schema({
	saleNumber: Number,
	saleDate: {type: Date, "default": new Date()},
	saleUser: String,
	finishCost: Number,
	drugs: [saleDrugSchema]
},{
    versionKey: false
});

var writeOffSchema = new mongoose.Schema({
	count: Number,
	name: String,
	transactionNumber: Number,
	madeDate: Date,
	shelfLife: Number,
	checkDir: Boolean,
	reason: String,
});

var reportsSchema = new mongoose.Schema({
	customId: String,
	editDate: Date,
	editUser: String,
	contracts: [contractSchema],
	sales: [salesSchema],
	writeOff: [writeOffSchema],
	returns: [writeOffSchema]
});

mongoose.model('Reports', reportsSchema, 'reports');




// db.reports.save({
// 	customId: 'reports',
// 	editDate: new Date(),
// 	editUser: 'Карпович О.Г.',
// 	contracts: [],
// 	sales: [],
// 	writeOff: [],
// 	returns: []
// });