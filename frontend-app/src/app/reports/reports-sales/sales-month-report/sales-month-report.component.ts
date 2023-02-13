import { Component, OnInit } from '@angular/core';
import { Reports } from '../../../models/reports';
import { Order } from '../../../models/order';
import { OrderDrug } from '../../../models/orderDrug';
import { HttpActionsService } from '../../../servises/http-actions/http-actions.service'
import { SharingReportsDataService } from '../../../servises/reports-servises/sharing-reports-data.service';
import * as jsPDF from "jspdf";
import * as html2canvas from 'html2canvas'

@Component({
  selector: 'app-sales-month-report',
  templateUrl: './sales-month-report.component.html',
  styleUrls: ['./sales-month-report.component.css']
})
export class SalesMonthReportComponent implements OnInit {

  private reportsData: Reports;
  private orderData: Order;
  private monthsOrders: Order[] = [];
  private monthsOrdersDrugs: OrderDrug[] = [];
  private currDate: number = new Date().getTime();
  private monthTime: number = this.currDate - (30 * 86400000);
  private finishCost: Number = 0;

  constructor(private sharingReportsDataService: SharingReportsDataService,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.httpActionsService.getReportsData()
    .subscribe(reports => {
      this.reportsData = reports;
        for(let i = 0; i < this.reportsData.sales.length; i++){
          if(new Date(this.reportsData.sales[i].saleDate).getTime() <= this.currDate && new Date(this.reportsData.sales[i].saleDate).getTime() >= this.monthTime){
            this.monthsOrders.push(this.reportsData.sales[i]);
          }
        }
        for(let i = 0; i < this.monthsOrders.length; i++){
          for(let j = 0; j < this.monthsOrders[i].drugs.length; j++){
            let find = false;
            for(let k = 0; k < this.monthsOrdersDrugs.length; k++){
              if(this.monthsOrdersDrugs[k].drugName == this.monthsOrders[i].drugs[j].drugName){
                find = true;
                this.monthsOrdersDrugs[k].drugQuantity = <number>this.monthsOrdersDrugs[k].drugQuantity + <number>this.monthsOrders[i].drugs[j].drugQuantity;
              }
            }
            if(find == false){
              this.monthsOrdersDrugs.push(this.monthsOrders[i].drugs[j]);
            }
          }
        }
        for(let i = 0; i < this.monthsOrdersDrugs.length; i++){
          this.finishCost = <number>this.finishCost + (<number>this.monthsOrdersDrugs[i].drugCost * <number>this.monthsOrdersDrugs[i].drugQuantity)
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
      doc.save("monthSaleReport.pdf");
    });
  }

}
