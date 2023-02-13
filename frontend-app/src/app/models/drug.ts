export class Drug {
  name: String;
  shelfLife: String;
  cost: Number;
  pack: String;
  actSubstance: String;
  analogs: String[];
  manual: String;
  pharmGroup: String;
  regDate: Date;
  img:{
    type: String;
    data: Number[];
  };
}