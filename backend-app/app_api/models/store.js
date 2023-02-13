var mongoose = require('mongoose')

var storeItemSchema = new mongoose.Schema({
	name: {type: String, required: true},
	count: {type: Number,  required: true, min: 0, "default": 0},
    transactionNumber: {type: Number, required: true, min: 1},
	madeDate: Date,
	shelfLife: {type: Number},
	checkDir: {type: Boolean, "default": false}
});

var storeSchema = new mongoose.Schema({
	customId: String,
	title: {type: String, required: true},
	editDate: Date,
	editUser: String,
	storeItems: [storeItemSchema]
});

mongoose.model('Store', storeSchema, 'store');




// db.store.save({
// 	title: 'Склад прийому поставок',
// 	customId: 'acceptanceStore',
// 	editDate: new Date(),
// 	editUser: 'Карпович О.Г.',
// 	storeItems: []
// })

// db.store.save({
// 	title: 'Склад реалізації',
// 	customId: 'tradeStore',
// 	editDate: new Date(),
// 	editUser: 'Карпович О.Г.',
// 	storeItems: []
// })

// db.store.save({
// 	title: 'Склад списання',
// 	customId: 'writeOffStore',
// 	editDate: new Date(),
// 	editUser: 'Карпович О.Г.',
// 	storeItems: []
// })