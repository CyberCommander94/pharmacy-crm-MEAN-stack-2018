export class Supplies{
    editDate: Date;
    editUser: String;
    suppliers: {
        name: String;
        address: String;
        phone: String;
        email: String;
        drugs: {
            name: String;
            cost: Number;
        }[];
    }[];
    contracts: {
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
    }[];
    delivery: {
        _id: String;
        deliveryNumber: Number;
        contractNumber: Number;
        creatingDate: Date;
        deliveryDate: Date;
        deliveryStatus: String;
    }[];
}