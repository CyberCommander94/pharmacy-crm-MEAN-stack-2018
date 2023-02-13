import { Component, OnInit } from '@angular/core';
import { Reports } from '../../models/reports';
import { Router} from '@angular/router';
import { SharingReportsDataService } from '../../servises/reports-servises/sharing-reports-data.service';

@Component({
  selector: 'app-reports-contracts',
  templateUrl: './reports-contracts.component.html',
  styleUrls: ['./reports-contracts.component.css']
})
export class ReportsContractsComponent implements OnInit {

  private reportsData: Reports;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.sharingReportsDataService.repCurrentData.subscribe(reports => this.reportsData = reports);
  }

  viewContractReport(id){
    this.router.navigate(['reports/contractsReports/viewContractReport/' + id]);
  }
}
