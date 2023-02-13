export class Reports{
    customId: String;
	editDate: Date;
	editUser: String;
	contracts: {
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
	}[];
	sales: {
		_id: String;
        saleNumber: Number;
	    saleDate: Date;
	    saleUser: String;
	    finishCost: Number;
	    drugs: {
            drugName: String;
	        drugCost: Number;
	        drugQuantity: Number;
        }[];
    }[];
	writeOff: {
		_id: any;
		count: Number;
		name: String;
		transactionNumber: Number;
		madeDate: Date;
		shelfLife: Number;
		checkDir: Boolean;
		reason: String;
	}[];
	returns: {
		_id: any;
		count: Number;
		name: String;
		transactionNumber: Number;
		madeDate: Date;
		shelfLife: Number;
		checkDir: Boolean;
		reason: String;
	}[];
}