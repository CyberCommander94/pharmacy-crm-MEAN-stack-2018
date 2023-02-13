import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Reports } from '../../../models/reports';
import { ReportContract } from '../../../models/reportContract';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingReportsDataService } from '../../../servises/reports-servises/sharing-reports-data.service';
import * as jsPDF from "jspdf";
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'app-view-contract-report',
  templateUrl: './view-contract-report.component.html',
  styleUrls: ['./view-contract-report.component.css']
})
export class ViewContractReportComponent implements OnInit {

  private reportsData: Reports;
  private contractData: ReportContract;
  private contractId: String;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private httpActionsService: HttpActionsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contractId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getReportsData()
    .subscribe(reports => {
      this.reportsData = reports;
        for(let i = 0; i < this.reportsData.contracts.length; i++){
          if(this.reportsData.contracts[i]._id == this.contractId){
            this.contractData = this.reportsData.contracts[i];
          }
        }
    });
  }

  downloadPDF(){
    var element = document.getElementById("content");
    html2canvas(element).then(function(canvas) {
      let img = canvas.toDataURL("image/png", 1.0);
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save("contractReport.pdf");
    });
  }
}
