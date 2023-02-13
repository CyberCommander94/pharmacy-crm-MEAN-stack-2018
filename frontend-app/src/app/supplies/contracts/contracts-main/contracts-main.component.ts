import { Component, OnInit } from '@angular/core';
import { Supplies } from '../../../models/supplies/supplies'
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingSuppliesDataService } from '../../../servises/supplies-servises/sharing-supplies-data.service'
import { Router } from '@angular/router';
import { UpdateDeliveriesService } from '../../../servises/supplies-servises/updatingDeliveriesData/update-deliveries.service';

@Component({
  selector: 'app-contracts-main',
  templateUrl: './contracts-main.component.html',
  styleUrls: ['./contracts-main.component.css']
})
export class ContractsMainComponent implements OnInit {

  private title: String = "Договори";
  private headBtnsVisibility: Boolean = true;
  private suppliesData: Supplies;
  private baseSuppliesData: Supplies;
  private filterStr = {str: ""};
  private addBtn: Boolean = true;
  private topSort: Boolean = false;
  private nameSort: String = "unactive-sort";

  constructor(private httpActionsService: HttpActionsService,
              private sharingSuppliesDataService: SharingSuppliesDataService,
              private router: Router,
              private updateDeliveriesService: UpdateDeliveriesService
  ) { }

  ngOnInit() {
    this.httpActionsService.getSuppliesData().subscribe(sup => {
      this.suppliesData = sup;
      this.updateDeliveriesService.updateDeliveriesData();
      this.updateDeliveriesService.updateContractsStatus();
      this.updateDeliveriesService.updateContractsDeliveriesData();
    });
  }

  goViewContract(id: String){
    this.router.navigate(['contracts/viewContractInfo/' + id]);
  }

  goEditContract(id: String){
    this.router.navigate(['contracts/editContract/' + id]);
  }

  goDeleteContract(id: String){
    console.log(id);
    let acc = confirm(`Ви дійсно хочете видалити інформацію про даний договір?`);
    if(acc){
      this.httpActionsService.deleteContract(id)
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
}