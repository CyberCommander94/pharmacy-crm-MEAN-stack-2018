import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Supplies } from "../../models/supplies/supplies";

@Injectable()
export class SharingSuppliesDataService {

  private dataSource = new BehaviorSubject<Supplies>({} as Supplies);
  suppCurrentData = this.dataSource.asObservable();

  changeSuppliesData(data) {
    this.dataSource.next(data);
  };

  constructor() { }
}
