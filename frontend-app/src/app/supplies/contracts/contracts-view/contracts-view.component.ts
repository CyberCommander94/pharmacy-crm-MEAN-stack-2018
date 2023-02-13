import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../models/supplies/contract';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-contracts-view',
  templateUrl: './contracts-view.component.html',
  styleUrls: ['./contracts-view.component.css']
})
export class ContractsViewComponent implements OnInit {

  private title: String = "Договір: деталі";
  private headBtnsVisibility: Boolean = false;
  private addBtn: Boolean = true;
  private contract: Contract;
  private contractId: String;

  constructor(private httpActionsServise: HttpActionsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get('id');
    this.httpActionsServise.getContractInfo(this.contractId).subscribe(cont => {
      this.contract = cont;
    });
  }

}
