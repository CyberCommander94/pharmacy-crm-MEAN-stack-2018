import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service';
import { SharingSalesDataService } from '../../servises/sales-servises/sharing-sales-data.service';
import { SharingStoreDataService } from '../../servises/store-servises/sharing-store-data.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { Store } from '../../models/store';
import { StoreItem } from '../../models/storeItem';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  private title: String = "Інформація про замовлення";
  private orderId: String;
  private order: Order;
  private tradeStore: Store;
  salesData: any;

  constructor(private route: ActivatedRoute,
              private httpActionsService: HttpActionsService,
              private sharingSalesDataService: SharingSalesDataService,
              private sharingStoreDataService: SharingStoreDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getSalesItem(this.orderId)
    .subscribe(ord => {
      this.order = ord;
    });
  }

  deleteOrder(id){
    this.httpActionsService.deleteSalesData(id)
    .subscribe(sale => {
      this.httpActionsService.getSalesData().subscribe(sales => {
        this.salesData = sales;
        this.sharingSalesDataService.changeSalesData(this.salesData);
        this.sharingSalesDataService.saleCurrentData.subscribe(sale => this.salesData = sale);
        this.router.navigate(['sales/basket']);
      });
    });
  }

  editOrder(id){
    this.router.navigate(['sales/editOrder/' + id]);
  }

  execOrder(id){
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getSalesItem(this.orderId)
    .subscribe(ord => {
      this.order = ord;
      this.httpActionsService.getTradeStoreData()
      .subscribe(store => {
        this.tradeStore = store;
        let check = true;
        for(let i = 0; i < this.order.drugs.length; i++){
          let orderDrugCount = this.order.drugs[i].drugQuantity;
          for(let j = 0; j < this.tradeStore.storeItems.length; j++){
            if(this.tradeStore.storeItems[j].name == this.order.drugs[i].drugName){
              while(orderDrugCount){
                orderDrugCount = <number>orderDrugCount - 1;
                this.tradeStore.storeItems[j].count = <number>this.tradeStore.storeItems[j].count - 1;
                if(this.tradeStore.storeItems[j].count == 0){
                  this.httpActionsService.deleteTradeItem(this.tradeStore.storeItems[j]._id).subscribe();
                  this.order.drugs.length - 1;
                  i = 0;
                  break;
                }
              }
            }
            if(j == (this.tradeStore.storeItems.length - 1) &&  orderDrugCount > 0){
              alert("На складі недостатньо упаковок препарату \"" + this.order.drugs[i].drugName + "\" для оформлення продажу!");
              check = false;
            } else 
              if(orderDrugCount == 0){
                this.httpActionsService.editTradeStoreItem(<StoreItem>this.tradeStore.storeItems[j], this.tradeStore.storeItems[j]._id).subscribe();
                break;
              }
          }
        }
        this.httpActionsService.getTradeStoreData().subscribe(str => {
          this.tradeStore = str;
          this.sharingStoreDataService.changeStoreData(this.tradeStore);
          this.httpActionsService.addSaleReport(this.order)
          .subscribe(order => {
            this.httpActionsService.deleteSalesData(this.orderId).subscribe(order => {
              this.sharingSalesDataService.changeSalesData(this.salesData);
              this.sharingSalesDataService.saleCurrentData.subscribe(sale => this.salesData = sale);
              alert("Продаж успішно оформлено");
              this.router.navigate(['sales/basket']);
            });
          });
        });
      });
    });
  }
}
