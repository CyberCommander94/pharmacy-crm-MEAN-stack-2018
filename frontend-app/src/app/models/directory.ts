export class Directory{
    title: String;
	editDate: Date;
	editUser: String;
	drugs: {
        name: String;
	    shelfLife: Number;
	    cost: Number;
	    pack: String;
	    actSubstance: String;
	    analogs: String[];
	    manual: String;
	    pharmGroup: String;
	    regDate: Date;
        img: {
			type: String;
			data: Number[];
		};
    }[];
}