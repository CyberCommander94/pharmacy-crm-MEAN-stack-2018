import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { HttpActionsService } from '../servises/http-actions/http-actions.service';
import { SharingSalesDataService } from '../servises/sales-servises/sharing-sales-data.service';
import { SharingStoreDataService } from '../servises/store-servises/sharing-store-data.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [
    SharingSalesDataService,
    HttpActionsService,
    SharingStoreDataService
  ]
})
export class SalesComponent implements OnInit {

  salesData: any;

  constructor(private sharingSalesDataService: SharingSalesDataService, 
              private sharingStoreDataService: SharingStoreDataService,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.httpActionsService.getSalesData()
    .subscribe(sales => {
      this.salesData = sales;
      this.sharingSalesDataService.changeSalesData(this.salesData);
      this.sharingSalesDataService.saleCurrentData.subscribe(sale => this.salesData = sale);
    });
  }

}
