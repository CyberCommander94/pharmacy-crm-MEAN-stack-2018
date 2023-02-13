import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/store'
import { Directory } from '../../../models/directory'
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingStoreDataService } from '../../../servises/store-servises/sharing-store-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.css']
})
export class StoreMainComponent implements OnInit {
  
  private title: String = "Склад прийому поставок";
  private headBtnsVisibility: Boolean = true;
  private addBtn: Boolean = true;
  private nameSort: String = "unactive-sort";
  private transactionNumSort: String = "unactive-sort";
  private dateSort: String = "unactive-sort";
  private topSort: Boolean = false;
  private filterStr = {str: ""};

  private directory: Directory;
  private baseStore: Store;
  private accStore: Store;

  constructor(private httpActionsService: HttpActionsService,
              private sharingStoreDataService: SharingStoreDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.httpActionsService.getAccStoreData().subscribe(str => {
      this.baseStore = str;
      this.checkDirectoryNames(this.baseStore);
      this.sharingStoreDataService.changeStoreData(this.baseStore);
      this.sharingStoreDataService.strCurrentData.subscribe(store => {
        this.accStore = store;
      });
    });
  }

  checkDirectoryNames(accStore: Store){
    let names: [String];
    let directory: Directory;
    let checkDirectory: Boolean = false;
    this.httpActionsService.getDirectoryData().subscribe(dir => {
      directory = dir;
      for(let accItem of accStore.storeItems){
        for(let drugsItem of directory.drugs){
          if(accItem.name.toLocaleLowerCase() == drugsItem.name.toLocaleLowerCase()){
            accItem.checkDir = true;
          }
        }
      }
    });
  }

  editItem(itemId){
    this.router.navigate(['storeAcceptance/editItem/' + itemId]);
  }

  deleteItem(itemId){
    let acc = confirm(`Ви дійсно хочете видалити препарат зі складу поставок?`);
    if(acc){
      this.httpActionsService.deleteAccItem(itemId)
      .subscribe(item => {
        this.httpActionsService.getAccStoreData()
        .subscribe(str => {
        this.baseStore = str;
        this.sharingStoreDataService.changeStoreData(this.baseStore);
        this.checkDirectoryNames(this.baseStore);
          this.sharingStoreDataService.strCurrentData.subscribe(store => {
            this.accStore = store;
          });
        });
      });
    } else {
      return;
    }
  }

  moveItemToTrade(itemId, checkDir){
    if(!checkDir){
      alert("Даного препарату немає у довіднику системи! Додайте, будь ласка, дані про даний препарат у довідник.");
      return;
    }
    else {
      this.httpActionsService.getDirectoryData()
      .subscribe(dir => {
        this.directory = dir;
        for(let drug of this.accStore.storeItems){
          if(drug._id == itemId && drug.madeDate){
            if(drug.madeDate){
              for(let item of this.directory.drugs){
                if(item.name.toLocaleLowerCase() == drug.name.toLocaleLowerCase()){
                drug.shelfLife = item.shelfLife;
                  this.httpActionsService.addTradeData(drug).subscribe(dr => {
                    this.httpActionsService.deleteAccItem(itemId).subscribe(acc => {
                      this.httpActionsService.getAccStoreData()
                      .subscribe(str => {
                        this.checkDirectoryNames(str);
                        this.sharingStoreDataService.changeStoreData(str);
                        this.sharingStoreDataService.strCurrentData.subscribe(st => this.accStore = st);
                      });
                    });
                  });
                  break;
                }
              }
            }
            else {
              alert("Спочатку введіть дату виготовлення препарату");
              return;
            }
          }
        }
      });
    } 
  }

  moveItemToWriteOff(itemId, checkDir){
    if(!checkDir){
      alert("Даного препарату немає у довіднику системи! Додайте, будь ласка, дані про даний препарат у довідник.");
      return;
    }
    else{
      this.httpActionsService.getDirectoryData().subscribe(dir => {
      this.directory = dir;
      for(let drug of this.accStore.storeItems){
        if(drug._id == itemId){
          for(let item of this.directory.drugs){
            if(item.name.toLocaleLowerCase() == drug.name.toLocaleLowerCase()){
              drug.shelfLife = item.shelfLife;
              this.httpActionsService.addWriteOffData(drug).subscribe(dr => {
                this.httpActionsService.deleteAccItem(itemId).subscribe(acc => {
                  this.httpActionsService.getAccStoreData()
                  .subscribe(str => {
                    this.checkDirectoryNames(str);
                    this.sharingStoreDataService.changeStoreData(str);
                    this.sharingStoreDataService.strCurrentData.subscribe(st => this.accStore = st);
                  });
                });
              });
              break;
            }
          }
          break;
        }
      }
    });
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
