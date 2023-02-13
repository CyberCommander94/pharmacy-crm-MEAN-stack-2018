import { Component, OnInit } from '@angular/core';
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Supplier } from '../../../models/supplies/supplier';
import { Supplies } from '../../../models/supplies/supplies';
import { SupplierDrug } from '../../../models/supplies/supplierDrug';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent implements OnInit {

  private title: String = "Постачальник ";
  private headBtnsVisibility: Boolean = true;
  private supplier: Supplier;
  private supplierId: String;
  private addBtn: Boolean = false;
  private filterStr = {str: ""};
  private baseSuppliesData: Supplies;
  private suppliesData: Supplies;
  private topSort: Boolean = false;
  private nameSort: String = "unactive-sort";
  private newDrug: SupplierDrug;
  private editedDrug: SupplierDrug;
  private editDrugId: String;
  constructor(private sharingSuppliesDataService: SharingSuppliesDataService,
              private route: ActivatedRoute,
              private httpActionsService: HttpActionsService,
              private router: Router
  ) { }

  ngOnInit() {
    this.newDrug = {} as SupplierDrug;
    this.editedDrug = {} as SupplierDrug;
    this.supplierId = this.route.snapshot.paramMap.get('id');

    this.httpActionsService.getSupplierInfo(this.supplierId)
    .subscribe(supp => { 
      this.supplier = supp;
      this.title = this.title + " \"" + this.supplier.name + "\": деталі";
    });
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
          alert("Інформацію про даного постачальника було успішно видалено!");
          this.router.navigate(['suppliers/main/']);
        });
      });
    } else {
      return;
    }
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

  sortNameAct(supplier: Supplier){
    this.nameSort = "active-sort";
    let mas = supplier.drugs;
    if(this.topSort){
      mas.sort(this.compareNameToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareNameToTop);
      this.topSort = true;
    }
    supplier.drugs = mas;
  }


  addItem(){
    this.httpActionsService.addSupplierDrug(this.newDrug ,this.supplierId)
    .subscribe(sup => {
      this.httpActionsService.getSuppliesData()
      .subscribe(str => {
        this.baseSuppliesData = str;
        this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
        this.httpActionsService.getSupplierInfo(this.supplierId)
        .subscribe(supp => { 
          this.supplier = supp;
        });
      });
    });
  }


  editDataObj(itemId: String){
    for(let drug of this.supplier.drugs){
      if(drug._id == itemId){
        this.editedDrug.name = drug.name;
        this.editedDrug.cost = drug.cost;
        this.editDrugId = itemId;
        var form = document.getElementsByClassName("pop-up-edit-form")[0];
        form.classList.remove("unactive");
        form.classList.add("active");
        break;
      }
    }
  }

  closeBtn(){
    var form = document.getElementsByClassName("pop-up-edit-form")[0];
    form.classList.remove("active");
    form.classList.add("unactive");
  }

  editDrug(drugid, suppId){
    this.httpActionsService.editSupplierDrug(this.editedDrug, suppId, drugid)
    .subscribe(sup => {
      this.httpActionsService.getSuppliesData()
      .subscribe(str => {
        this.baseSuppliesData = str;
        this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
        this.httpActionsService.getSupplierInfo(this.supplierId)
        .subscribe(supp => { 
          this.supplier = supp;
          this.closeBtn();
        });
      });
    });
  }

  deleteDrug(drugid, suppId){
    let acc = confirm(`Ви дійсно хочете видалити інформацію про даний препарат?`);
    if(acc){
      this.httpActionsService.deleteSupplierDrug(suppId, drugid)
      .subscribe(item => {
        this.httpActionsService.getSuppliesData()
        .subscribe(supp => {
          this.baseSuppliesData = supp;
          this.sharingSuppliesDataService.changeSuppliesData(this.baseSuppliesData);
          this.httpActionsService.getSupplierInfo(suppId)
          .subscribe(supp => { 
            this.supplier = supp;
          });
          alert("Даний препарат було успішно видалено!");
        });
      });
    } else {
      return;
    }
  }
}
