import { Component, OnInit } from '@angular/core';
import { Supplies } from '../../../models/supplies/supplies'
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-main',
  templateUrl: './suppliers-main.component.html',
  styleUrls: ['./suppliers-main.component.css']
})
export class SuppliersMainComponent implements OnInit {

  private title: String = "Постачальники";
  private headBtnsVisibility: Boolean = true;
  private suppliesData: Supplies;
  private baseSuppliesData: Supplies;
  private filterStr = {str: ""};
  private addBtn: Boolean = true;
  private topSort: Boolean = false;
  private nameSort: String = "unactive-sort";

  constructor(private httpActionsService: HttpActionsService,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.httpActionsService.getSuppliesData().subscribe(sup => 
      this.suppliesData = sup
    );
  }

  editItem(itemId){
    this.router.navigate(['suppliers/editSupplierInfo/' + itemId]);
  }

  deleteItem(itemId){
    let acc = confirm(`Ви дійсно хочете видалити інформацію про даного постачальника?`);
    if(acc){
      this.httpActionsService.deleteSupplier(itemId)
      .subscribe(item => {
        this.httpActionsService.getSuppliesData()
        .subscribe(supp => {
          this.baseSuppliesData = supp;
          this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
          this.sharingSuppliesDataService.suppCurrentData.subscribe(sup => {
            this.suppliesData = sup;
          });
        });
      });
    } else {
      return;
    }
  }

  viewSupplier(drugId){
    this.router.navigate(['suppliers/viewSupplierInfo/' + drugId]);
  }

  private compareNameToTop(nameA: any, nameB: any) {
    if(nameA.name > nameB.name){
      return 1;
    } else if(nameA.name < nameB.name){
      return -1;
    }
    return 0;
  };

  private compareNameToBottom(nameA: any, nameB: any) {
    if(nameA.name < nameB.name){
      return 1;
    } else if(nameA.name > nameB.name){
      return -1;
    }
    return 0;
  };

  sortNameAct(supplies: Supplies){
    this.nameSort = "active-sort";
    let mas = supplies.suppliers;
    if(this.topSort){
      mas.sort(this.compareNameToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareNameToTop);
      this.topSort = true;
    }
    supplies.suppliers = mas;
    this.sharingSuppliesDataService.changeSuppliesData(supplies);
  }

}
