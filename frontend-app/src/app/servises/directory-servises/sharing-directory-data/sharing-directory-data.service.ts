import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Directory } from "../../../models/directory";
import { Drug } from '../../../models/drug';

@Injectable()
export class SharingDirectoryDataService {

  constructor() { }

  private drug = new BehaviorSubject<Drug>({} as Drug);
  private dataSource = new BehaviorSubject<Directory>({} as Directory);
  dirCurrentData = this.dataSource.asObservable();
  dirCurrentDrug = this.drug.asObservable();
  
  changeDirData(data) {
    this.dataSource.next(data);
  };

  changeDrugData(data) {
    this.drug.next(data);
  };
}
