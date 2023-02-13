import { Component, OnInit } from '@angular/core';
import { Supplies } from '../../models/supplies/supplies'
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'
import { SharingSuppliesDataService } from '../../servises/supplies-servises/sharing-supplies-data.service'

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  providers: [HttpActionsService,
              SharingSuppliesDataService
  ]
})
export class SuppliersComponent implements OnInit {

  private title: String = "Постачальники";
  private SuppliesData: Supplies;

  constructor(private httpActionsService: HttpActionsService,
              private sharingStoreDataService: SharingSuppliesDataService
  ) { }

  ngOnInit() {
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.SuppliesData = supp;
      this.sharingStoreDataService.changeSuppliesData(this.SuppliesData);
      this.sharingStoreDataService.suppCurrentData.subscribe(str => this.SuppliesData = str);
    });
  }

}
