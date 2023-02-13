import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store'
import { Directory } from '../../models/directory'
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'
import { SharingStoreDataService } from '../../servises/store-servises/sharing-store-data.service'


@Component({
  selector: 'app-store-acceptance',
  templateUrl: './store-acceptance.component.html',
  styleUrls: ['./store-acceptance.component.css'],
  providers: [HttpActionsService,
              SharingStoreDataService
  ]
})
export class StoreAcceptanceComponent implements OnInit {

  title: String = "Склад прийому поставок"
  accStore: Store;
  directory: Directory;

  constructor(private httpActionsService: HttpActionsService,
              private sharingStoreDataService: SharingStoreDataService
  ) { }

  ngOnInit() {
    this.httpActionsService.getAccStoreData()
    .subscribe(store => {
      this.accStore = store;
      this.sharingStoreDataService.changeStoreData(this.accStore);
      this.sharingStoreDataService.strCurrentData.subscribe(str => this.accStore = str);
    });
  }
}
