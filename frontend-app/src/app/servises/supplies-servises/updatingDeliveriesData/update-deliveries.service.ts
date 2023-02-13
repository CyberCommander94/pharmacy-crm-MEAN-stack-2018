import { Injectable } from '@angular/core';
import { Supplies } from "../../../models/supplies/supplies";
import { Delivery } from "../../../models/supplies/delivery";
import { Contract } from "../../../models/supplies/contract";
import { HttpActionsService } from "../../../servises/http-actions/http-actions.service";
import { SharingSuppliesDataService } from '../sharing-supplies-data.service';

@Injectable()
export class UpdateDeliveriesService {

  constructor(private httpActionsService: HttpActionsService,
              private sharingSuppliesDataService: SharingSuppliesDataService
  ) { }

  private suppliesData: Supplies;
  private baseSupplies: Supplies;
  private contract: Contract;
  private deliveryItem: Delivery;
  private currDate: Date = new Date();
  
  updateDeliveriesData(){
    let currDateMs = this.currDate.getTime();
    this.deliveryItem = {} as Delivery;
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.suppliesData = supp;
      for(let i = 0; i < this.suppliesData.delivery.length; i++){
        for(let j = 0; j < this.suppliesData.contracts.length; j++){
          let createDate = new Date(this.suppliesData.delivery[i].creatingDate);
          let createDateMs = createDate.getTime();
          if(this.suppliesData.contracts[j].contractNumber == this.suppliesData.delivery[i].contractNumber && this.suppliesData.contracts[j].contractStatus == "Активний"){
            if(currDateMs >= createDateMs + <number>this.suppliesData.contracts[j].maxDeliveryDuration * 86400000 && this.suppliesData.delivery[i].deliveryStatus == "Очікується поставка"){
              this.deliveryItem.contractNumber = this.suppliesData.delivery[i].contractNumber;
              this.deliveryItem.deliveryNumber = this.suppliesData.delivery[i].deliveryNumber;
              this.deliveryItem.deliveryStatus = "Не доставлено в термін. Очікується поставка";
              this.deliveryItem.deliveryDate = this.suppliesData.delivery[i].deliveryDate;
              this.deliveryItem.creatingDate = this.suppliesData.delivery[i].creatingDate;
              this.httpActionsService.editDelivery(this.deliveryItem, this.suppliesData.delivery[i]._id)
              .subscribe(del => {
                this.httpActionsService.getSuppliesData()
                  .subscribe(str => {
                    this.baseSupplies = str;
                    this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
                  });
              }); 
            }
          }
          if(this.suppliesData.contracts[j].contractNumber == this.suppliesData.delivery[i].contractNumber && this.suppliesData.contracts[j].contractStatus == "Закритий"){
            if(currDateMs >= createDateMs + <number>this.suppliesData.contracts[j].maxDeliveryDuration * 86400000 && this.suppliesData.delivery[i].deliveryStatus == "Не доставлено в термін. Очікується поставка" && this.suppliesData.contracts[j].contractStatus == "Закритий"){
              this.deliveryItem.contractNumber = this.suppliesData.delivery[i].contractNumber;
              this.deliveryItem.deliveryNumber = this.suppliesData.delivery[i].deliveryNumber;
              this.deliveryItem.deliveryStatus = "Не доставлено";
              this.deliveryItem.deliveryDate = this.suppliesData.delivery[i].deliveryDate;
              this.deliveryItem.creatingDate = this.suppliesData.delivery[i].creatingDate;
              this.httpActionsService.editDelivery(this.deliveryItem, this.suppliesData.delivery[i]._id)
              .subscribe(del => {
                this.httpActionsService.getSuppliesData()
                  .subscribe(str => {
                    this.baseSupplies = str;
                    this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
                  });
              }); 
            }
            if(currDateMs >= createDateMs + <number>this.suppliesData.contracts[j].maxDeliveryDuration * 86400000 && this.suppliesData.delivery[i].deliveryStatus == "Очікується поставка" && this.suppliesData.contracts[j].contractStatus == "Закритий"){
              this.deliveryItem.contractNumber = this.suppliesData.delivery[i].contractNumber;
              this.deliveryItem.deliveryNumber = this.suppliesData.delivery[i].deliveryNumber;
              this.deliveryItem.deliveryStatus = "Не доставлено";
              this.deliveryItem.deliveryDate = this.suppliesData.delivery[i].deliveryDate;
              this.deliveryItem.creatingDate = this.suppliesData.delivery[i].creatingDate;
              this.httpActionsService.editDelivery(this.deliveryItem, this.suppliesData.delivery[i]._id)
              .subscribe(del => {
                this.httpActionsService.getSuppliesData()
                  .subscribe(str => {
                    this.baseSupplies = str;
                    this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
                  });
              }); 
            }
          } 
        }
      }
    });
  }

  updateContractsStatus(){
    let currDateMs = this.currDate.getTime();
    this.deliveryItem = {} as Delivery;
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.suppliesData = supp;
      for(let i = 0; i < this.suppliesData.contracts.length; i++){
        let startExecDate = new Date(this.suppliesData.contracts[i].startExecDate);
        if(currDateMs >= startExecDate.getTime() + (((<number>this.suppliesData.contracts[i].deliveryCount - 1) * <number>this.suppliesData.contracts[i].deliveryFrequency) + <number>this.suppliesData.contracts[i].maxDeliveryDuration) * 86400000){
          this.suppliesData.contracts[i].contractStatus = "Закритий";
          this.httpActionsService.editContractInfo(this.suppliesData.contracts[i], this.suppliesData.contracts[i]._id).subscribe( con => {
            this.httpActionsService.getSuppliesData()
            .subscribe(str => {
              this.baseSupplies = str;
              this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
            });
          });  
        }
      }
    });
  }

  updateContractsDeliveriesData(){
    let currDateMs = this.currDate.getTime();
    this.deliveryItem = {} as Delivery;
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.suppliesData = supp;
      for(let i = 0; i < this.suppliesData.contracts.length; i++){
        if(this.suppliesData.contracts[i].contractStatus == "Активний"){
          let startExec = new Date(this.suppliesData.contracts[i].startExecDate);
          let startDateMs = startExec.getTime();
          let start = startDateMs + <any>this.suppliesData.contracts[i].deliveryFrequency * 86400000 * <any>this.suppliesData.contracts[i].currDeliveryCount;
          let finish = startDateMs + (<any>this.suppliesData.contracts[i].maxDeliveryDuration * 86400000) + <any>this.suppliesData.contracts[i].deliveryFrequency * 86400000 * <any>this.suppliesData.contracts[i].currDeliveryCount;
          if(currDateMs >= start && currDateMs <= finish && this.suppliesData.contracts[i].currDeliveryCount < this.suppliesData.contracts[i].deliveryCount){   
            if(this.suppliesData.delivery.length > 0){
              let find = false;
              for(let j = 0; j < this.suppliesData.delivery.length; j++){
                if(this.suppliesData.delivery[j].contractNumber == this.suppliesData.contracts[i].contractNumber && this.suppliesData.delivery[j].deliveryStatus == "Очікується поставка"){
                  find = true;
                  break;
                }
              }
              if(find == false){
                this.contract = this.suppliesData.contracts[i];
                this.contract.currDeliveryCount = <any>this.contract.currDeliveryCount + 1;
                this.deliveryItem.contractNumber = this.suppliesData.contracts[i].contractNumber;
                this.deliveryItem.deliveryNumber = undefined;
                this.deliveryItem.deliveryStatus = "Очікується поставка";
                this.deliveryItem.deliveryDate = undefined;
                this.deliveryItem.creatingDate = new Date();
                var month;
                if((this.deliveryItem.creatingDate.getMonth() + 1) < 10){
                  month = "0" + (this.deliveryItem.creatingDate.getMonth() + 1);
                }
                this.deliveryItem.creatingDate = new Date(this.deliveryItem.creatingDate.getFullYear() + "-" + month + "-" + this.deliveryItem.creatingDate.getDate());
                this.httpActionsService.addDelivery(this.deliveryItem)
                .subscribe(it => {
                  this.httpActionsService.editContractInfo(this.contract, this.contract._id).subscribe( con => {
                    this.httpActionsService.getSuppliesData()
                    .subscribe(str => {
                      this.baseSupplies = str;
                      this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
                    });
                  });  
                });
              }
            } else {
              this.contract = this.suppliesData.contracts[i];
              this.contract.currDeliveryCount = <any>this.contract.currDeliveryCount + 1;
              this.deliveryItem.contractNumber = this.suppliesData.contracts[i].contractNumber;
              this.deliveryItem.deliveryNumber = undefined;
              this.deliveryItem.deliveryStatus = "Очікується поставка";
              this.deliveryItem.deliveryDate = undefined;
              this.deliveryItem.creatingDate = new Date();
              var month;
              if((this.deliveryItem.creatingDate.getMonth() + 1) < 10){
                month = "0" + (this.deliveryItem.creatingDate.getMonth() + 1);
              }
              this.deliveryItem.creatingDate = new Date(this.deliveryItem.creatingDate.getFullYear() + "-" + month + "-" + this.deliveryItem.creatingDate.getDate());
              this.httpActionsService.addDelivery(this.deliveryItem)
              .subscribe(it => {
                this.httpActionsService.editContractInfo(this.contract, this.contract._id).subscribe( con => {
                  this.httpActionsService.getSuppliesData()
                  .subscribe(str => {
                    this.baseSupplies = str;
                    this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
                  });
                });  
              });
            }
          }
        } 
      }
    });
  }
}