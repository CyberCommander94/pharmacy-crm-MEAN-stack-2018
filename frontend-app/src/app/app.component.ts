import { Component, OnInit } from '@angular/core';
import { UpdateDeliveriesService } from './servises/supplies-servises/updatingDeliveriesData/update-deliveries.service';
import { UpdatingTradeStoreDataService } from './servises/store-servises/updating-trade-store-data/updating-trade-store-data.service'
import { SharingStoreDataService } from './servises/store-servises/sharing-store-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './fonts.css']
})

export class AppComponent {

  constructor(private updateDeliveriesService: UpdateDeliveriesService,
              private updatingTradeStoreDataService: UpdatingTradeStoreDataService,
              private sharingStoreDataService: SharingStoreDataService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.updatingTradeStoreDataService.updateData();
      this.updateDeliveriesService.updateDeliveriesData();
      this.updateDeliveriesService.updateContractsStatus();
      this.updateDeliveriesService.updateContractsDeliveriesData()
    }, 3600000);
  }
}

