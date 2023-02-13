import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service';
import { Supplies } from '../../../models/supplies/supplies';
import { SupplierDrug } from '../../../models/supplies/supplierDrug';
import { Contract } from '../../../models/supplies/contract';
import { ContractDrug } from '../../../models/supplies/contractDrug';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contracts-edit',
  templateUrl: './contracts-edit.component.html',
  styleUrls: ['./contracts-edit.component.css']
})
export class ContractsEditComponent implements OnInit {

  @Input() inputArray: {}[] = [];

  myForm: FormGroup;
  private title: String = "Додати новий договір";
  private headBtnsVisibility: Boolean = false;
  private supplies: Supplies;
  private selectedSupplier: String;
  private selectedDelType: String;
  private selectedSupplierDrugs: SupplierDrug[];
  private finishedContract: Contract;
  private contractDrug: ContractDrug;
  private baseSupplies: Supplies;
  private contractId: String;

  constructor(private fb: FormBuilder,
              private router: Router,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private httpActionsService: HttpActionsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get('id');
    this.sharingSuppliesDataService.suppCurrentData.subscribe(supp=> this.supplies = supp);
    this.httpActionsService.getContractInfo(this.contractId).subscribe(cont => {
      this.finishedContract = cont;
      for(let i = 0; i < this.supplies.suppliers.length; i++){
        if(this.supplies.suppliers[i].name == this.finishedContract.supplierName){
          this.selectedSupplierDrugs = this.supplies.suppliers[i].drugs;
          break;
        }
      }
      let newForm = this.fb.group({
        contractNumber: [this.finishedContract.contractNumber, [Validators.required]],
        conclusionDate: [this.finishedContract.conclusionDate, [Validators.required]],
        startExecDate: [this.finishedContract.startExecDate, [Validators.required]],
        supplierName: [this.finishedContract.supplierName, [Validators.required]],
        deliveryType: [this.finishedContract.deliveryType, [Validators.required]],
        deliveryFrequency: [this.finishedContract.deliveryFrequency, [Validators.required]],
        maxDeliveryDuration: [this.finishedContract.maxDeliveryDuration, [Validators.required]],
        deliveryCount: [this.finishedContract.deliveryCount, [Validators.required]],
        formArray: this.fb.array([])
      });
      
      const arrayControl = <FormArray>newForm.controls['formArray'];
      this.finishedContract.contractDrugs.forEach(item => {
        let newGroup = this.fb.group({
            name: [item.name, [Validators.required]],
            cost: [item.cost, [Validators.required]],
            quantity: [item.quantity, [Validators.required]]
        });
        arrayControl.push(newGroup);
      });

      this.myForm = newForm;
      this.myForm.controls.supplierName.disable();
      this.selectedDelType = this.myForm.value.deliveryType;
      if(this.selectedDelType == "Одноразова"){
        this.myForm.controls.deliveryFrequency.setValue(this.myForm.value.maxDeliveryDuration);
        this.myForm.controls.deliveryCount.setValue(1);
        this.myForm.controls.deliveryFrequency.disable();
        this.myForm.controls.deliveryCount.disable();
      } else 
        if(this.selectedDelType == "Періодична"){
          this.myForm.controls.deliveryFrequency.patchValue(undefined);
          this.myForm.controls.deliveryCount.patchValue(undefined);
          this.myForm.controls.deliveryFrequency.enable();
          this.myForm.controls.deliveryCount.enable();
        }
    });
  }

  addInput(){
    this.myForm.controls.supplierName.enable();
    let supplier = this.myForm.value.supplierName;
    if(supplier){
      const arrayControl = <FormArray>this.myForm.controls['formArray'];
      let newGroup = this.fb.group({
        name: ['', [Validators.required]],
        cost: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      });
      arrayControl.push(newGroup);
      this.myForm.controls.supplierName.disable();
    } else {
      alert("Оберіть постачальника!!!");
      return;
    }
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    arrayControl.removeAt(index);
  }

  onSubmit(): void {
    this.myForm.controls.supplierName.enable();
    this.myForm.controls.deliveryFrequency.enable();
    this.myForm.controls.deliveryCount.enable();
    this.finishedContract.contractNumber = <Number>this.myForm.value.contractNumber;
    this.finishedContract.conclusionDate = this.myForm.value.conclusionDate;
    this.finishedContract.startExecDate = this.myForm.value.startExecDate;
    this.finishedContract.supplierName = this.myForm.value.supplierName;
    this.finishedContract.contractStatus = "Активний";
    this.finishedContract.deliveryType = this.myForm.value.deliveryType;
    this.finishedContract.deliveryFrequency = <Number>this.myForm.value.deliveryFrequency;
    this.finishedContract.maxDeliveryDuration = <Number>this.myForm.value.maxDeliveryDuration;
    this.finishedContract.deliveryCount = <Number>this.myForm.value.deliveryCount;
    for(let i = 0; i < this.myForm.value.formArray.length; i++){
      this.contractDrug = {} as ContractDrug;
      this.contractDrug.name = this.myForm.value.formArray[i].name;
      this.contractDrug.cost = <Number>this.myForm.value.formArray[i].cost;
      this.contractDrug.quantity = <Number>this.myForm.value.formArray[i].quantity;
      this.finishedContract.contractDrugs.push(this.contractDrug);
    }
    this.httpActionsService.editContractInfo(this.finishedContract, this.contractId)
    .subscribe(cont => {
      this.httpActionsService.getSuppliesData()
      .subscribe(supp => {
        this.baseSupplies = supp;
        this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
        this.router.navigate(['/contracts/main']);
      });
    });
  }

  onChangeSupplier(){
    this.selectedSupplier = this.myForm.value.supplierName;
    for(let i = 0; i < this.supplies.suppliers.length; i++){
      if(this.supplies.suppliers[i].name == this.selectedSupplier){
        this.selectedSupplierDrugs = this.supplies.suppliers[i].drugs;
        break;
      }
    }
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    for(let i = 0; i < arrayControl.length;){
      arrayControl.removeAt(i);
    }
    this.myForm.reset({
      supplierName: this.selectedSupplier,
      deliveryType: ""
    });
  }

  onChangeDeliveryType(){
    this.selectedDelType = this.myForm.value.deliveryType;
    if(this.selectedDelType == "Одноразова"){
      this.myForm.controls.deliveryFrequency.setValue(this.myForm.value.maxDeliveryDuration);
      this.myForm.controls.deliveryCount.setValue(1);
      this.myForm.controls.deliveryFrequency.disable();
      this.myForm.controls.deliveryCount.disable();
    } else 
      if(this.selectedDelType == "Періодична"){
        this.myForm.controls.deliveryFrequency.patchValue(undefined);
        this.myForm.controls.deliveryCount.patchValue(undefined);
        this.myForm.controls.deliveryFrequency.enable();
        this.myForm.controls.deliveryCount.enable();
      }
  }

}
