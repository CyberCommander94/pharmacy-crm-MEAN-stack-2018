import { Component, OnInit } from '@angular/core';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { SharingSalesDataService } from '../../servises/sales-servises/sharing-sales-data.service';

@Component({
  selector: 'app-sales-basket',
  templateUrl: './sales-basket.component.html',
  styleUrls: ['./sales-basket.component.css']
})
export class SalesBasketComponent implements OnInit {

  private sales: Order[];
  private title: String = "Кошик: список замовлень";

  constructor(private router: Router,
              private sharingSalesDataService: SharingSalesDataService,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.sharingSalesDataService.saleCurrentData
    .subscribe(sale => {
      this.sales = sale;
    });
  }

  viewOrder(orderId){
    this.router.navigate(['sales/viewOrder/' + orderId]);
  }

}
