import { Component, OnInit } from '@angular/core';
import { Reports } from '../../../models/reports';
import { WriteOffDrug } from '../../../models/writeOffDrug';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingReportsDataService } from '../../../servises/reports-servises/sharing-reports-data.service';
import * as jsPDF from "jspdf";
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'app-view-return-report',
  templateUrl: './view-return-report.component.html',
  styleUrls: ['./view-return-report.component.css']
})
export class ViewReturnReportComponent implements OnInit {

  private reportsData: Reports;
  private drugData: WriteOffDrug;
  private orderId: String;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private httpActionsService: HttpActionsService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getReportsData()
    .subscribe(reports => {
      this.reportsData = reports;
        for(let i = 0; i < this.reportsData.returns.length; i++){
          if(this.reportsData.returns[i]._id == this.orderId){
            this.drugData = this.reportsData.returns[i];
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
      doc.save("returnReport.pdf");
    });
  }

}
