import { Component, OnInit } from '@angular/core';
import { SharingStoreDataService } from '../../../servises/store-servises/sharing-store-data.service'
import { Router } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { StoreItem } from '../../../models/storeItem';
import { Store } from '../../../models/store';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit {

  private title: String = "Додати препарат до складу";
  private headBtnsVisibility: Boolean = false;
  private newStoreItem: StoreItem;
  private store: Store;
  private baseStore: Store;

  constructor(private sharingStoreDataService: SharingStoreDataService,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.newStoreItem = {} as StoreItem;
    this.sharingStoreDataService.strCurrentData.subscribe(store => this.store = store);
  }

  addItem(){
    let dateStr = this.newStoreItem.madeDate;
    let element = String(dateStr).split('-');
    this.newStoreItem.madeDate = new Date(element[2] + "-" + element[1] + "-" + element[0]);
    this.httpActionsService.getAccStoreData()
    .subscribe(store => {
      this.store = store;
      this.httpActionsService.addAccStoreItem(this.newStoreItem)
      .subscribe(it => {
        this.httpActionsService.getAccStoreData()
        .subscribe(str => {
          this.baseStore = str;
          this.sharingStoreDataService.changeStoreData(this.baseStore);
          this.router.navigate(['/storeAcceptance/main']);
        });
      });
    });
  }
}
