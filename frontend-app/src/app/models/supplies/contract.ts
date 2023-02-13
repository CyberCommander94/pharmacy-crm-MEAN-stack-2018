export class Contract{
    _id: String;
    contractNumber: Number;
    conclusionDate: Date;
    startExecDate: Date;
    supplierName: String;
    contractStatus: String;
    deliveryType: String;
    contractDrugs: {
        name: String;
        cost: Number;
        quantity: Number;
    }[];
    deliveryFrequency: Number;
    maxDeliveryDuration: Number;
    deliveryCount: Number;
    currDeliveryCount: Number;
}