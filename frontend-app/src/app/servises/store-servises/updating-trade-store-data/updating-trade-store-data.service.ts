import { Injectable } from '@angular/core';
import { HttpActionsService } from "../../../servises/http-actions/http-actions.service";
import { Store } from "../../../models/store";
import { SharingStoreDataService } from '../sharing-store-data.service';

@Injectable()
export class UpdatingTradeStoreDataService {

  private tradeStore: Store;
  private baseTradeStore: Store;

  constructor(private sharingStoreDataService: SharingStoreDataService,
              private httpActionsService: HttpActionsService
  ) { }

  updateData(){
    let currDate = new Date().getTime();
    this.httpActionsService.getTradeStoreData()
    .subscribe(store => {
      this.tradeStore = store;
      for(let i = 0; i < this.tradeStore.storeItems.length; i++){
        if(currDate >= (new Date(this.tradeStore.storeItems[i].madeDate).getTime() + (<number>this.tradeStore.storeItems[i].shelfLife * 86400000))){
          this.httpActionsService.addWriteOffData(this.tradeStore.storeItems[i]).subscribe(dr => {
            this.httpActionsService.deleteTradeItem(this.tradeStore.storeItems[i]._id).subscribe(item => {
              this.httpActionsService.getTradeStoreData()
              .subscribe(str => {
                this.baseTradeStore = str;
                this.sharingStoreDataService.changeStoreData(this.baseTradeStore);
              });
            });
          });
        }
        if(this.tradeStore.storeItems[i].count == 0){
          this.httpActionsService.deleteTradeItem(this.tradeStore.storeItems[i]._id).subscribe(item => {
            this.httpActionsService.getTradeStoreData()
            .subscribe(str => {
              this.baseTradeStore = str;
              this.sharingStoreDataService.changeStoreData(this.baseTradeStore);
            });
          });
        }  
      }
    });
  }
}
