import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store'
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'
import { SharingStoreDataService } from '../../servises/store-servises/sharing-store-data.service'
import { UpdatingTradeStoreDataService } from '../../servises/store-servises/updating-trade-store-data/updating-trade-store-data.service'

@Component({
  selector: 'app-store-trade',
  templateUrl: './store-trade.component.html',
  styleUrls: ['./store-trade.component.css'],
  providers: [HttpActionsService,
              SharingStoreDataService, 
              UpdatingTradeStoreDataService
  ]
})
export class StoreTradeComponent implements OnInit {


  private addBtn: Boolean = false;
  private title: String = "Склад реалізації"
  private baseStore: Store;
  private tradeStore: Store;
  private nameSort: String = "unactive-sort";
  private transactionNumSort: String = "unactive-sort";
  private dateSort: String = "unactive-sort";
  private topSort: Boolean = false;
  private filterStr = {str: ""};
  private headBtnsVisibility: Boolean = true;

  constructor(private httpActionsService: HttpActionsService,
              private sharingStoreDataService: SharingStoreDataService,
              private updatingTradeStoreDataService: UpdatingTradeStoreDataService
  ) { }

  ngOnInit() {
    this.updatingTradeStoreDataService.updateData();
    this.httpActionsService.getTradeStoreData()
    .subscribe(str => {
      this.tradeStore = str;
    });
  }

  moveItemToWriteOff(itemId){
    for(let drug of this.tradeStore.storeItems){
      if(drug._id == itemId){
        this.httpActionsService.addWriteOffData(drug).subscribe(dr => {
          this.httpActionsService.deleteTradeItem(itemId).subscribe(acc => {
            this.httpActionsService.getTradeStoreData()
              .subscribe(str => {
                this.sharingStoreDataService.changeStoreData(str);
                this.sharingStoreDataService.strCurrentData.subscribe(st => this.tradeStore = st);
              });
          });
        });
        break;
      }
    }
  }

  private compareCostToTop(drugA: any, drugB: any) {
    return drugA.transactionNumber - drugB.transactionNumber;
  };

  private compareCostToBottom(drugA: any, drugB: any) {
    return drugB.transactionNumber - drugA.transactionNumber;
  };

  private compareDateToTop(drugA: any, drugB: any) {
    if(drugA.madeDate > drugB.madeDate){
      return 1;
    } else if(drugA.madeDate < drugB.madeDate){
      return -1;
    }
    return 0;
  };

  private compareDateToBottom(drugA: any, drugB: any) {
    if(drugA.madeDate < drugB.madeDate){
      return 1;
    } else if(drugA.madeDate > drugB.madeDate){
      return -1;
    }
    return 0;
  };

  private compareNameToTop(drugA: any, drugB: any) {
    if(drugA.name > drugB.name){
      return 1;
    } else if(drugA.name < drugB.name){
      return -1;
    }
    return 0;
  };

  private compareNameToBottom(drugA: any, drugB: any) {
    if(drugA.name < drugB.name){
      return 1;
    } else if(drugA.name > drugB.name){
      return -1;
    }
    return 0;
  };

  sortNameAct(store: Store){
    this.nameSort = "active-sort";
    this.transactionNumSort = "unactive-sort";
    this.dateSort = "unactive-sort";
    let mas = store.storeItems;
    if(this.topSort){
      mas.sort(this.compareNameToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareNameToTop);
      this.topSort = true;
    }
    store.storeItems = mas;
    this.sharingStoreDataService.changeStoreData(store);
  }

  sortTransNumAct(store: Store){
    this.nameSort = "unactive-sort";
    this.transactionNumSort = "active-sort";
    this.dateSort = "unactive-sort";
    let mas = store.storeItems;
    if(this.topSort){
      mas.sort(this.compareCostToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareCostToTop);
      this.topSort = true;
    }
    store.storeItems = mas;
    this.sharingStoreDataService.changeStoreData(store);
  }

  sortDateAct(store: Store){
    this.nameSort = "unactive-sort";
    this.transactionNumSort = "unactive-sort";
    this.dateSort = "active-sort";
    let mas = store.storeItems;
    if(this.topSort){
      mas.sort(this.compareDateToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareDateToTop);
      this.topSort = true;
    }
    store.storeItems = mas;
    this.sharingStoreDataService.changeStoreData(store);
  }

}
