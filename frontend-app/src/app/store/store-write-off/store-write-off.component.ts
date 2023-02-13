import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store'
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'
import { SharingStoreDataService } from '../../servises/store-servises/sharing-store-data.service'
import { WriteOffDrug } from '../../models/writeOffDrug'

@Component({
  selector: 'app-store-write-off',
  templateUrl: './store-write-off.component.html',
  styleUrls: ['./store-write-off.component.css'],
  providers: [HttpActionsService,
              SharingStoreDataService
  ]
})
export class StoreWriteOffComponent implements OnInit {

  private addBtn: Boolean = false;
  private title: String = "Склад списання"
  private writeOffStore: Store;
  private nameSort: String = "unactive-sort";
  private transactionNumSort: String = "unactive-sort";
  private dateSort: String = "unactive-sort";
  private topSort: Boolean = false;
  private filterStr = {str: ""};
  private headBtnsVisibility: Boolean = true;
  private writeOffDrug: WriteOffDrug = {} as WriteOffDrug;
  private return: Boolean = false;

  constructor(private httpActionsService: HttpActionsService, 
              private sharingStoreDataService: SharingStoreDataService
  ) { }

  ngOnInit() {
    this.httpActionsService.getWriteOffStoreData()
    .subscribe(str => {
      this.writeOffStore = str;
    });
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

  doWrireOff(id){
    this.return = false;
    for(let i = 0; i < this.writeOffStore.storeItems.length; i++){
      if(this.writeOffStore.storeItems[i]._id == id){
        this.writeOffDrug.name = this.writeOffStore.storeItems[i].name;
        this.writeOffDrug.count = this.writeOffStore.storeItems[i].count;
        this.writeOffDrug.madeDate = this.writeOffStore.storeItems[i].madeDate;
        this.writeOffDrug.shelfLife = this.writeOffStore.storeItems[i].shelfLife;
        this.writeOffDrug.transactionNumber = this.writeOffStore.storeItems[i].transactionNumber;
        this.writeOffDrug._id = this.writeOffStore.storeItems[i]._id;
        this.writeOffDrug.checkDir = this.writeOffStore.storeItems[i].checkDir;
        var form = document.getElementsByClassName("pop-up-edit-form")[0];
        form.classList.remove("unactive");
        form.classList.add("active");
        break;
      }
    }
  }

  doReturn(id){
    this.return = true;
    for(let i = 0; i < this.writeOffStore.storeItems.length; i++){
      if(this.writeOffStore.storeItems[i]._id == id){
        this.writeOffDrug.name = this.writeOffStore.storeItems[i].name;
        this.writeOffDrug.count = this.writeOffStore.storeItems[i].count;
        this.writeOffDrug.madeDate = this.writeOffStore.storeItems[i].madeDate;
        this.writeOffDrug.shelfLife = this.writeOffStore.storeItems[i].shelfLife;
        this.writeOffDrug.transactionNumber = this.writeOffStore.storeItems[i].transactionNumber;
        this.writeOffDrug._id = this.writeOffStore.storeItems[i]._id;
        this.writeOffDrug.checkDir = this.writeOffStore.storeItems[i].checkDir;
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

  doSubmit(){
    console.dir(this.writeOffDrug);
    if(!this.return){
      this.httpActionsService.addWriteOffReport(this.writeOffDrug)
      .subscribe(drug =>{
        this.httpActionsService.deleteWriteOffItem(this.writeOffDrug._id).subscribe(item =>{
          this.httpActionsService.getWriteOffStoreData().subscribe(drugs =>{
            this.sharingStoreDataService.changeStoreData(drugs);
            this.sharingStoreDataService.strCurrentData.subscribe(str => {
              this.writeOffStore = str;
              this.closeBtn();
              alert("Препарат списано успішно");
              this.writeOffDrug = {} as WriteOffDrug;
            });
          });
        });
      });
    } else {
      this.httpActionsService.addReturnReport(this.writeOffDrug)
      .subscribe(drug =>{
        this.httpActionsService.deleteWriteOffItem(this.writeOffDrug._id).subscribe(item =>{
          this.httpActionsService.getWriteOffStoreData().subscribe(drugs =>{
            this.sharingStoreDataService.changeStoreData(drugs);
            this.sharingStoreDataService.strCurrentData.subscribe(str => {
              this.writeOffStore = str;
              this.closeBtn();
              alert("Заявка на повернення створена успішно");
              this.writeOffDrug = {} as WriteOffDrug;
            });
          });
        });
      });
    }
  }
}
