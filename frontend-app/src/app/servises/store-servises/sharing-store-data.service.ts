import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Store } from "../../models/store";

@Injectable()
export class SharingStoreDataService {

  private dataSource = new BehaviorSubject<Store>({} as Store);
  strCurrentData = this.dataSource.asObservable();

  changeStoreData(data) {
    this.dataSource.next(data);
  };

  constructor() { }

}
