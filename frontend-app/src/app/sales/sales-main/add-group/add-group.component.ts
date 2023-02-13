import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order } from '../../../models/order';
import { OrderDrug } from '../../../models/orderDrug';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  private selectedDrugName: String;
  private selectedDrugQuant: Number;
  private selectedDrugCost: Number;

  @Input() myForm: FormGroup;

  @Input() tradeDrugs: OrderDrug[];

  constructor() { }

  ngOnInit() {
    this.selectedDrugName = this.myForm.value.drugName;
    for(let i = 0; i < this.tradeDrugs.length; i++){
      if(this.tradeDrugs[i].drugName == this.selectedDrugName){
        this.selectedDrugCost = this.tradeDrugs[i].drugCost;
        this.myForm.controls["drugCost"].patchValue(this.selectedDrugCost, {onlySelf: true});
        break;
      }
    }
  }

  onChangeDrugName(){
    this.selectedDrugName = this.myForm.value.drugName;
    for(let i = 0; i < this.tradeDrugs.length; i++){
      if(this.tradeDrugs[i].drugName == this.selectedDrugName){
        this.selectedDrugCost = this.tradeDrugs[i].drugCost;
        this.selectedDrugQuant = this.tradeDrugs[i].drugQuantity;
        this.myForm.controls["drugCost"].patchValue(this.selectedDrugCost, {onlySelf: true});
        break;
      }
    }
  }

}
