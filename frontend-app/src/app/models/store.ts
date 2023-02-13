export class Store{
    title: String;
	editDate: Date;
	editUser: String;
    storeItems: {
        _id: any;
        count: Number;
        name: String;
        transactionNumber: Number;
        madeDate: Date;
        shelfLife: Number;
        checkDir: Boolean;
    }[];
}
