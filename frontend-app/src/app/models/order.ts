export class Order{
    saleNumber: Number;
    saleDate: Date;
    saleUser: String;
    finishCost: Number;
    drugs: {
        drugName: String;
        drugCost: Number;
        drugQuantity: Number;
    }[];
}