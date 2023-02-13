import { Component, OnInit } from '@angular/core';
import { Supplies } from '../../models/supplies/supplies'
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'
import { SharingSuppliesDataService } from '../../servises/supplies-servises/sharing-supplies-data.service'
import { SharingStoreDataService } from '../../servises/store-servises/sharing-store-data.service';
import { UpdateDeliveriesService } from '../../servises/supplies-servises/updatingDeliveriesData/update-deliveries.service'


@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
  providers: [HttpActionsService,
              SharingSuppliesDataService,
              SharingStoreDataService,
              UpdateDeliveriesService
  ]
})
export class DeliveriesComponent implements OnInit {

  private title: String = "Доставки";
  private SuppliesData: Supplies;

  constructor(private httpActionsService: HttpActionsService,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private sharingStoreDataService: SharingStoreDataService
  ) { }

  ngOnInit() {
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.SuppliesData = supp;
      this.sharingSuppliesDataService.changeSuppliesData(this.SuppliesData);
      this.sharingSuppliesDataService.suppCurrentData.subscribe(str => this.SuppliesData = str);
    });
  }

}
