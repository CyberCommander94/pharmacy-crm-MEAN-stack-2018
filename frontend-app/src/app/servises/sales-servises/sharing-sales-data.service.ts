import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Order } from "../../models/order";

@Injectable()
export class SharingSalesDataService {

  private dataSource = new BehaviorSubject<Order[]>([]);
  saleCurrentData = this.dataSource.asObservable();

  changeSalesData(data) {
    this.dataSource.next(data);
  };

  constructor() { }
}
