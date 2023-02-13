import { Component, OnInit } from '@angular/core';
import { Reports } from '../../models/reports';
import { Router} from '@angular/router';
import { SharingReportsDataService } from '../../servises/reports-servises/sharing-reports-data.service';

@Component({
  selector: 'app-reports-returns',
  templateUrl: './reports-returns.component.html',
  styleUrls: ['./reports-returns.component.css']
})
export class ReportsReturnsComponent implements OnInit {

  private reportsData: Reports;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.sharingReportsDataService.repCurrentData.subscribe(reports => {
      this.reportsData = reports;
    });
  }

  viewReturnReport(id){
    this.router.navigate(['reports/returnsReports/viewReturnsReport/' + id]);
  }
}
