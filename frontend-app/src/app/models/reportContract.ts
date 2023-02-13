export class ReportContract{
	_id: String;
    contractNumber: Number;
    conclusionDate: Date;
    startExecDate: Date;
    supplierName: String;
    contractStatus: String;
    deliveryType: String;
    contractDrugs: [{
		name: String;
    	cost: Number;
    	quantity: Number;
	}];
    deliveryFrequency: Number;
    maxDeliveryDuration: Number;
    deliveryCount: Number;
	currDeliveryCount: Number;
	deliveries: [{
		deliveryNumber: Number;
    	contractNumber: Number;
    	creatingDate: Date;
    	deliveryDate: Date;
    	deliveryStatus: String;
	}];
}