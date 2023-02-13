import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Reports } from "../../models/reports";

@Injectable()
export class SharingReportsDataService {

  private dataSource = new BehaviorSubject<Reports>({} as Reports);
  repCurrentData = this.dataSource.asObservable();

  changeReportsData(data) {
    this.dataSource.next(data);
  };

  constructor() { }
}
