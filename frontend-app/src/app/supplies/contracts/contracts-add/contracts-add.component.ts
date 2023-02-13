import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service';
import { Supplies } from '../../../models/supplies/supplies';
import { SupplierDrug } from '../../../models/supplies/supplierDrug';
import { Contract } from '../../../models/supplies/contract';
import { Reports } from '../../../models/reports';
import { ReportContract } from '../../../models/reportContract';
import { ContractDrug } from '../../../models/supplies/contractDrug';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contracts-add',
  templateUrl: './contracts-add.component.html',
  styleUrls: ['./contracts-add.component.css']
})
export class ContractsAddComponent implements OnInit {

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
  private reports: Reports;
  private reportContract: ReportContract;


  constructor(private fb: FormBuilder,
              private router: Router,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.finishedContract = {contractDrugs: []} as Contract;
    this.sharingSuppliesDataService.suppCurrentData.subscribe(supp=> this.supplies = supp);
    let newForm = this.fb.group({
      contractNumber: ['', [Validators.required]],
      conclusionDate: ['', [Validators.required]],
      startExecDate: ['', [Validators.required]],
      supplierName: ['', [Validators.required]],
      deliveryType: ['', [Validators.required]],
      deliveryFrequency: ['', [Validators.required]],
      maxDeliveryDuration: ['', [Validators.required]],
      deliveryCount: ['', [Validators.required]],
      formArray: this.fb.array([])
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    this.inputArray.forEach(item => {
      let newGroup = this.fb.group({
          name: ['', [Validators.required]],
          cost: ['', [Validators.required]],
          quantity: ['', [Validators.required]]
      });
      arrayControl.push(newGroup);
    });

    this.myForm = newForm;
  }

  addInput(){
    let supplier = this.myForm.value.supplierName;
    if(supplier){
      const arrayControl = <FormArray>this.myForm.controls['formArray'];
      let newGroup = this.fb.group({
        name: ['', [Validators.required]],
        cost: ['', [Validators.required]],
        quantity: ['', [Validators.required]]
      });
      arrayControl.push(newGroup);
    } else {
      alert("Оберіть постачальника!!!");
      return;
    }
  }

  delInput(index: number){
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    arrayControl.removeAt(index);
  }

  onSubmit(){
    this.finishedContract = {contractDrugs: []} as Contract;
    this.reportContract = {contractDrugs: [], deliveries: []} as ReportContract;
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
    let concDateStr = this.finishedContract.conclusionDate;
    let startExecDateStr = this.finishedContract.startExecDate;
    let element = String(concDateStr).split('-');
    this.finishedContract.conclusionDate = new Date(element[2] + "-" + element[1] + "-" + element[0]);
    element = String(startExecDateStr).split('-');
    this.finishedContract.startExecDate = new Date(element[2] + "-" + element[1] + "-" + element[0]);
    this.httpActionsService.addContract(this.finishedContract)
    .subscribe(cont => {
      this.httpActionsService.getReportsData().subscribe(rep => {
        this.reports = rep;
        this.reportContract.conclusionDate = this.finishedContract.conclusionDate;
        for(let i = 0; i < this.finishedContract.contractDrugs.length; i++){
          this.contractDrug = {} as ContractDrug;
          this.contractDrug.name = this.finishedContract.contractDrugs[i].name;
          this.contractDrug.cost = this.finishedContract.contractDrugs[i].cost;
          this.contractDrug.quantity = this.finishedContract.contractDrugs[i].quantity;
          this.reportContract.contractDrugs.push(this.contractDrug);
        }
        this.reportContract.contractNumber = this.finishedContract.contractNumber;
        this.reportContract.contractStatus = this.finishedContract.contractStatus;
        this.reportContract.currDeliveryCount = this.finishedContract.currDeliveryCount;
        this.reportContract.deliveryCount = this.finishedContract.deliveryCount;
        this.reportContract.deliveryFrequency = this.finishedContract.deliveryFrequency;
        this.reportContract.deliveryType = this.finishedContract.deliveryType;
        this.reportContract.maxDeliveryDuration = this.finishedContract.maxDeliveryDuration;
        this.reportContract.startExecDate = this.finishedContract.startExecDate;
        this.reportContract.supplierName = this.finishedContract.supplierName;
        this.reports.contracts.push(this.reportContract);
        this.httpActionsService.editReports(this.reports).subscribe(re => {
          this.httpActionsService.getSuppliesData()
          .subscribe(supp => {
            this.baseSupplies = supp;
            this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
            this.router.navigate(['/contracts/main']);
          });
        });
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
