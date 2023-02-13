import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SupplierDrug } from '../../../../models/supplies/supplierDrug';

@Component({
  selector: 'app-add-sub-group',
  templateUrl: './add-sub-group.component.html',
  styleUrls: ['./add-sub-group.component.css']
})
export class AddSubGroupComponent implements OnInit {

  private selectedDrugName: String;
  private selectedDrugCost: Number;
  constructor() { }

  @Input() myForm: FormGroup;

  @Input() selectedSupplierDrugs: SupplierDrug[];

  ngOnInit() {
    this.selectedDrugName = this.myForm.value.name;
    for(let i = 0; i < this.selectedSupplierDrugs.length; i++){
      if(this.selectedSupplierDrugs[i].name == this.selectedDrugName){
        this.selectedDrugCost = this.selectedSupplierDrugs[i].cost;
        this.myForm.controls["cost"].patchValue(this.selectedDrugCost, {onlySelf: true});
        break;
      }
    }
  }

  onChangeDrugName(){
    this.selectedDrugName = this.myForm.value.name;
    for(let i = 0; i < this.selectedSupplierDrugs.length; i++){
      if(this.selectedSupplierDrugs[i].name == this.selectedDrugName){
        this.selectedDrugCost = this.selectedSupplierDrugs[i].cost;
        this.myForm.controls["cost"].patchValue(this.selectedDrugCost, {onlySelf: true});
        break;
      }
    }
  }

}
