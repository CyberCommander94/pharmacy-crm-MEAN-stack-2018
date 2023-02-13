import { Component, OnInit } from '@angular/core';
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Router } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { Supplies } from '../../../models/supplies/supplies';
import { Supplier } from '../../../models/supplies/supplier';

@Component({
  selector: 'app-suppliers-add',
  templateUrl: './suppliers-add.component.html',
  styleUrls: ['./suppliers-add.component.css']
})
export class SuppliersAddComponent implements OnInit {

  private title: String = "Додати нового постачальника";
  private headBtnsVisibility: Boolean = false;
  private newSupplier: Supplier;
  private supplies: Supplies;
  private baseSupplies: Supplies;

  constructor(private sharingSuppliesDataService: SharingSuppliesDataService,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.newSupplier = {} as Supplier;
    this.sharingSuppliesDataService.suppCurrentData.subscribe(supp=> this.supplies = supp);
  }

  addItem(){
    this.httpActionsService.getSuppliesData()
    .subscribe(supp=> {
      this.supplies = supp;
      this.httpActionsService.addSupplier(this.newSupplier)
      .subscribe(it => {
        this.httpActionsService.getSuppliesData()
        .subscribe(str => {
          this.baseSupplies = str;
          this.sharingSuppliesDataService.changeSuppliesData(this.baseSupplies);
          this.router.navigate(['/suppliers/main']);
        });
      });
    });
  }
}
