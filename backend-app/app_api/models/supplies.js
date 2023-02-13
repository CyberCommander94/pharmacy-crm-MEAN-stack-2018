var mongoose = require('mongoose')

var deliverySchema = new mongoose.Schema({
    deliveryNumber: {type: Number},
    contractNumber: {type: String, required: true},
    creatingDate: {type: Date, required: true},
    deliveryDate: Date,
    deliveryStatus: String
});

var contractDrugsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    quantity: {type: Number, required: true, min: 1}
});

var contractsSchema = new mongoose.Schema({
    contractNumber: {type: Number, required: true},
    conclusionDate: {type: Date, required: true},
    startExecDate: {type: Date, required: true},
    supplierName: {type: String},// , required: true
    contractStatus: {type: String, "default": "Активний"},
    deliveryType: {type: String, required: true},
    contractDrugs: [contractDrugsSchema],
    deliveryFrequency: {type: Number, required: true},
    maxDeliveryDuration: {type: Number, required: true},
    deliveryCount: {type: Number, required: true},
    currDeliveryCount: {type: Number, "default": 0}
});

var suppDrugsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true, min: 0}
});

var suppliersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: String,
    drugs: [suppDrugsSchema]
});

var suppliesSchema = new mongoose.Schema({
    customId: String,
    editDate: Date,
    editUser: String,
    suppliers: [suppliersSchema],
    contracts: [contractsSchema],
    delivery: [deliverySchema]
});

mongoose.model('Supplies', suppliesSchema, 'supplies');












// db.supplies.save({
//    customId: "supplies",
//    editDate: new Date(),
//    editUser: "Карпович О.Г.",
//    suppliers: [{
//      _id: new ObjectId(),
//      name: "Полісся фарм",
//      address: "м. Житомир, вул. Промислова 30",
//      phone: "099-99-99-999",
//      email: "polissia@mail.com",
//      drugs: [{
//          _id: new ObjectId(),
//          name: "Анальгін",
//          cost: "20"
//      },{
//          _id: new ObjectId(),
//          name: "Бромгексин",
//          cost: "40"
//      }]
//    }],
//    contracts: [],
//    delivery: []
// })