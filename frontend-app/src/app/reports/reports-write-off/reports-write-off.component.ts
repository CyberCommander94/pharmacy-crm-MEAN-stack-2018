import { Component, OnInit } from '@angular/core';
import { Reports } from '../../models/reports';
import { Router} from '@angular/router';
import { SharingReportsDataService } from '../../servises/reports-servises/sharing-reports-data.service';

@Component({
  selector: 'app-reports-write-off',
  templateUrl: './reports-write-off.component.html',
  styleUrls: ['./reports-write-off.component.css']
})
export class ReportsWriteOffComponent implements OnInit {

  private reportsData: Reports;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private router: Router
  ) { }

  ngOnInit() {
    this.sharingReportsDataService.repCurrentData.subscribe(reports => {
      this.reportsData = reports;
    });
  }

  viewWriteOffReport(id){
    this.router.navigate(['reports/writeOffReports/viewWriteOffReport/' + id]);
  }
}
