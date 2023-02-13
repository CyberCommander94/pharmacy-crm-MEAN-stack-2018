import { Component, OnInit } from '@angular/core';
import { Reports } from '../../../models/reports';
import { Order } from '../../../models/order';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingReportsDataService } from '../../../servises/reports-servises/sharing-reports-data.service';
import * as jsPDF from "jspdf";
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'app-view-order-report',
  templateUrl: './view-order-report.component.html',
  styleUrls: ['./view-order-report.component.css']
})
export class ViewOrderReportComponent implements OnInit {

  private reportsData: Reports;
  private orderData: Order;
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
        for(let i = 0; i < this.reportsData.sales.length; i++){
          if(this.reportsData.sales[i]._id == this.orderId){
            this.orderData = this.reportsData.sales[i];
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
      doc.save("saleReport.pdf");
    });
  }
}
