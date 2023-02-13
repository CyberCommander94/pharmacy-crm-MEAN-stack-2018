import { Component, OnInit } from '@angular/core';
import { SharingReportsDataService } from '../servises/reports-servises/sharing-reports-data.service';
import { HttpActionsService } from '../servises/http-actions/http-actions.service'
import { Reports } from "../models/reports";


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [
    HttpActionsService,
    SharingReportsDataService
  ]
})
export class ReportsComponent implements OnInit {

  private reportsData: Reports;

  constructor(private sharingReportsDataService: SharingReportsDataService, 
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.httpActionsService.getReportsData()
    .subscribe(reports => {
      this.reportsData = reports;
      this.sharingReportsDataService.changeReportsData(this.reportsData);
      this.sharingReportsDataService.repCurrentData.subscribe(rep => this.reportsData = rep);
    });
  }

}
