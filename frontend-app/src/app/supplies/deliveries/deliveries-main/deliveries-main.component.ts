import { Component, OnInit } from '@angular/core';
import { Supplies } from '../../../models/supplies/supplies'
import { StoreItem } from '../../../models/storeItem'
import { Delivery } from '../../../models/supplies/delivery'
import { Store } from '../../../models/store'
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { UpdateDeliveriesService } from '../../../servises/supplies-servises/updatingDeliveriesData/update-deliveries.service'
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Router } from '@angular/router';
import { SharingStoreDataService } from '../../../servises/store-servises/sharing-store-data.service';
import { Reports } from '../../../models/reports';
import { ReportContract } from '../../../models/reportContract';
import { ContractDeliveryReport } from '../../../models/contractDeliveryReport';

@Component({
  selector: 'app-deliveries-main',
  templateUrl: './deliveries-main.component.html',
  styleUrls: ['./deliveries-main.component.css']
})
export class DeliveriesMainComponent implements OnInit {

  constructor(private httpActionsService: HttpActionsService,
              private sharingStoreDataService: SharingStoreDataService,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private router: Router,
              private updateDeliveriesService: UpdateDeliveriesService
  ) { }

  private title: String = "Доставки";
  private headBtnsVisibility: Boolean = false;
  private suppliesData: Supplies;
  private baseSuppliesData: Supplies;
  private addBtn: Boolean = true;
  private storeItem: StoreItem;
  private baseStore: Store;
  private newDelivery: Delivery;
  private editDeliveryId: String;
  private reports: Reports;
  private reportContract: ReportContract;
  private contractDeliveryReport: ContractDeliveryReport;

  ngOnInit() {
    this.storeItem = {} as StoreItem;
    this.newDelivery = {} as Delivery;
    this.httpActionsService.getSuppliesData().subscribe(sup => {
      this.updateDeliveriesService.updateDeliveriesData();
      this.updateDeliveriesService.updateContractsStatus();
      this.updateDeliveriesService.updateContractsDeliveriesData()
      this.httpActionsService.getSuppliesData().subscribe(supp => { 
        this.suppliesData = supp;
      });
    });
  }

  doComplete(deliveryNumber: Number, contractNumber: Number, deliveryId: String){
    this.reportContract = {contractDrugs: [], deliveries: []} as ReportContract;
    this.contractDeliveryReport = {} as ContractDeliveryReport;
    for(let i = 0; i < this.suppliesData.contracts.length; i++){
      if(this.suppliesData.contracts[i].contractNumber == contractNumber){
        for(let j = 0; j < this.suppliesData.contracts[i].contractDrugs.length; j++){
          this.storeItem.transactionNumber = deliveryNumber;
          this.storeItem.name = this.suppliesData.contracts[i].contractDrugs[j].name;
          this.storeItem.count = this.suppliesData.contracts[i].contractDrugs[j].quantity;
          this.storeItem.madeDate = this.suppliesData.contracts[i].conclusionDate;
          this.httpActionsService.addAccStoreItem(this.storeItem)
          .subscribe(it => {
            this.httpActionsService.getAccStoreData()
            .subscribe(str => {
              this.baseStore = str;
              this.sharingStoreDataService.changeStoreData(this.baseStore);
            });
          });
        }
        this.httpActionsService.getReportsData().subscribe(rep => {
          this.reports = rep;
          for(let k = 0; k < this.suppliesData.delivery.length; k++){
            if(this.suppliesData.delivery[k]._id == deliveryId){
              for(let p = 0; p < this.reports.contracts.length; p++){
                if(this.reports.contracts[p].contractNumber == this.suppliesData.delivery[k].contractNumber){
                  this.contractDeliveryReport.contractNumber = this.suppliesData.delivery[k].contractNumber;
                  this.contractDeliveryReport.creatingDate = this.suppliesData.delivery[k].creatingDate;
                  this.contractDeliveryReport.deliveryDate = new Date();
                  this.contractDeliveryReport.deliveryNumber = this.suppliesData.delivery[k].deliveryNumber;
                  this.contractDeliveryReport.deliveryStatus = this.suppliesData.delivery[k].deliveryStatus;
                  this.reports.contracts[p].deliveries.push(this.contractDeliveryReport);
                  break;
                }
              }
            }
          }
          this.httpActionsService.editReports(this.reports).subscribe(repo => {
            this.httpActionsService.deleteDelivery(deliveryId)
            .subscribe(item => {
              this.httpActionsService.getSuppliesData()
              .subscribe(supp => {
                this.baseSuppliesData = supp;
                this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
                this.sharingSuppliesDataService.suppCurrentData.subscribe(sup => {
                  this.suppliesData = sup;
                });
              });
            });
          });
        });   
      }
    }
  }

  editDataObj(itemId: String){
    for(let del of this.suppliesData.delivery){
      if(del._id == itemId){
        this.newDelivery.contractNumber = del.contractNumber;
        this.newDelivery.deliveryStatus = del.deliveryStatus;
        this.editDeliveryId = itemId;
        var form = document.getElementsByClassName("pop-up-edit-form")[0];
        form.classList.remove("unactive");
        form.classList.add("active");
        break;
      }
    }
  }

  closeBtn(){
    var form = document.getElementsByClassName("pop-up-edit-form")[0];
    form.classList.remove("active");
    form.classList.add("unactive");
  }

  editDelivery(deliveryId){
    this.httpActionsService.editDelivery(this.newDelivery, deliveryId)
    .subscribe(sup => {
      this.httpActionsService.getSuppliesData()
      .subscribe(str => {
        this.baseSuppliesData = str;
        this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
        this.suppliesData = str;
        this.closeBtn();
      });
    });
  }

  viewContract(contractNum){
    for(let i = 0; i < this.suppliesData.contracts.length; i++){
      if(this.suppliesData.contracts[i].contractNumber == contractNum){
        this.router.navigate(['contracts/viewContractInfo/' + this.suppliesData.contracts[i]._id])
      }
    }
  }
}
