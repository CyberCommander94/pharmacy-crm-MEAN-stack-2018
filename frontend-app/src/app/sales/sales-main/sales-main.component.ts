import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service';
import { Router } from '@angular/router';
import { Directory } from '../../models/directory';
import { Store } from '../../models/store';
import { Order } from '../../models/order';
import { OrderDrug } from '../../models/orderDrug';
import { SharingSalesDataService } from '../../servises/sales-servises/sharing-sales-data.service';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent implements OnInit {

  @Input() inputArray: {}[] = [];
  myForm: FormGroup;
  private newOrder: Order;
  private sales: any;
  private store: Store;
  private directory: Directory;
  private orderDrug: OrderDrug;
  private tradeDrugs: OrderDrug[] = [];
  private title: String = "Продаж: оформлення замовлення";

  constructor(private fb: FormBuilder,
              private router: Router,
              private sharingSalesDataService: SharingSalesDataService,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.orderDrug = {} as OrderDrug;
    this.newOrder = {} as Order;
    this.newOrder.drugs = [];
    this.sharingSalesDataService.saleCurrentData.subscribe(sale => this.sales = sale);
    let newForm = this.fb.group({
      formArray: this.fb.array([])
    });

    this.httpActionsService.getTradeStoreData()
    .subscribe(str => {
      this.store = str;
      this.httpActionsService.getDirectoryData()
      .subscribe(dir => {
        this.directory = dir;
        this.orderDrug.drugQuantity = 0;
        for(let i = 0; i < this.directory.drugs.length; i++){
          this.orderDrug.drugName = this.directory.drugs[i].name;
          for(let j = 0; j < this.store.storeItems.length; j++){
            if(this.store.storeItems[j].name == this.orderDrug.drugName){
              this.orderDrug.drugCost = this.directory.drugs[i].cost;
              this.orderDrug.drugQuantity = <number>this.orderDrug.drugQuantity + <number>this.store.storeItems[j].count;
            }
          }
          this.tradeDrugs.push(this.orderDrug);
          this.orderDrug = {} as OrderDrug;
          this.orderDrug.drugQuantity = 0;
        }   
      }); 
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    this.inputArray.forEach(item => {
      let newGroup = this.fb.group({
        drugName: ['', [Validators.required]],
        drugCost: ['', [Validators.required]],
        drugQuantity: ['', [Validators.required]]
      });
      arrayControl.push(newGroup);
    });

    this.myForm = newForm;
  }

  addInput(){
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    let newGroup = this.fb.group({
      drugName: ['', [Validators.required]],
      drugCost: ['', [Validators.required]],
      drugQuantity: ['', [Validators.required]]
    });
    arrayControl.push(newGroup);
  }

  delInput(index: number){
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    arrayControl.removeAt(index);
  }

  onSubmit(){
      this.newOrder.saleNumber = new Date().getTime();
      this.newOrder.saleDate = new Date();
      this.newOrder.saleUser = "Карпович О.Г.";
      this.newOrder.finishCost = 0;
      for(let i = 0; i < this.myForm.value.formArray.length; i++){
        this.orderDrug = {} as OrderDrug;
        this.orderDrug.drugName = this.myForm.value.formArray[i].drugName;
        this.orderDrug.drugQuantity = <number>this.myForm.value.formArray[i].drugQuantity;
        this.orderDrug.drugCost = <number>this.myForm.value.formArray[i].drugCost;
        this.newOrder.finishCost = ((<number>this.newOrder.finishCost * 100) + (<number>this.orderDrug.drugQuantity * (<number>this.orderDrug.drugCost * 100))) / 100;
        this.newOrder.drugs.push(this.orderDrug);
      }
      this.httpActionsService.addSaleData(this.newOrder)
      .subscribe(sales => {
        this.httpActionsService.getSalesData()
        .subscribe(sale => {
          this.sales = sale;
          this.sharingSalesDataService.changeSalesData(this.sales);
          this.router.navigate(['/sales/basket']);
        });
      });
  }
}
