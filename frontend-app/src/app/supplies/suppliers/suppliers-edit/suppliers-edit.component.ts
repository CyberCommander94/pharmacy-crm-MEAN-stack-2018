import { Component, OnInit } from '@angular/core';
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Router } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { Supplies } from '../../../models/supplies/supplies';
import { Supplier } from '../../../models/supplies/supplier';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.css']
})
export class SuppliersEditComponent implements OnInit {

  private title: String = "Редагувати інформацію постачальника";
  private headBtnsVisibility: Boolean = false;
  private itemId: String;
  private supplier: Supplier;
  private suppliesData: Supplies;
  private baseSuppliesData: Supplies;

  constructor(private sharingSuppliesDataService: SharingSuppliesDataService,
              private route: ActivatedRoute,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getSupplierInfo(this.itemId)
    .subscribe(item => { 
      this.supplier = item;
    });
  }

  editItem(){
    this.httpActionsService.getSuppliesData()
    .subscribe(supp => {
      this.suppliesData = supp;
      this.httpActionsService.editSupplierInfo(this.supplier, this.itemId)
      .subscribe(item => {
        this.httpActionsService.getSuppliesData()
        .subscribe(sp => {
          this.baseSuppliesData = sp;
          this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
          alert("Інформацію про постачальника успішно редаговано!");
          this.router.navigate(['/suppliers/main']);
        });
      });
    });
  }

}
