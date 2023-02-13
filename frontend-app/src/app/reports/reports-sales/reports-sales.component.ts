import { Component, OnInit } from '@angular/core';
import { Reports } from '../../models/reports';
import { Router} from '@angular/router';
import { SharingReportsDataService } from '../../servises/reports-servises/sharing-reports-data.service';


@Component({
  selector: 'app-reports-sales',
  templateUrl: './reports-sales.component.html',
  styleUrls: ['./reports-sales.component.css']
})
export class ReportsSalesComponent implements OnInit {

  private reportsData: Reports;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.sharingReportsDataService.repCurrentData.subscribe(reports => this.reportsData = reports);
  }

  viewOrderReport(id){
    this.router.navigate(['reports/salesReports/viewOrderReport/' + id]);
  }

  monthSalesReport(){
    this.router.navigate(['reports/salesReports/salesMonthReport']);
  }
}
