export class Supplier{
    name: String;
    address: String;
    phone: String;
    email: String;
    drugs: {
        _id: String;
        name: String;
        cost: Number;
    }[];
}