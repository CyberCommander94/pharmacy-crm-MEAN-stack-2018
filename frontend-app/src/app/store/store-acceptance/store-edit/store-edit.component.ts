import { Component, OnInit } from '@angular/core';
import { SharingStoreDataService } from '../../../servises/store-servises/sharing-store-data.service'
import { Router } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { StoreItem } from '../../../models/storeItem';
import { Store } from '../../../models/store';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {

  private title: String = "Редагувати препарат";
  private headBtnsVisibility: Boolean = false;
  private itemId: String;
  private storeItem: StoreItem;
  private store: Store;
  private baseStore: Store;

  constructor(private sharingDirectoryDataService: SharingStoreDataService,
              private route: ActivatedRoute,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getStoreItem(this.itemId)
    .subscribe(item => { 
      this.storeItem = item;
      // this.storeItem.madeDate = this.storeItem.madeDate.toString().slice(0, 10);
    });
  }

  editItem(){
    let dateStr = this.storeItem.madeDate;
    let element = String(dateStr).split('-');
    this.storeItem.madeDate = new Date(element[2] + "-" + element[1] + "-" + element[0]);
    this.httpActionsService.getAccStoreData()
    .subscribe(store => {
      this.store = store;
      this.httpActionsService.editStoreItem(this.storeItem, this.itemId)
      .subscribe(item => {
        this.httpActionsService.getAccStoreData()
        .subscribe(str => {
          this.baseStore = str;
          this.sharingDirectoryDataService.changeStoreData(this.baseStore);
          this.router.navigate(['/storeAcceptance/main']);
        });
      });
    });
  }
}
